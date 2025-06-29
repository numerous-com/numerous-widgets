import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.scss';
import '../../css/components/WeightedAssessmentSurvey.scss';
import { MarkdownRender, SimpleMarkdownRender } from './MarkdownRender';

// Define types for our survey structure
interface Question {
  id: string;
  text: string;
  value: number | null;
  min: number;
  max: number;
  comment: string;
  categoryWeights: Record<string, number>;
  categoryTypes: Record<string, 'performance' | 'enabler'>; // Performance or Enabler categorization
  timestamps: Record<string, number>; // Use string keys (created, modified)
  doNotKnow?: boolean; // Flag to indicate "I do not know" response
  antiText?: string; // Add optional anti-text field
  helpText?: string; // Add optional help text field for info icon tooltip
}

interface Category {
  id: string;
  name: string;
  description: string;
  scoringRanges: ScoringRange[];  // Add scoring ranges to categories
  imageRef?: string;  // Reference to image file in static folder
}

interface ScoringRange {
  min: number;
  max: number;
  title: string;  // Label for the range
  text: string;   // Descriptive text for the range
}

interface Group {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  scoringRanges: ScoringRange[];  // Add scoring ranges to groups
}

interface SurveyData {
  title: string;
  description: string;
  groups: Group[];
  categories: Category[];
  useQualitativeScale?: boolean; // Option to display qualitative labels (strongly disagree, etc) instead of numbers
  conclusion?: string; // Markdown conclusion text that will be stored but not shown in the flow
  overallScoringRanges?: ScoringRange[]; // Add overall scoring ranges
  submitted_utc_timestamp?: number; // UTC timestamp from Date.now()
  submitted_local_timestamp_string?: string; // Local timestamp string
}

// Define interface for storing scroll positions
interface ScrollPosition {
  element: Element | null;
  position: number;
}

// Update the interface to include submit_text, disable_editing, and read_only
interface WeightedAssessmentSurveyWidgetProps {
  survey_data: SurveyData;
  edit_mode: boolean;
  class_name?: string;
  submit_text: string;
  submitted: boolean;
  saved: boolean;  // Add new prop for save events
  disable_editing: boolean;  // Add new prop
  read_only: boolean;  // Add read_only to props
  enable_do_not_know: boolean; // Add new prop for enabling "I do not know"
  model?: any; // Add optional model prop
}

// Explicitly type the component function
const WeightedAssessmentSurveyWidget: React.FC<WeightedAssessmentSurveyWidgetProps> = (props) => {
  const [surveyData, setSurveyData] = useModelState<SurveyData>("survey_data");
  const [editMode, setEditMode] = useModelState<boolean>("edit_mode");
  const [className] = useModelState<string>("class_name");
  const [saved, setSaved] = useModelState<boolean>("saved");  // Get both value and setter
  const [disableEditing] = useModelState<boolean>("disable_editing");
  const [readOnly] = useModelState<boolean>("read_only");
  const [enableDoNotKnow] = useModelState<boolean>("enable_do_not_know"); // Retrieve the new state
  
  // Add state for original data near the top with other state declarations
  const [originalData, setOriginalData] = React.useState<SurveyData | null>(null);
  
  // Add ref for modal content scroll position
  const modalContentRef = React.useRef<HTMLDivElement>(null);
  
  // Initialize categories if they don't exist
  React.useEffect(() => {
    if (!surveyData) {
      setSurveyData({
        title: "",
        description: "",
        groups: [],
        categories: [],
        overallScoringRanges: [{ min: 0, max: 100, title: "Default Range", text: "Default range description" }]
      });
    } else if (!surveyData.groups) {
      setSurveyData({
        ...surveyData,
        groups: []
      });
    }
    
    // Initialize overallScoringRanges if it doesn't exist
    if (surveyData && !surveyData.overallScoringRanges) {
      setSurveyData({
        ...surveyData,
        overallScoringRanges: [{ min: 0, max: 100, title: "Default Range", text: "Default range description" }]
      });
    }
  }, [surveyData, setSurveyData]);
  
  // State for tracking which comments are visible
  const [visibleComments, setVisibleComments] = React.useState<Record<string, boolean>>({});
  
  // State for slide navigation
  const [currentGroupIndex, setCurrentGroupIndex] = React.useState(0);
  
  // State for edit mode tabs
  const [activeEditTab, setActiveEditTab] = React.useState<'content' | 'categories' | 'weights' | 'types' | 'conclusion' | 'overall'>('content');
  
  // State for showing category weights
  const [showCategoryWeights, setShowCategoryWeights] = React.useState<Record<string, boolean>>({});
  
  // Add state to track survey start time
  const [startTime] = React.useState<number>(Date.now());
  
  // Add state for submission
  const [submitted, setSubmitted] = useModelState<boolean>("submitted");
  
  // Add state for saved status
  const [isSaved, setIsSaved] = React.useState<boolean>(props.saved);
  
  // Add state for showing intro slide
  const [showIntro, setShowIntro] = React.useState(true);
  
  // Change modal state to a simple toggle state
  const [showWeightsMatrix, setShowWeightsMatrix] = React.useState(false);
  
  // Add state for expanded question comments
  const [expandedQuestionComments, setExpandedQuestionComments] = React.useState<string[]>([]);
  
  // Add state for expanded category weights
  const [expandedCategoryWeights, setExpandedCategoryWeights] = React.useState<string[]>([]);
  
  // Add state for showing weights modal
  const [showWeightsModal, setShowWeightsModal] = React.useState(false);
  
  // Add state for showing final slide
  const [showFinalSlide, setShowFinalSlide] = React.useState(false);
  
  // Force edit_mode to false when disable_editing is true
  React.useEffect(() => {
    if (props.disable_editing && editMode) {
      setEditMode(false);
    }
  }, [props.disable_editing, editMode]);
  
  // Generate a random 8-character ID
  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Add function to validate ranges
  const validateRanges = (ranges: ScoringRange[]): boolean => {
    if (ranges.length === 0) return false;
    
    // Sort ranges by min value
    const sortedRanges = [...ranges].sort((a, b) => a.min - b.min);
    
    // Check if ranges start at 0 and end at 100
    if (sortedRanges[0].min !== 0 || sortedRanges[sortedRanges.length - 1].max !== 100) {
      return false;
    }
    
    // Check for gaps or overlaps
    for (let i = 0; i < sortedRanges.length - 1; i++) {
      if (sortedRanges[i].max !== sortedRanges[i + 1].min) {
        return false;
      }
    }
    
    return true;
  };

  // Add function to add a scoring range
  const addScoringRange = (groupIndex: number) => {
    const newData = { ...surveyData };
    const group = newData.groups[groupIndex];
    
    if (!group.scoringRanges) {
      group.scoringRanges = [];
    }
    
    // Find the gap or extend the range
    let newRange: ScoringRange | undefined;
    if (group.scoringRanges.length === 0) {
      newRange = { min: 0, max: 100, title: "Default Range", text: "Default range description" };
    } else {
      const sortedRanges = [...group.scoringRanges].sort((a, b) => a.min - b.min);
      // Find first gap or extend last range
      let start = 0;
      for (const range of sortedRanges) {
        if (range.min > start) {
          newRange = { min: start, max: range.min, title: "New Range", text: "New range description" };
          break;
        }
        start = range.max;
      }
      if (!newRange && start < 100) {
        newRange = { min: start, max: 100, title: "New Range", text: "New range description" };
      }
    }
    
    if (newRange) {
      group.scoringRanges.push(newRange);
      setSurveyData(newData);
    }
  };

  // Add function to update a scoring range
  const updateScoringRange = (
    groupIndex: number,
    rangeIndex: number,
    updates: Partial<ScoringRange>
  ) => {
    const newData = { ...surveyData };
    const group = newData.groups[groupIndex];
    const range = group.scoringRanges[rangeIndex];
    
    // Update the range
    group.scoringRanges[rangeIndex] = {
      ...range,
      ...updates
    };
    
    setSurveyData(newData);
  };

  // Add function to delete a scoring range
  const deleteScoringRange = (groupIndex: number, rangeIndex: number) => {
    const newData = { ...surveyData };
    const group = newData.groups[groupIndex];
    
    group.scoringRanges.splice(rangeIndex, 1);
    
    // If no ranges left, add default range
    if (group.scoringRanges.length === 0) {
      group.scoringRanges.push({ min: 0, max: 100, title: "Default Range", text: "Default range description" });
    }
    
    setSurveyData(newData);
  };

  // Add helper to get range validation class
  const getRangeValidationClass = (ranges: ScoringRange[]): string => {
    return validateRanges(ranges) ? 'valid-ranges' : 'invalid-ranges';
  };

  // Update the addGroup function to initialize scoring ranges
  const addGroup = () => {
    const newData = { ...surveyData };
    const groupId = `group${newData.groups.length + 1}`;
    
    newData.groups.push({
      id: groupId,
      title: "New Group",
      description: "Group description",
      questions: [],
      scoringRanges: [{ min: 0, max: 100, title: "Default Range", text: "Default range description" }]  // Initialize with default range
    });
    
    setSurveyData(newData);
    setCurrentGroupIndex(newData.groups.length - 1);
  };
  
  // Add a function to calculate progress
  const calculateProgress = () => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    // Check if surveyData and groups exist before proceeding
    if (surveyData?.groups) {
      // Count total questions and answered questions
      surveyData.groups.forEach(group => {
        if (group?.questions) {  // Add check for questions array
          totalQuestions += group.questions.length;
          
          group.questions.forEach(question => {
            if (question?.value !== null || question?.doNotKnow === true) {
              answeredQuestions++;
            }
          });
        }
      });
    }
    
    // Calculate percentage (avoid division by zero)
    const percentage = totalQuestions > 0 
      ? Math.round((answeredQuestions / totalQuestions) * 100) 
      : 0;
      
    return {
      answeredQuestions,
      totalQuestions,
      percentage
    };
  };
  
  // Add state to track validation messages
  const [validationMessage, setValidationMessage] = React.useState<string>('');
  
  // Add function to check if all questions in a specific group are answered
  const areAllQuestionsAnsweredInGroup = (groupIndex: number): boolean => {
    if (!surveyData?.groups?.[groupIndex]) return true;
    return surveyData.groups[groupIndex].questions.every(q => q.value !== null || q.doNotKnow === true);
  };

  const countUnansweredQuestionsInGroup = (groupIndex: number): number => {
    if (!surveyData?.groups?.[groupIndex]) return 0;
    return surveyData.groups[groupIndex].questions.filter(q => q.value === null && q.doNotKnow !== true).length;
  };

  const generateValidationMessage = (groupIndex: number): string => {
    const count = countUnansweredQuestionsInGroup(groupIndex);
    if (count === 0) return '';
    return `Please answer ${count} more ${count === 1 ? 'question' : 'questions'} before proceeding.`;
  };
  
  // Add function to get count of unanswered questions in a group
  const getUnansweredQuestionsInGroup = (groupIndex: number): number => {
    if (!surveyData?.groups?.[groupIndex]?.questions) return 0;
    
    const group = surveyData.groups[groupIndex];
    return group.questions.filter(q => q.value === null && q.doNotKnow !== true).length;
  };
  
  // Modify navigation functions to handle intro slide and final slide
  const goToNextGroup = () => {
    // Special case for intro screen - bypass validation check
    if (showIntro) {
      setShowIntro(false);
      setCurrentGroupIndex(0);
      setValidationMessage('');
      return;
    }

    if (currentGroupIndex >= surveyData?.groups?.length - 1) {
      handleSubmit();
      return;
    }

    // Skip validation check if in edit mode
    if (!editMode && !areAllQuestionsAnsweredInGroup(currentGroupIndex)) {
      setValidationMessage(generateValidationMessage(currentGroupIndex));
      return;
    }

    setCurrentGroupIndex(currentGroupIndex + 1);
    setValidationMessage('');
  };
  
  const goToPreviousGroup = () => {
    if (currentGroupIndex === 0) {
      setShowIntro(true);
      return;
    }
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };
  
  // Toggle comment visibility
  const toggleComment = (questionId: string) => {
    setVisibleComments(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Update question ID
  const updateQuestionId = (groupIndex: number, questionIndex: number, id: string) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions[questionIndex].id = id;
    setSurveyData(newData);
  };
  
  // Update question value directly without intermediate state
  const updateQuestionValue = (groupIndex: number, questionIndex: number, newValue: number | null): void => {
    // Create a copy of the survey data
    const updatedSurveyData = { ...surveyData };
    const question = updatedSurveyData.groups[groupIndex].questions[questionIndex];
    
    // Update the question value
    question.value = newValue;
    
    // If setting a value, uncheck "I do not know"
    if (newValue !== null) {
      question.doNotKnow = false;
    }
    
    // Update timestamps
    if (!question.timestamps) {
      question.timestamps = {
        created: Date.now(),
        modified: Date.now()
      };
    } else {
      question.timestamps.modified = Date.now();
    }
    
    // Update state in a single operation
    setSurveyData(updatedSurveyData);
  };
  
  // Add state to track the current editing comment
  const [commentBeingEdited, setCommentBeingEdited] = React.useState<{
    value: string;
    groupIndex: number;
    questionIndex: number;
  } | null>(null);
  
  // Add refs to track textarea selection
  const commentTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const selectionStartRef = React.useRef<number | null>(null);
  const selectionEndRef = React.useRef<number | null>(null);
  
  // Update comment editing handlers
  const handleCommentFocus = (groupIndex: number, questionIndex: number, comment: string) => {
    // Store the current comment in local state for editing
    setCommentBeingEdited({
      value: comment,
      groupIndex,
      questionIndex
    });
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!commentBeingEdited) return;
    
    // Store current selection position
    selectionStartRef.current = e.target.selectionStart;
    selectionEndRef.current = e.target.selectionEnd;
    
    // Update local state
    setCommentBeingEdited({
      ...commentBeingEdited,
      value: e.target.value
    });
  };
  
  const handleCommentBlur = () => {
    if (!commentBeingEdited) return;
    
    // Apply changes to the actual survey data
    updateQuestionComment(
      commentBeingEdited.groupIndex,
      commentBeingEdited.questionIndex,
      commentBeingEdited.value
    );
    
    // Clear local editing state
    setCommentBeingEdited(null);
  };
  
  // Effect to restore cursor position after re-render
  React.useEffect(() => {
    if (commentTextareaRef.current && 
        selectionStartRef.current !== null && 
        selectionEndRef.current !== null) {
      commentTextareaRef.current.setSelectionRange(
        selectionStartRef.current, 
        selectionEndRef.current
      );
    }
  });
  
  // Update question comment and reset submitted state
  const updateQuestionComment = (groupIndex: number, questionIndex: number, comment: string) => {
    if (readOnly) return; // Don't update if in read-only mode
    
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions[questionIndex].comment = comment;
    
    // Reset submitted state
    setSubmitted(false);
    
    setSurveyData(newData);
  };
  
  // Edit mode functions
  const updateQuestionText = (groupIndex: number, questionIndex: number, text: string) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions[questionIndex].text = text;
    setSurveyData(newData);
  };
  
  const updateQuestionRange = (groupIndex: number, questionIndex: number, min: number, max: number) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions[questionIndex].min = min;
    newData.groups[groupIndex].questions[questionIndex].max = max;
    setSurveyData(newData);
  };
  
  const updateGroupTitle = (groupIndex: number, title: string) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].title = title;
    setSurveyData(newData);
  };
  
  const updateGroupDescription = (groupIndex: number, description: string) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].description = description;
    setSurveyData(newData);
  };
  
  // Category management functions
  const addCategory = () => {
    const categoryId = generateRandomId();
    const newCategory = {
      id: categoryId,
      name: `Category ${surveyData.categories?.length + 1 || 1}`,
      description: "",
      imageRef: "",
      scoringRanges: [{ min: 0, max: 100, title: "Default Range", text: "Default range description" }]  // Initialize with default range
    };
    
    const updatedSurveyData = { ...surveyData };
    
    if (!updatedSurveyData.categories) {
      updatedSurveyData.categories = [];
    }
    
    updatedSurveyData.categories.push(newCategory);
    
    // Initialize this category's weight and type in all questions
    updatedSurveyData.groups.forEach(group => {
      group.questions.forEach(question => {
        if (!question.categoryWeights) {
          question.categoryWeights = {};
        }
        question.categoryWeights[categoryId] = 0;
        
        if (!question.categoryTypes) {
          question.categoryTypes = {};
        }
        question.categoryTypes[categoryId] = 'performance'; // Default to 'performance'
      });
    });
    
    // Explicitly initialize the dark mode state for this new category
    setIconPreviewDarkMode(prev => ({
      ...prev,
      [categoryId]: false
    }));
    
    setSurveyData(updatedSurveyData);
  };
  
  const updateCategoryName = (index: number, name: string) => {
    const updatedSurveyData = { ...surveyData };
    updatedSurveyData.categories[index].name = name;
    setSurveyData(updatedSurveyData);
  };
  
  const updateCategoryDescription = (index: number, description: string) => {
    const updatedSurveyData = { ...surveyData };
    updatedSurveyData.categories[index].description = description;
    setSurveyData(updatedSurveyData);
  };
  
  const updateCategoryImageRef = (index: number, imageRef: string) => {
    const updatedSurveyData = { ...surveyData };
    updatedSurveyData.categories[index].imageRef = imageRef;
    setSurveyData(updatedSurveyData);
  };
  
  const updateCategoryId = (index: number, id: string) => {
    const updatedSurveyData = { ...surveyData };
    const oldId = updatedSurveyData.categories[index].id;
    const newId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Update the ID
    updatedSurveyData.categories[index].id = newId;
    
    // Update all references to this category ID in questions
    updatedSurveyData.groups.forEach(group => {
      group.questions.forEach(question => {
        if (question.categoryWeights && question.categoryWeights[oldId] !== undefined) {
          question.categoryWeights[newId] = question.categoryWeights[oldId];
          delete question.categoryWeights[oldId];
        }
      });
    });
    
    setSurveyData(updatedSurveyData);
  };
  
  const deleteCategory = (index: number) => {
    const updatedSurveyData = { ...surveyData };
    const categoryId = updatedSurveyData.categories[index].id;
    
    // Remove the category
    updatedSurveyData.categories.splice(index, 1);
    
    // Remove references to this category in all questions
    updatedSurveyData.groups.forEach(group => {
      group.questions.forEach(question => {
        if (question.categoryWeights && question.categoryWeights[categoryId] !== undefined) {
          delete question.categoryWeights[categoryId];
        }
      });
    });
    
    setSurveyData(updatedSurveyData);
  };
  
  // Update category weight for a question
  const updateCategoryWeight = (
    groupIndex: number,
    questionIndex: number,
    categoryId: string,
    weight: number
  ) => {
    const updatedSurveyData = { ...surveyData };
    const question = updatedSurveyData.groups[groupIndex].questions[questionIndex];
    
    if (!question.categoryWeights) {
      question.categoryWeights = {};
    }
    
    question.categoryWeights[categoryId] = weight;
    
    // Update timestamps
    if (!question.timestamps) {
      question.timestamps = {
        created: Date.now(),
        modified: Date.now()
      };
    } else {
      question.timestamps.modified = Date.now();
    }
    
    setSurveyData(updatedSurveyData);
  };
  
  // Toggle category weights visibility for a question
  const toggleCategoryWeights = (questionId: string) => {
    setShowCategoryWeights(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Add question with category weights and timestamps
  const addQuestion = (groupIndex: number) => {
    const newData = { ...surveyData };
    const group = newData.groups[groupIndex];
    const questionId = generateRandomId();
    
    // Initialize category weights and types for the new question
    const categoryWeights: Record<string, number> = {};
    const categoryTypes: Record<string, 'performance' | 'enabler'> = {};
    
    if (newData.categories) {
      newData.categories.forEach(category => {
        categoryWeights[category.id] = 0;
        categoryTypes[category.id] = 'performance'; // Default to 'performance'
      });
    }
    
    group.questions.push({
      id: questionId,
      text: "New Question",
      value: null,
      min: 0,
      max: 5,
      comment: "",
      categoryWeights,
      categoryTypes,
      timestamps: {}, // Initialize as empty object
      antiText: "" // Initialize antiText
    });
    
    setSurveyData(newData);
  };
  
  const deleteQuestion = (groupIndex: number, questionIndex: number) => {
    // Make a copy of the survey data
    const newData = { ...surveyData };
    
    // Remove the question at the specified index
    newData.groups[groupIndex].questions.splice(questionIndex, 1);
    
    // Update the state
    setSurveyData(newData);
  };
  
  // Add moveQuestion function here
  const moveQuestion = (sourceGroupIndex: number, questionIndex: number, targetGroupIndex: number) => {
    if (sourceGroupIndex === targetGroupIndex) return;
    
    // Create a copy of the survey data
    const updatedSurveyData = { ...surveyData };
    
    // Get the question to move
    const questionToMove = { ...updatedSurveyData.groups[sourceGroupIndex].questions[questionIndex] };
    
    // Add the question to the target group
    updatedSurveyData.groups[targetGroupIndex].questions.push(questionToMove);
    
    // Remove the question from the source group
    updatedSurveyData.groups[sourceGroupIndex].questions.splice(questionIndex, 1);
    
    // Update the survey data
    setSurveyData(updatedSurveyData);
  };
  
  const deleteGroup = (groupIndex: number) => {
    const newData = { ...surveyData };
    newData.groups.splice(groupIndex, 1);
    setSurveyData(newData);
    
    // Adjust current index if needed
    if (currentGroupIndex >= newData.groups.length) {
      setCurrentGroupIndex(Math.max(0, newData.groups.length - 1));
    }
  };
  
  // Generate slider markers
  const renderSliderMarkers = (min: number, max: number) => {
    const numericLabels = [0, 1, 2, 3, 4, 5];
    // const range = max - min; // No longer needed for positioning labels
    
    // Handle case where min === max - render a single centered label
    if (min === max) {
      return (
        <div className="slider-markers numeric-scale">
          <div className="slider-marker single-value-marker" style={{ left: '50%' }}>
            <span className="marker-number">{min}</span>
            {/* Add text if the single value is 0 or 5 */}
            {min === 0 && <span className="marker-text">Strongly Disagree</span>}
            {min === 5 && <span className="marker-text">Strongly Agree</span>}
          </div>
        </div>
      );
    }

    return (
      <div className="slider-markers numeric-scale">
        {numericLabels.map((value) => {
          // Position labels based on a fixed 0-5 scale
          const percentage = (value / 5) * 100;
          
          const isFirstLabel = value === 0;
          const isLastLabel = value === 5;

          return (
            <div 
              key={value} 
              className={`slider-marker numeric-marker ${isFirstLabel ? 'marker-min' : ''} ${isLastLabel ? 'marker-max' : ''}`}
              style={{ left: `${percentage}%` }}
            >
              <span className="marker-number">{value}</span>
              {value === 0 && <span className="marker-text">Strongly Disagree</span>}
              {value === 5 && <span className="marker-text">Strongly Agree</span>}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Simplified handler for slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, groupIndex: number, questionIndex: number) => {
    const newValue = Number(e.target.value);
    updateQuestionValue(groupIndex, questionIndex, newValue);
  };

  // Handle slider click - update value on direct click
  const handleSliderClick = (e: React.MouseEvent<HTMLInputElement>, groupIndex: number, questionIndex: number) => {
    const newValue = Number((e.target as HTMLInputElement).value);
    updateQuestionValue(groupIndex, questionIndex, newValue);
  };

  // Make the progress bar non-interactive by updating renderProgressBar
  const renderProgressBar = () => {
    const progressPercentage = progress.percentage;
    
    return (
      <div className="progress-bar-container" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    );
  };
  
  // In the render function, update the progress indicator
  const progress = calculateProgress();
  
  // Handle submit action
  const handleSubmit = async () => {
    // Add timestamps before setting submitted flag
    const utcTimestamp = Date.now();
    // Use toString() for a more reliable local string with timezone info
    const localTimestampString = new Date().toString();

    // Update surveyData state with timestamps by merging
    setSurveyData({
      ...surveyData, // Spread the current survey data
      submitted_utc_timestamp: utcTimestamp,
      submitted_local_timestamp_string: localTimestampString,
    });

    // Now, set the submitted flag to true to trigger Python callback
    await setSubmitted(true);
    
    // Ensure model changes are saved (if model exists)
    if (props.model) {
      await props.model.save_changes();
    }
    
    // Update local UI state (optional)
    setIsSaved(true);
  };
  
  // In the render function, add the submit button section
  const allQuestionsAnswered = progress.answeredQuestions === progress.totalQuestions && progress.totalQuestions > 0;
  
  // Update the save button click handler
  const handleSave = async () => {
    // First set saved to true to trigger Python callback
    await setSaved(true);
    
    // Ensure model changes are saved
    if (props.model) {
      await props.model.save_changes();
    }
    
    setOriginalData(null); // Clear the original data
    setEditMode(false);
  };
  
  // Update the edit mode handler
  const handleEditMode = () => {
    if (!editMode) {
      setOriginalData(JSON.parse(JSON.stringify(surveyData))); // Deep copy the current state
      setEditMode(true);
    }
  };
  
  // Update the undo changes handler
  const handleUndoChanges = () => {
    if (originalData) {
      setSurveyData(originalData);
    }
    setOriginalData(null);
    setEditMode(false);
  };
  
  // Add helper function to get all questions across groups
  const getAllQuestions = () => {
    return surveyData.groups.flatMap((group, groupIndex) => 
      group.questions.map((question, questionIndex) => ({
        ...question,
        groupIndex,
        questionIndex,
        groupTitle: group.title
      }))
    );
  };

  // Add function to update weight in matrix view
  const updateWeightInMatrix = (
    groupIndex: number,
    questionIndex: number,
    categoryId: string,
    value: number
  ) => {
    const newData = { ...surveyData };
    const question = newData.groups[groupIndex].questions[questionIndex];
    
    if (!question.categoryWeights) {
      question.categoryWeights = {};
    }
    
    question.categoryWeights[categoryId] = value;
    setSurveyData(newData);
  };

  // Add WeightsMatrix component
  const WeightsMatrix = () => {
    const allQuestions = getAllQuestions();
    const categories = surveyData.categories || [];
    
    // Add state for input values
    const [inputValues, setInputValues] = React.useState<Record<string, string>>({});
    // Add scroll position ref
    const scrollPositionsRef = React.useRef<ScrollPosition[]>([]);
    
    // Add a ref to track the modal content scroll position
    const modalContentRef = React.useRef<HTMLDivElement>(null);
    const scrollPositionRef = React.useRef<number>(0);
    
    // Use layout effect to restore scroll position immediately after any re-render
    React.useLayoutEffect(() => {
      if (modalContentRef.current && scrollPositionRef.current > 0) {
        modalContentRef.current.scrollTop = scrollPositionRef.current;
      }
    });
    
    // Calculate column totals
    const calculateColumnTotals = () => {
      const totals: Record<string, number> = {};
      categories.forEach(category => {
        totals[category.id] = allQuestions.reduce((sum, question) => 
          sum + (question.categoryWeights?.[category.id] || 0), 0
        );
      });
      return totals;
    };

    // Calculate row total for a question
    const calculateRowTotal = (question: Question) => {
      return categories.reduce((sum, category) => 
        sum + (question.categoryWeights?.[category.id] || 0), 0
      );
    };

    const columnTotals = calculateColumnTotals();
    
    // Handle input change
    const handleInputChange = (
      questionId: string,
      categoryId: string,
      value: string,
      groupIndex: number,
      questionIndex: number
    ) => {
      // Save the current scroll position when input changes
      if (modalContentRef.current) {
        scrollPositionRef.current = modalContentRef.current.scrollTop;
      }
      
      const inputKey = `${questionId}-${categoryId}`;
      setInputValues(prev => ({
        ...prev,
        [inputKey]: value
      }));
    };
    
    // Handle input blur
    const handleInputBlur = (
      questionId: string,
      categoryId: string,
      groupIndex: number,
      questionIndex: number
    ) => {
      // Get the current scroll position
      const scrollTop = modalContentRef.current?.scrollTop || 0;
      
      const inputKey = `${questionId}-${categoryId}`;
      const value = inputValues[inputKey] || '0';
      
      // Validate and update the main state
      let numValue = Math.min(100, Math.max(0, Number(value)));
      if (isNaN(numValue)) {
        numValue = 0;
      }
      
      // Update state with the new value
      updateWeightInMatrix(
        groupIndex,
        questionIndex,
        categoryId,
        numValue
      );
      
      // Clear the input value
      setInputValues(prev => ({
        ...prev,
        [inputKey]: String(numValue)
      }));
      
      // Restore scroll position after state update
      requestAnimationFrame(() => {
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = scrollTop;
        }
      });
    };

    // Add custom tab key handler for matrix navigation
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      questionId: string,
      categoryId: string,
      groupIndex: number,
      questionIndex: number,
      categoryIndex: number
    ) => {
      // Handle tab key to navigate vertically
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault(); // Prevent default tab behavior
        
        const allGroups = surveyData?.groups || [];
        const allCategories = surveyData?.categories || [];
        const questions = getAllQuestions();
        
        // Get next row index
        const nextQuestionIndex = questionIndex + 1;
        
        // If there's a question below in the same column
        if (nextQuestionIndex < questions.length) {
          // Focus the input below
          const nextQuestion = questions[nextQuestionIndex];
          const nextInputId = `matrix-input-${nextQuestion.id}-${categoryId}`;
          
          setTimeout(() => {
            const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
            if (nextInput) {
              nextInput.focus();
              nextInput.select();
            }
          }, 0);
        } 
        // Otherwise, move to the top of the next column
        else if (categoryIndex < allCategories.length - 1) {
          const nextCategoryId = allCategories[categoryIndex + 1].id;
          const firstQuestion = questions[0];
          const nextInputId = `matrix-input-${firstQuestion.id}-${nextCategoryId}`;
          
          setTimeout(() => {
            const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
            if (nextInput) {
              nextInput.focus();
              nextInput.select();
            }
          }, 0);
        }
      }
    };
    
    return (
      <div className="weights-matrix">
        <div className="weights-matrix-header">
          <h3>Category Weights Matrix</h3>
          <p className="weights-matrix-description">
            View and edit the weights of each question across categories.
          </p>
        </div>
        <div className="matrix-table-container">
          <table className="matrix-table">
            <thead>
              <tr>
                <th className="matrix-group-col">Group</th>
                <th className="matrix-question-col">Question</th>
                {categories.map(category => (
                  <th key={category.id} className="matrix-category-col">
                    <div className="matrix-category-header" title={category.name}>
                      {category.name}
                    </div>
                  </th>
                ))}
                <th className="matrix-total-col">
                  <div className="matrix-total-header">Row Total</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllQuestions().map((question, questionIndex) => {
                const groupIndex = getGroupIndexByQuestionId(question.id);
                const group = surveyData?.groups?.[groupIndex];
                
                return (
                  <tr key={question.id}>
                    <td className="matrix-group-cell matrix-group-col" data-title={group?.title}>
                      {group?.title}
                    </td>
                    <td className="matrix-question-cell matrix-question-col" data-title={question.text}>
                      {question.text}
                    </td>
                    {categories.map((category, categoryIndex) => {
                      const value = question.categoryWeights?.[category.id] || 0;
                      const inputKey = `${question.id}-${category.id}`;
                      const inputValue = inputValues[inputKey] !== undefined 
                        ? inputValues[inputKey] 
                        : String(value);
                      
                      return (
                        <td key={category.id} className="matrix-weight-cell">
                          <input
                            id={`matrix-input-${question.id}-${category.id}`}
                            type="number"
                            className="matrix-weight-input"
                            value={inputValue}
                            onChange={(e) => handleInputChange(
                              question.id,
                              category.id,
                              e.target.value,
                              groupIndex,
                              findQuestionIndexInGroup(groupIndex, question.id)
                            )}
                            onBlur={() => handleInputBlur(
                              question.id,
                              category.id,
                              groupIndex,
                              findQuestionIndexInGroup(groupIndex, question.id)
                            )}
                            onKeyDown={(e) => handleKeyDown(
                              e,
                              question.id,
                              category.id,
                              groupIndex,
                              questionIndex,
                              categoryIndex
                            )}
                            min="0"
                            max="100"
                            style={{ '--weight-percentage': `${value}%` } as React.CSSProperties}
                          />
                    </td>
                      );
                    })}
                    <td className="matrix-weight-cell matrix-total-cell">
                      <span 
                        className="matrix-total-value"
                        style={{ '--weight-percentage': `${calculateRowTotal(question)}%` } as React.CSSProperties}
                      >
                        {calculateRowTotal(question)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="matrix-totals-row">
                <td colSpan={2} className="matrix-totals-label">Column Totals</td>
                {categories.map(category => (
                  <td key={category.id} className="matrix-weight-cell matrix-total-cell">
                    <span 
                      className="matrix-total-value"
                      style={{ '--weight-percentage': `${columnTotals[category.id]}%` } as React.CSSProperties}
                    >
                      {columnTotals[category.id]}
                    </span>
                  </td>
                ))}
                <td className="matrix-weight-cell matrix-total-cell">
                  <span 
                    className="matrix-total-value"
                    style={{ '--weight-percentage': `${Object.values(columnTotals).reduce((a, b) => a + b, 0)}%` } as React.CSSProperties}
                  >
                    {Object.values(columnTotals).reduce((a, b) => a + b, 0)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Update the render section where the weights tab content is shown
  const renderWeightsSection = () => {
    return (
      <div className="weights-section">
        <div className="section-actions">
          <button 
            className="edit-weights-button"
            onClick={() => setShowWeightsMatrix(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
            </svg>
            Edit Category Weights
          </button>
          
          {/* Button for category types matrix removed from here */}
        </div>
        
        {showWeightsMatrix && (
          <div className="weights-modal-overlay" onClick={() => setShowWeightsMatrix(false)}>
            <div className="weights-modal-fullscreen" onClick={e => e.stopPropagation()}>
              <div className="weights-modal-header">
                <h2>Category Weights Matrix</h2>
                <button className="weights-modal-close" onClick={() => setShowWeightsMatrix(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="weights-modal-content" ref={modalContentRef}>
                <WeightsMatrix />
              </div>
            </div>
          </div>
        )}
        
        {/* Modal for category types matrix rendering remains, triggered by the Types tab */}
        {showCategoryTypesMatrix && (
          <div className="weights-modal-overlay" onClick={() => setShowCategoryTypesMatrix(false)}>
            <div className="weights-modal-fullscreen" onClick={e => e.stopPropagation()}>
              <div className="weights-modal-header">
                <h2>Performance/Enabler Categories Matrix</h2>
                <button className="weights-modal-close" onClick={() => setShowCategoryTypesMatrix(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="weights-modal-content" ref={modalContentRef}>
                <CategoryTypesMatrix />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Update the scoring ranges editor component
  const renderScoringRanges = (group: Group, groupIndex: number) => {
    return (
      <div className={`scoring-ranges-editor ${getRangeValidationClass(group.scoringRanges || [])}`}>
        <div className="scoring-ranges-header">
          <h4>Scoring Ranges</h4>
          <button 
            className="add-button"
            onClick={() => addScoringRange(groupIndex)}
          >
            <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Add Range
          </button>
        </div>
        
        <div className="scoring-ranges-list">
          {(group.scoringRanges || []).map((range, rangeIndex) => (
            <div key={rangeIndex} className="scoring-range-item">
              <div className="range-inputs">
                <input
                  type="number"
                  className="text-input range-min"
                  value={range.min}
                  onChange={(e) => updateScoringRange(
                    groupIndex,
                    rangeIndex,
                    { min: Math.max(0, Math.min(100, Number(e.target.value))) }
                  )}
                  min={0}
                  max={100}
                />
                <span>to</span>
                <input
                  type="number"
                  className="text-input range-max"
                  value={range.max}
                  onChange={(e) => updateScoringRange(
                    groupIndex,
                    rangeIndex,
                    { max: Math.max(0, Math.min(100, Number(e.target.value))) }
                  )}
                  min={0}
                  max={100}
                />
              </div>
              <div className="range-text-inputs">
                <input
                  type="text"
                  className="text-input range-title"
                  value={range.title}
                  onChange={(e) => updateScoringRange(
                    groupIndex,
                    rangeIndex,
                    { title: e.target.value }
                  )}
                  placeholder="Range title"
                />
                <textarea
                  className="text-input range-text"
                  value={range.text}
                  onChange={(e) => updateScoringRange(
                    groupIndex,
                    rangeIndex,
                    { text: e.target.value }
                  )}
                  placeholder="Range description"
                />
              </div>
              <button
                className="delete-button"
                onClick={() => deleteScoringRange(groupIndex, rangeIndex)}
                aria-label="Delete range"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        {!validateRanges(group.scoringRanges || []) && (
          <div className="ranges-error">
            Ranges must cover 0-100 without gaps or overlaps
          </div>
        )}
      </div>
    );
  };

  // Add function to add a scoring range to a category
  const addCategoryRange = (categoryIndex: number) => {
    const updatedSurveyData = { ...surveyData };
    const category = updatedSurveyData.categories[categoryIndex];
    
    if (!category.scoringRanges) {
      category.scoringRanges = [];
    }
    
    // Find the gap or extend the range
    let newRange: ScoringRange | undefined;
    if (category.scoringRanges.length === 0) {
      newRange = { min: 0, max: 100, title: "Default Range", text: "Default range description" };
    } else {
      const sortedRanges = [...category.scoringRanges].sort((a, b) => a.min - b.min);
      let start = 0;
      for (const range of sortedRanges) {
        if (range.min > start) {
          newRange = { min: start, max: range.min, title: "New Range", text: "New range description" };
          break;
        }
        start = range.max;
      }
      if (!newRange && start < 100) {
        newRange = { min: start, max: 100, title: "New Range", text: "New range description" };
      }
    }
    
    if (newRange) {
      category.scoringRanges.push(newRange);
      setSurveyData(updatedSurveyData);
    }
  };

  // Add function to update a category range
  const updateCategoryRange = (
    categoryIndex: number,
    rangeIndex: number,
    updates: Partial<ScoringRange>
  ) => {
    const updatedSurveyData = { ...surveyData };
    const category = updatedSurveyData.categories[categoryIndex];
    const range = category.scoringRanges[rangeIndex];
    
    // Update the range
    category.scoringRanges[rangeIndex] = {
      ...range,
      ...updates
    };
    
    setSurveyData(updatedSurveyData);
  };

  // Add function to delete a category range
  const deleteCategoryRange = (categoryIndex: number, rangeIndex: number) => {
    const updatedSurveyData = { ...surveyData };
    const category = updatedSurveyData.categories[categoryIndex];
    
    category.scoringRanges.splice(rangeIndex, 1);
    
    // If no ranges left, add default range
    if (category.scoringRanges.length === 0) {
      category.scoringRanges.push({ min: 0, max: 100, title: "Default Range", text: "Default range description" });
    }
    
    setSurveyData(updatedSurveyData);
  };

  // Fix clearQuestionAnswer function
  const clearQuestionAnswer = (groupIndex: number, questionIndex: number) => {
    const newData = { ...surveyData };
    const question = newData.groups[groupIndex].questions[questionIndex];
    
    // Clear the value
    question.value = null;
    
    // Reset submitted state
    setSubmitted(false);
    
    setSurveyData(newData);
  };
  
  // Add toggleDoNotKnow function
  const toggleDoNotKnow = (groupIndex: number, questionIndex: number) => {
    const updatedSurveyData = { ...surveyData };
    const question = updatedSurveyData.groups[groupIndex].questions[questionIndex];
    
    // Toggle the doNotKnow state
    question.doNotKnow = !question.doNotKnow;
    
    // If doNotKnow is true, clear the answer
    if (question.doNotKnow) {
      question.value = null;
    }
    
    // Reset submitted state
    setSubmitted(false);
    
    // Update the survey data
    setSurveyData(updatedSurveyData);
  };

  // Add function to clear all answers
  const clearAllAnswers = () => {
    const newData = { ...surveyData };
    
    // Clear all question values, comments, and doNotKnow flags
    newData.groups.forEach(group => {
      group.questions.forEach(question => {
        question.value = null;
        question.comment = "";
        question.doNotKnow = false;
      });
    });
    
    // Reset submitted state
    setSubmitted(false);
    
    setSurveyData(newData);
  };

  // Generate random answers for testing
  const generateRandomAnswers = async () => {
    const updatedSurveyData = { ...surveyData };
    
    // Loop through all groups
    updatedSurveyData.groups.forEach(group => {
      // Loop through all questions in the group
      group.questions.forEach(question => {
        // Generate a random value between min and max
        const min = question.min || 0;
        const max = question.max || 5;
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Set the random value for the question
        question.value = randomValue;
        
        // Ensure doNotKnow is set to false when setting a value (consistent with normal flow)
        question.doNotKnow = false;
        
        // Set a random comment with 25% probability
        if (Math.random() < 0.25) {
          question.comment = `This is a randomly generated comment for question ${question.id}.`;
        } else {
          question.comment = "";
        }
        
        // Initialize timestamps or update the modified timestamp
        if (!question.timestamps) {
          question.timestamps = {
            created: Date.now(),
            modified: Date.now()
          };
        } else {
          question.timestamps.modified = Date.now();
        }
      });
    });
    
    // Add submission timestamps, just like handleSubmit does
    const utcTimestamp = Date.now();
    const localTimestampString = new Date().toString();
    
    updatedSurveyData.submitted_utc_timestamp = utcTimestamp;
    updatedSurveyData.submitted_local_timestamp_string = localTimestampString;
    
    // Update the survey data state
    setSurveyData(updatedSurveyData);
    
    // Trigger the submission process - this will call the Python on_submit callback
    await setSubmitted(true);
    
    // Ensure model changes are saved (if model exists)
    if (props.model) {
      await props.model.save_changes();
    }
    
    // No alert message - silently complete the random data generation
  };

  // Add downloadSurveyJson function after generateRandomAnswers
  const downloadSurveyJson = () => {
    // Create a Blob containing the survey data
    const jsonString = JSON.stringify(surveyData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'survey_data.json';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Add uploadSurveyJson function after downloadSurveyJson
  const uploadSurveyJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const uploadedData = JSON.parse(e.target?.result as string);
        
        // Validate the uploaded data to ensure it has the required structure
        if (!uploadedData.groups || !Array.isArray(uploadedData.groups)) {
          alert('Invalid survey JSON file: Missing groups array');
          return;
        }
        
        // Process the uploaded data to ensure it has all required properties
        const processedData: SurveyData = {
          title: uploadedData.title || 'Imported Survey',
          description: uploadedData.description || '',
          groups: uploadedData.groups.map((group: any) => ({
            id: group.id || generateRandomId(),
            title: group.title || 'Imported Group',
            description: group.description || '',
            questions: Array.isArray(group.questions) ? group.questions.map((q: any) => ({
              id: q.id || generateRandomId(),
              text: q.text || 'Imported Question',
              value: q.value !== undefined ? q.value : null,
              min: q.min !== undefined ? q.min : 0,
              max: q.max !== undefined ? q.max : 5,
              comment: q.comment || '',
              categoryWeights: q.categoryWeights || {},
              categoryTypes: q.categoryTypes || {},
              timestamps: q.timestamps || {},
              antiText: q.antiText || '' // Process antiText
            })) : [],
            scoringRanges: Array.isArray(group.scoringRanges) ? group.scoringRanges : []
          })),
          categories: Array.isArray(uploadedData.categories) ? uploadedData.categories.map((cat: any) => ({
            id: cat.id || generateRandomId(),
            name: cat.name || 'Imported Category',
            description: cat.description || '',
            scoringRanges: Array.isArray(cat.scoringRanges) ? cat.scoringRanges : []
          })) : [],
          useQualitativeScale: uploadedData.useQualitativeScale,
          conclusion: uploadedData.conclusion || '',
          overallScoringRanges: Array.isArray(uploadedData.overallScoringRanges) ? uploadedData.overallScoringRanges : [{ min: 0, max: 100, title: "Default Range", text: "Default range description" }],
          submitted_utc_timestamp: uploadedData.submitted_utc_timestamp,
          submitted_local_timestamp_string: uploadedData.submitted_local_timestamp_string
        };
        
        // Update the survey data
        setSurveyData(processedData);
        
        // Reset the file input so the same file can be loaded again if needed
        fileInput.value = '';
        
        alert('Survey data loaded successfully');
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        alert('Error loading survey data. Please check the file format.');
      }
    };

    reader.onerror = () => {
      alert('Error reading file');
    };

    reader.readAsText(file);
  };

  // Create a reference for the file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Function to trigger the file input click
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to toggle qualitative scale option
  const toggleQualitativeScale = () => {
    const updatedSurveyData = { ...surveyData };
    updatedSurveyData.useQualitativeScale = !updatedSurveyData.useQualitativeScale;
    setSurveyData(updatedSurveyData);
  };

  // Function to update the conclusion text
  const updateConclusion = (text: string) => {
    const newData = { ...surveyData };
    newData.conclusion = text;
    setSurveyData(newData);
  };

  // Add a utility function to find a question's group index
  const getGroupIndexByQuestionId = (questionId: string): number => {
    if (!surveyData?.groups) return -1;
    
    for (let i = 0; i < surveyData.groups.length; i++) {
      const group = surveyData.groups[i];
      if (group.questions?.some(q => q.id === questionId)) {
        return i;
      }
    }
    return -1;
  };
  
  // Add a utility function to find a question's index within its group
  const findQuestionIndexInGroup = (groupIndex: number, questionId: string): number => {
    if (!surveyData?.groups || groupIndex < 0 || groupIndex >= surveyData.groups.length) {
      return -1;
    }
    
    const group = surveyData.groups[groupIndex];
    const index = group.questions?.findIndex(q => q.id === questionId);
    return index !== undefined ? index : -1;
  };

  // Add state for icon preview background mode (checkerboard or dark)
  const [iconPreviewDarkMode, setIconPreviewDarkMode] = React.useState<Record<string, boolean>>({});
  
  // Initialize icon preview dark mode state when categories change
  React.useEffect(() => {
    if (surveyData?.categories) {
      const newIconPreviewState: Record<string, boolean> = {};
      surveyData.categories.forEach(category => {
        // Preserve existing state or initialize to false
        newIconPreviewState[category.id] = iconPreviewDarkMode[category.id] || false;
      });
      setIconPreviewDarkMode(newIconPreviewState);
    }
  }, [surveyData?.categories]);
  
  // Function to toggle the icon preview background for a specific category
  const toggleIconPreviewMode = (categoryId: string) => {
    setIconPreviewDarkMode(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Handle slider mouse leave - no longer needed after simplification
  const handleSliderMouseLeave = () => {
    // Function kept for compatibility but simplified - does nothing now
  };

  // Add mouse hover handling for sliders - no longer needed, simplifying state management
  const handleSliderMouseMove = (e: React.MouseEvent<HTMLInputElement>, groupIndex: number, questionIndex: number, question: Question) => {
    // Function kept for compatibility but simplified - does nothing now
  };

  // Image preview component to handle image loading
  const ImagePreview: React.FC<{
    imageRef: string | undefined;
    categoryId: string;
    darkMode: boolean;
  }> = ({ imageRef, categoryId, darkMode }) => {
    const [hasError, setHasError] = React.useState(false);
    
    // Reset error state when imageRef changes
    React.useEffect(() => {
      setHasError(false);
    }, [imageRef]);
    
    if (!imageRef || imageRef.trim() === '') {
      return <div className="no-icon">No image</div>;
    }
    
    if (hasError) {
      return <div className="no-icon">Image not found: {imageRef}</div>;
    }
    
    return (
      <img 
        key={`img-${categoryId}-${imageRef}`}
        src={`/static/${imageRef.trim()}`}
        alt={`Category ${categoryId} icon`}
        className="category-image-preview"
        onError={() => setHasError(true)}
      />
    );
  };

  // Add this useEffect hook near the other useEffect hooks
  React.useEffect(() => {
    // Scroll to the top of the survey content when currentGroupIndex changes
    const surveyContent = document.querySelector('.survey-content');
    if (surveyContent) {
      // Use setTimeout to ensure this happens after the DOM has updated
      setTimeout(() => {
        surveyContent.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  }, [currentGroupIndex, showIntro]);

  // Add function to add an overall scoring range
  const addOverallScoringRange = () => {
    const updatedSurveyData = { ...surveyData };
    
    if (!updatedSurveyData.overallScoringRanges) {
      updatedSurveyData.overallScoringRanges = [];
    }
    
    // Find the gap or extend the range
    let newRange: ScoringRange | undefined;
    if (updatedSurveyData.overallScoringRanges.length === 0) {
      newRange = { min: 0, max: 100, title: "Default Range", text: "Default range description" };
    } else {
      const sortedRanges = [...updatedSurveyData.overallScoringRanges].sort((a, b) => a.min - b.min);
      let start = 0;
      for (const range of sortedRanges) {
        if (range.min > start) {
          newRange = { min: start, max: range.min, title: "New Range", text: "New range description" };
          break;
        }
        start = range.max;
      }
      if (!newRange && start < 100) {
        newRange = { min: start, max: 100, title: "New Range", text: "New range description" };
      }
    }
    
    if (newRange) {
      updatedSurveyData.overallScoringRanges.push(newRange);
      setSurveyData(updatedSurveyData);
    }
  };

  // Add function to update an overall scoring range
  const updateOverallScoringRange = (
    rangeIndex: number,
    updates: Partial<ScoringRange>
  ) => {
    const updatedSurveyData = { ...surveyData };
    
    if (!updatedSurveyData.overallScoringRanges) {
      updatedSurveyData.overallScoringRanges = [];
      return;
    }
    
    const range = updatedSurveyData.overallScoringRanges[rangeIndex];
    
    // Update the range
    updatedSurveyData.overallScoringRanges[rangeIndex] = {
      ...range,
      ...updates
    };
    
    setSurveyData(updatedSurveyData);
  };

  // Add function to delete an overall scoring range
  const deleteOverallScoringRange = (rangeIndex: number) => {
    const updatedSurveyData = { ...surveyData };
    
    if (!updatedSurveyData.overallScoringRanges) {
      updatedSurveyData.overallScoringRanges = [];
      return;
    }
    
    updatedSurveyData.overallScoringRanges.splice(rangeIndex, 1);
    
    // If no ranges left, add default range
    if (updatedSurveyData.overallScoringRanges.length === 0) {
      updatedSurveyData.overallScoringRanges.push({ min: 0, max: 100, title: "Default Range", text: "Default range description" });
    }
    
    setSurveyData(updatedSurveyData);
  };

  // Function to render overall scoring ranges
  const renderOverallScoringRanges = () => {
    const ranges = surveyData.overallScoringRanges || [];
    
    return (
      <div className={`scoring-ranges-editor ${getRangeValidationClass(ranges)}`}>
        <div className="scoring-ranges-header">
          <h4>Overall Scoring Ranges</h4>
          <button 
            className="add-button"
            onClick={addOverallScoringRange}
          >
            <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Add Range
          </button>
        </div>
        
        <div className="scoring-ranges-list">
          {ranges.map((range, rangeIndex) => (
            <div key={rangeIndex} className="scoring-range-item">
              <div className="range-inputs">
                <input
                  type="number"
                  className="text-input range-min"
                  value={range.min}
                  onChange={(e) => updateOverallScoringRange(
                    rangeIndex,
                    { min: Math.max(0, Math.min(100, Number(e.target.value))) }
                  )}
                  min={0}
                  max={100}
                />
                <span>to</span>
                <input
                  type="number"
                  className="text-input range-max"
                  value={range.max}
                  onChange={(e) => updateOverallScoringRange(
                    rangeIndex,
                    { max: Math.max(0, Math.min(100, Number(e.target.value))) }
                  )}
                  min={0}
                  max={100}
                />
              </div>
              <div className="range-text-inputs">
                <input
                  type="text"
                  className="text-input range-title"
                  value={range.title}
                  onChange={(e) => updateOverallScoringRange(
                    rangeIndex,
                    { title: e.target.value }
                  )}
                  placeholder="Range title"
                />
                <textarea
                  className="text-input range-text"
                  value={range.text}
                  onChange={(e) => updateOverallScoringRange(
                    rangeIndex,
                    { text: e.target.value }
                  )}
                  placeholder="Range description"
                />
              </div>
              <button
                className="delete-button"
                onClick={() => deleteOverallScoringRange(rangeIndex)}
                aria-label="Delete range"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        {!validateRanges(ranges) && (
          <div className="ranges-error">
            Ranges must cover 0-100 without gaps or overlaps
          </div>
        )}
      </div>
    );
  };

  // Add after moveQuestion function
  const moveQuestionUp = (groupIndex: number, questionIndex: number) => {
    if (questionIndex === 0) return; // Already at the top
    
    // Create a copy of the survey data
    const updatedSurveyData = { ...surveyData };
    const questions = updatedSurveyData.groups[groupIndex].questions;
    
    // Swap the question with the one above it
    const temp = questions[questionIndex];
    questions[questionIndex] = questions[questionIndex - 1];
    questions[questionIndex - 1] = temp;
    
    // Update the survey data
    setSurveyData(updatedSurveyData);
  };
  
  const moveQuestionDown = (groupIndex: number, questionIndex: number) => {
    const questions = surveyData.groups[groupIndex].questions;
    if (questionIndex === questions.length - 1) return; // Already at the bottom
    
    // Create a copy of the survey data
    const updatedSurveyData = { ...surveyData };
    
    // Swap the question with the one below it
    const temp = updatedSurveyData.groups[groupIndex].questions[questionIndex];
    updatedSurveyData.groups[groupIndex].questions[questionIndex] = updatedSurveyData.groups[groupIndex].questions[questionIndex + 1];
    updatedSurveyData.groups[groupIndex].questions[questionIndex + 1] = temp;
    
    // Update the survey data
    setSurveyData(updatedSurveyData);
  };

  // Add after updateCategoryWeight function
  const toggleCategoryType = (
    groupIndex: number,
    questionIndex: number,
    categoryId: string
  ) => {
    const newData = { ...surveyData };
    const question = newData.groups[groupIndex].questions[questionIndex];
    
    if (!question.categoryTypes) {
      question.categoryTypes = {};
    }
    
    // Toggle between 'performance' and 'enabler'
    question.categoryTypes[categoryId] = 
      question.categoryTypes[categoryId] === 'performance' ? 'enabler' : 'performance';
    
    setSurveyData(newData);
  };

  // Add after the WeightsMatrix component definition
  const CategoryTypesMatrix = () => {
    const allQuestions = getAllQuestions();
    const categories = surveyData.categories || [];
    
    // Add a ref to track the modal content scroll position
    const modalContentRef = React.useRef<HTMLDivElement>(null);
    const scrollPositionRef = React.useRef<number>(0);
    
    // Use layout effect to restore scroll position immediately after any re-render
    React.useLayoutEffect(() => {
      if (modalContentRef.current && scrollPositionRef.current > 0) {
        modalContentRef.current.scrollTop = scrollPositionRef.current;
      }
    });
    
    // Handle cell click to toggle type
    const handleTypeToggle = (
      questionId: string,
      categoryId: string
    ) => {
      // Save the current scroll position when toggling cell
      if (modalContentRef.current) {
        scrollPositionRef.current = modalContentRef.current.scrollTop;
      }
      
      const groupIndex = getGroupIndexByQuestionId(questionId);
      if (groupIndex === -1) return;
      
      const questionIndex = findQuestionIndexInGroup(groupIndex, questionId);
      if (questionIndex === -1) return;
      
      // Toggle the type
      toggleCategoryType(groupIndex, questionIndex, categoryId);
    };
    
    return (
      <div className="category-types-matrix">
        <div className="category-types-matrix-header">
          <h3>Performance/Enabler Matrix</h3>
          <p className="category-types-matrix-description">
            Click a cell to toggle between Performance and Enabler for each question-category combination.
          </p>
        </div>
        <div className="matrix-table-container" ref={modalContentRef}>
          <table className="matrix-table">
            <thead>
              <tr>
                <th className="matrix-group-col">Group</th>
                <th className="matrix-question-col">Question</th>
                {categories.map(category => (
                  <th key={category.id} className="matrix-category-col">
                    <div className="matrix-category-header" title={category.name}>
                      {category.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allQuestions.map((question, questionIndex) => {
                const groupIndex = getGroupIndexByQuestionId(question.id);
                const group = surveyData?.groups?.[groupIndex];
                
                return (
                  <tr key={question.id}>
                    <td className="matrix-group-cell matrix-group-col" data-title={group?.title}>
                      {group?.title}
                    </td>
                    <td className="matrix-question-cell matrix-question-col" data-title={question.text}>
                      {question.text}
                    </td>
                    {categories.map((category, categoryIndex) => {
                      const type = question.categoryTypes?.[category.id] || 'performance';
                      
                      return (
                        <td 
                          key={category.id}
                          className={`matrix-type-cell ${type === 'performance' ? 'performance-cell' : 'enabler-cell'}`}
                          onClick={() => handleTypeToggle(question.id, category.id)}
                          title={`Click to toggle between Performance and Enabler`}
                        >
                          {type === 'performance' ? 'Performance' : 'Enabler'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Add new state for showing the category types matrix
  const [showCategoryTypesMatrix, setShowCategoryTypesMatrix] = React.useState(false);
  
  // Add function to update anti-text in edit mode
  const updateQuestionAntiText = (groupIndex: number, questionIndex: number, antiText: string) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions[questionIndex].antiText = antiText;
    setSurveyData(newData);
  };
  
  // Add function to update question help text in edit mode
  const updateQuestionHelpText = (groupIndex: number, questionIndex: number, helpText: string) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions[questionIndex].helpText = helpText;
    setSurveyData(newData);
  };
  
  // Handle slider mouse down - start dragging
  const handleSliderMouseDown = (groupIndex: number, questionIndex: number) => {
    // Function kept for compatibility but simplified - does nothing now
  };
  
  // Handle slider mouse up - end dragging
  const handleSliderMouseUp = () => {
    // Function kept for compatibility but simplified - does nothing now
  };
  
  return (
    <div className={`weighted-assessment-survey ${props.class_name || ''} ${readOnly ? 'read-only' : ''}`}>
      <div className="progress-indicator">
        {renderProgressBar()}
      </div>
      
      <div className="survey-content">
        {showIntro ? (
          <div className={`survey-intro ${showIntro ? 'active' : ''}`}>
            {editMode ? (
              <>
                <input
                  type="text"
                  className="text-input"
                  value={surveyData?.title || ''}
                  onChange={(e) => setSurveyData({ ...surveyData, title: e.target.value })}
                  placeholder="Survey Title"
                />
                <textarea
                  className="textarea-input"
                  value={surveyData?.description || ''}
                  onChange={(e) => setSurveyData({ ...surveyData, description: e.target.value })}
                  placeholder="Survey Description"
                  style={{ marginTop: '8px' }}
                />
                
                <div className="option-checkbox-container" style={{ marginTop: '16px' }}>
                  <label className="option-checkbox-label">
                    <input
                      type="checkbox"
                      checked={surveyData?.useQualitativeScale || false}
                      onChange={toggleQualitativeScale}
                      className="option-checkbox"
                    />
                    <span>Use qualitative scale (Strongly Disagree - Strongly Agree)</span>
                  </label>
                </div>
              </>
            ) : (
              <>
                <h1 className="survey-title">{surveyData?.title || ''}</h1>
                <SimpleMarkdownRender 
                  content={surveyData?.description || ''} 
                  className="survey-description"
                />
                
              </>
            )}
            <div className="nav-buttons-intro">
            <button 
              className="nav-button next-button"
              onClick={goToNextGroup}
              >
                Start
              </button>
            </div>
          </div>
        ) : (
          <>
            {editMode && (
              <div className="edit-tabs">
                <button 
                  className={`edit-tab ${activeEditTab === 'content' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('content')}
                >
                  Survey Content
                </button>
                <button 
                  className={`edit-tab ${activeEditTab === 'categories' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('categories')}
                >
                  Categories
                </button>
                <button 
                  className={`edit-tab ${activeEditTab === 'weights' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('weights')}
                >
                  Weights Matrix
                </button>
                <button 
                  className={`edit-tab ${activeEditTab === 'types' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('types')}
                >
                  Types Matrix
                </button>
                <button 
                  className={`edit-tab ${activeEditTab === 'conclusion' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('conclusion')}
                >
                  Conclusion
                </button>
                <button 
                  className={`edit-tab ${activeEditTab === 'overall' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('overall')}
                >
                  Overall Scoring
                </button>
              </div>
            )}
            
            {editMode && activeEditTab === 'weights' ? (
              renderWeightsSection()
            ) : editMode && activeEditTab === 'types' ? (
              // Add section for category types
              <div className="category-types-section">
                <div className="section-header">
                  <h3>Performance/Enabler Categories</h3>
                  <p className="section-description">
                    Categorize each question-category combination as either a Performance or an Enabler.
                  </p>
                </div>
                
                <button 
                  className="edit-types-button"
                  onClick={() => setShowCategoryTypesMatrix(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                  </svg>
                  Open Performance/Enabler Matrix
                </button>
                
                {showCategoryTypesMatrix && (
                  <div className="weights-modal-overlay" onClick={() => setShowCategoryTypesMatrix(false)}>
                    <div className="weights-modal-fullscreen" onClick={e => e.stopPropagation()}>
                      <div className="weights-modal-header">
                        <h2>Performance/Enabler Categories Matrix</h2>
                        <button className="weights-modal-close" onClick={() => setShowCategoryTypesMatrix(false)}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                      <div className="weights-modal-content" ref={modalContentRef}>
                        <CategoryTypesMatrix />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : editMode && activeEditTab === 'categories' ? (
              <div className="categories-editor">
                <div className="categories-header">
                  <h3>Categories</h3>
                  <p className="categories-description">
                    Define categories to classify and weight questions. Each question can be weighted differently across categories.
                  </p>
                </div>
                
                {surveyData.categories?.map((category, index) => (
                  <div key={category.id} className="category-item">
                    <div className="category-header">
                      <input
                        type="text"
                        className="text-input"
                        value={category.name}
                        onChange={(e) => updateCategoryName(index, e.target.value)}
                        placeholder="Category name"
                      />
                      <div className="category-id-container">
                        <label className="category-id-label">ID:</label>
                        <input
                          type="text"
                          className="text-input category-id-input"
                          value={category.id}
                          onChange={(e) => updateCategoryId(index, e.target.value)}
                          maxLength={8}
                          style={{ width: '80px' }}
                        />
                      </div>
                      <button
                        className="delete-button"
                        onClick={() => deleteCategory(index)}
                        aria-label="Delete category"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                    <textarea
                      className="textarea-input"
                      value={category.description}
                      onChange={(e) => updateCategoryDescription(index, e.target.value)}
                      placeholder="Category description"
                    />
                    
                    <div className="category-icon-editor">
                      <h4>Category Image</h4>
                      <div className="icon-editor-container">
                        <div className="icon-input-container">
                          <input
                            type="text"
                            className="text-input icon-input"
                            value={category.imageRef || ''}
                            onChange={(e) => updateCategoryImageRef(index, e.target.value)}
                            placeholder="Enter image filename (e.g. category1.png)"
                          />
                          <div className="icon-input-help">
                            Enter the filename of an image from the static folder
                          </div>
                        </div>
                        <div className="icon-preview-container">
                          <div className="icon-preview-heading">
                            Preview:
                            <button 
                              type="button"
                              className="icon-preview-toggle"
                              onClick={() => toggleIconPreviewMode(category.id)}
                              title={iconPreviewDarkMode[category.id] ? "Switch to light background" : "Switch to dark background"}
                              data-category-id={category.id}
                            >
                              {iconPreviewDarkMode[category.id] ? "Light" : "Dark"}
                            </button>
                          </div>
                          <div 
                            className={`icon-preview ${iconPreviewDarkMode[category.id] ? 'dark-mode' : ''}`}
                            data-category-id={category.id}
                          >
                            <ImagePreview imageRef={category.imageRef} categoryId={category.id} darkMode={iconPreviewDarkMode[category.id] || false} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`scoring-ranges-editor ${getRangeValidationClass(category.scoringRanges || [])}`}>
                      <div className="scoring-ranges-header">
                        <h4>Scoring Ranges</h4>
                        <button 
                          className="add-button"
                          onClick={() => addCategoryRange(index)}
                        >
                          <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                          </svg>
                          Add Range
                        </button>
                      </div>
                      
                      <div className="scoring-ranges-list">
                        {(category.scoringRanges || []).map((range, rangeIndex) => (
                          <div key={rangeIndex} className="scoring-range-item">
                            <div className="range-inputs">
                              <input
                                type="number"
                                className="text-input range-min"
                                value={range.min}
                                onChange={(e) => updateCategoryRange(
                                  index,
                                  rangeIndex,
                                  { min: Math.max(0, Math.min(100, Number(e.target.value))) }
                                )}
                                min={0}
                                max={100}
                              />
                              <span>to</span>
                              <input
                                type="number"
                                className="text-input range-max"
                                value={range.max}
                                onChange={(e) => updateCategoryRange(
                                  index,
                                  rangeIndex,
                                  { max: Math.max(0, Math.min(100, Number(e.target.value))) }
                                )}
                                min={0}
                                max={100}
                              />
                            </div>
                            <div className="range-text-inputs">
                              <input
                                type="text"
                                className="text-input range-title"
                                value={range.title}
                                onChange={(e) => updateCategoryRange(
                                  index,
                                  rangeIndex,
                                  { title: e.target.value }
                                )}
                                placeholder="Range title"
                              />
                              <textarea
                                className="text-input range-text"
                                value={range.text}
                                onChange={(e) => updateCategoryRange(
                                  index,
                                  rangeIndex,
                                  { text: e.target.value }
                                )}
                                placeholder="Range description"
                              />
                            </div>
                            <button
                              className="delete-button"
                              onClick={() => deleteCategoryRange(index, rangeIndex)}
                              aria-label="Delete range"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      {!validateRanges(category.scoringRanges || []) && (
                        <div className="ranges-error">
                          Ranges must cover 0-100 without gaps or overlaps
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <button className="add-button" onClick={addCategory}>
                  <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                  </svg>
                  Add Category
                </button>
              </div>
            ) : editMode && activeEditTab === 'conclusion' ? (
              <div className="conclusion-editor">
                <div className="conclusion-header">
                  <h3>Survey Conclusion</h3>
                  <p className="conclusion-description">
                    Add a conclusion text in markdown format. This will be stored with the survey data but not shown to users taking the survey.
                  </p>
                </div>
                <div className="conclusion-content">
                  <div className="conclusion-edit-area">
                    <textarea
                      className="textarea-input conclusion-textarea"
                      value={surveyData?.conclusion || ''}
                      onChange={(e) => updateConclusion(e.target.value)}
                      placeholder="Enter conclusion text in markdown format..."
                    />
                  </div>
                  <div className="conclusion-preview">
                    <h4>Preview</h4>
                    <div className="markdown-preview">
                      <SimpleMarkdownRender 
                        content={surveyData?.conclusion || ''} 
                        className="markdown-content"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : editMode && activeEditTab === 'overall' ? (
              renderOverallScoringRanges()
            ) : (
              <>
                {surveyData?.groups?.length > 0 ? (
                  surveyData.groups.map((group, groupIndex) => (
                    <div 
                      key={group.id || groupIndex} 
                      className={`survey-group ${groupIndex === currentGroupIndex ? 'active' : ''}`}
                      style={{ display: groupIndex === currentGroupIndex ? 'block' : 'none' }}
                    >
                      <button 
                        className="nav-button back-button"
                        onClick={goToPreviousGroup}
                      >
                        Back
                      </button>
                      
                      <div className="group-header">
                        {editMode ? (
                          <input
                            type="text"
                            className="text-input"
                            value={group.title}
                            onChange={(e) => updateGroupTitle(groupIndex, e.target.value)}
                            style={{ width: 'calc(100% - 40px)' }}
                          />
                        ) : (
                          <div className="group-title">{group.title}</div>
                        )}
                        
                        {editMode && (
                          <button 
                            className="delete-button" 
                            onClick={() => deleteGroup(groupIndex)}
                            aria-label="Delete group"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="group-content">
                        {editMode ? (
                          <>
                            <textarea
                              className="textarea-input"
                              value={group.description}
                              onChange={(e) => updateGroupDescription(groupIndex, e.target.value)}
                              placeholder="Group Description"
                            />
                            {renderScoringRanges(group, groupIndex)}
                          </>
                        ) : (
                          <div className="group-description">
                            <SimpleMarkdownRender content={group.description} />
                          </div>
                        )}
                        
                        <div className="group-divider"></div>
                        
                        {group.questions.length > 0 ? (
                          group.questions.map((question, questionIndex) => (
                            <div key={question.id} className="question-container">
                              {editMode ? (
                                <div className="question-header">
                                  <input
                                    type="text"
                                    className="text-input"
                                    value={question.text}
                                    onChange={(e) => updateQuestionText(groupIndex, questionIndex, e.target.value)}
                                    style={{ width: 'calc(100% - 120px)' }}
                                  />
                                  <div className="question-id-container">
                                    <label className="question-id-label">ID:</label>
                                    <input
                                      type="text"
                                      className="text-input question-id-input"
                                      value={question.id}
                                      onChange={(e) => updateQuestionId(groupIndex, questionIndex, e.target.value)}
                                      maxLength={8}
                                      style={{ width: '80px' }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="question-content">
                                  <div className="question-text-container">
                                    <div className="question-text-with-help">
                                      <SimpleMarkdownRender 
                                        content={question.text}
                                        className="question-text-inline"
                                      />
                                      {question.helpText && (
                                        <span className="question-help-icon" data-title={question.helpText}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
                                          </svg>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Add help text editor in edit mode */}
                              {editMode && (
                                <div className="help-text-container">
                                  <label className="help-text-label">
                                    Question Help Text (shown on hover):
                                    <textarea
                                      className="textarea-input help-text-input"
                                      value={question.helpText || ""}
                                      onChange={(e) => updateQuestionHelpText(groupIndex, questionIndex, e.target.value)}
                                      placeholder="Enter optional help text for this question..."
                                    />
                                  </label>
                                </div>
                              )}

                              {/* Anti-text input in edit mode */}
                              {editMode && (
                                <div className="anti-text-container">
                                  <label className="anti-text-label">Anti-Question Text:</label>
                                  <input
                                    type="text"
                                    className="text-input anti-text-input"
                                    value={question.antiText || ''}
                                    onChange={(e) => updateQuestionAntiText(groupIndex, questionIndex, e.target.value)}
                                    placeholder="Enter the anti-question text here..."
                                  />
                                </div>
                              )}
                              
                              <div className="controls-row">
                                <div className="slider-container">
                                  <input
                                    type="range"
                                    className={`assessment-slider ${question.value === null ? 'unselected' : ''}`}
                                    value={question.value !== null ? question.value : question.min}
                                    min={question.min}
                                    max={question.max}
                                    onChange={(e) => handleSliderChange(e, groupIndex, questionIndex)}
                                    onClick={(e) => handleSliderClick(e, groupIndex, questionIndex)}
                                    disabled={readOnly}
                                  />
                                  <div className="slider-markers">
                                    {renderSliderMarkers(question.min, question.max)}
                                  </div>
                                  
                                  {/* Add "I do not know" checkbox */}
                                  {enableDoNotKnow && !editMode && !readOnly && (
                                    <div className="do-not-know-container">
                                      <label className="do-not-know-label">
                                        <input
                                          type="checkbox"
                                          className="do-not-know-checkbox"
                                          checked={question.doNotKnow || false}
                                          onChange={() => toggleDoNotKnow(groupIndex, questionIndex)}
                                          disabled={readOnly}
                                        />
                                        <span>I do not know</span>
                                      </label>
                                    </div>
                                  )}
                                </div>
                                
                                {!readOnly && (
                                  <div className="comment-button-container">
                                    <button 
                                      className={`comment-button ${question.comment ? 'has-comment' : ''}`}
                                      onClick={() => toggleComment(question.id)}
                                      aria-label={question.comment ? "Edit comment" : "Add comment"}
                                      title={question.comment ? "Edit comment" : "Add comment"}
                                    >
                                      <div className="comment-button-icons">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="comment-bubble-icon">
                                          {question.comment ? (
                                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor"/>
                                          ) : (
                                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
                                          )}
                                        </svg>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="plus-minus-icon">
                                          {visibleComments[question.id] ? (
                                            <path d="M19 13H5v-2h14v2z" fill="currentColor"/>
                                          ) : (
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                                          )}
                                        </svg>
                                      </div>
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              {editMode && (
                                <div className="question-content">
                                  <div className="question-edit-controls">
                                    <div className="range-inputs">
                                      <input
                                        type="number"
                                        className="text-input range-input"
                                        value={question.min}
                                        onChange={(e) => updateQuestionRange(
                                          groupIndex, 
                                          questionIndex, 
                                          Number(e.target.value), 
                                          question.max
                                        )}
                                        min={0}
                                        placeholder="Min"
                                      />
                                      <input
                                        type="number"
                                        className="text-input range-input"
                                        value={question.max}
                                        onChange={(e) => updateQuestionRange(
                                          groupIndex, 
                                          questionIndex, 
                                          question.min, 
                                          Number(e.target.value)
                                        )}
                                        min={1}
                                        placeholder="Max"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {editMode && (
                                <div className="question-controls">
                                  {/* Add move up/down buttons */}
                                  <button 
                                    className="move-up-button" 
                                    onClick={() => moveQuestionUp(groupIndex, questionIndex)}
                                    aria-label="Move question up"
                                    title="Move question up"
                                    disabled={questionIndex === 0}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  <button 
                                    className="move-down-button" 
                                    onClick={() => moveQuestionDown(groupIndex, questionIndex)}
                                    aria-label="Move question down"
                                    title="Move question down"
                                    disabled={questionIndex === surveyData.groups[groupIndex].questions.length - 1}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  
                                  {surveyData.categories && surveyData.categories.length > 0 && (
                                    <button 
                                      className="category-weights-button" 
                                      onClick={() => toggleCategoryWeights(question.id)}
                                      aria-label="Toggle category weights"
                                      title="Category weights"
                                    >
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
                                      </svg>
                                    </button>
                                  )}
                                  <button 
                                    className="clear-button" 
                                    onClick={() => clearQuestionAnswer(groupIndex, questionIndex)}
                                    aria-label="Clear answer"
                                    title="Clear answer"
                                    disabled={question.value === null}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                                    </svg>
                                  </button>
                                  
                                  {/* Add move button */}
                                  {surveyData.groups.length > 1 && (
                                    <div className="move-question-container">
                                      <button
                                        type="button"
                                        className="move-button"
                                        title="Move question to another group"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
                                          dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
                                        }}
                                      >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M19 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </button>
                                      <div className="move-dropdown">
                                        {surveyData.groups.map((group, targetGroupIndex) => (
                                          targetGroupIndex !== groupIndex && (
                                            <div 
                                              key={group.id} 
                                              className="move-dropdown-item"
                                              onClick={() => {
                                                moveQuestion(groupIndex, questionIndex, targetGroupIndex);
                                                // Close all dropdowns
                                                const dropdowns = document.querySelectorAll('.move-dropdown');
                                                dropdowns.forEach(dropdown => {
                                                  (dropdown as HTMLElement).style.display = 'none';
                                                });
                                              }}
                                            >
                                              {group.title || `Group ${targetGroupIndex + 1}`}
                                            </div>
                                          )
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <button 
                                    className="delete-button" 
                                    onClick={() => deleteQuestion(groupIndex, questionIndex)}
                                    aria-label="Delete question"
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                                    </svg>
                                  </button>
                                </div>
                              )}
                              
                              {showCategoryWeights[question.id] && editMode && surveyData.categories && (
                                <div className="category-weights-container">
                                  <div className="category-weights-title">Category Weights</div>
                                  {surveyData.categories.map((category) => (
                                    <div key={category.id} className="category-weight-item">
                                      <div className="category-weight-label">{category.name}</div>
                                      <input
                                        type="number"
                                        className="text-input weight-input"
                                        value={question.categoryWeights?.[category.id] || 0}
                                        onChange={(e) => updateCategoryWeight(
                                          groupIndex,
                                          questionIndex,
                                          category.id,
                                          Number(e.target.value)
                                        )}
                                        min={0}
                                        max={100}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {visibleComments[question.id] && !readOnly && (
                                <div className="comment-container">
                                  <textarea
                                    ref={commentTextareaRef}
                                    className="comment-textarea"
                                    placeholder="Add your comment here..."
                                    value={
                                      commentBeingEdited && 
                                      commentBeingEdited.groupIndex === groupIndex && 
                                      commentBeingEdited.questionIndex === questionIndex
                                        ? commentBeingEdited.value
                                        : question.comment
                                    }
                                    onChange={handleCommentChange}
                                    onFocus={() => handleCommentFocus(groupIndex, questionIndex, question.comment)}
                                    onBlur={handleCommentBlur}
                                    disabled={readOnly}
                                  />
                                </div>
                              )}
                              
                              {readOnly && question.comment && (
                                <div className="comment-container read-only">
                                  <SimpleMarkdownRender content={question.comment} className="comment-text" />
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="no-questions-message">
                            {editMode ? 
                              "No questions added yet. Use the 'Add Question' button below to create questions." : 
                              "No questions to answer in this section."}
                          </div>
                        )}
                        
                        {editMode && (
                          <button 
                            className="add-button" 
                            onClick={() => addQuestion(groupIndex)}
                          >
                            <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                            </svg>
                            Add Question
                          </button>
                        )}
                      </div>
                      <div className="nav-buttons-intro">
                        {validationMessage && (
                          <div className="validation-message">
                            {validationMessage}
                          </div>
                        )}
                        {!editMode && !areAllQuestionsAnsweredInGroup(currentGroupIndex) && !validationMessage && (
                          <div className="validation-message">
                            Please answer all questions above to proceed
                          </div>
                        )}
                        <button 
                          className="nav-button next-button"
                          onClick={goToNextGroup}
                          disabled={!editMode && !areAllQuestionsAnsweredInGroup(currentGroupIndex)}
                        >
                          {(currentGroupIndex >= surveyData?.groups?.length - 1 && !submitted) ? 'Submit' : 'Next'}
                        </button>
                      </div>
                      
                    </div>
                  ))
                ) : (
                  <div className="no-groups-message">
                    {editMode ? 
                      "No groups added yet. Use the 'Add Group' button below to create a group." : 
                      "No survey content available."}
                  </div>
                )}
              </>
              
            )}
            
          </>
        )}
      </div>
      
      {!disableEditing && (
        <div className="survey-footer">
          {editMode ? (
            <div className="footer-buttons">
              <button
                className="save-button"
                onClick={handleSave}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                </svg>
                Save Changes
              </button>
              <button
                className="undo-button"
                onClick={handleUndoChanges}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" fill="currentColor"/>
                </svg>
                Undo Changes
              </button>
              <button 
                className="clear-all-button" 
                onClick={clearAllAnswers}
                title="Clear all answers"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                </svg>
                Clear All Answers
              </button>
              <button 
                className="upload-button" 
                onClick={triggerFileUpload}
                title="Upload survey data from JSON"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" fill="currentColor"/>
                </svg>
                Upload JSON
              </button>
              <button 
                className="add-button" 
                onClick={addGroup}
              >
                <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                </svg>
                Add Group
              </button>
            </div>
          ) : (
            <>
              {!disableEditing && (
                <button
                  className="edit-button"
                  onClick={handleEditMode}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                  </svg>
                  Edit Survey
                </button>
              )}
              {!readOnly && !editMode && !disableEditing && (
                <>
                  <button 
                    className="generate-answers-button" 
                    onClick={generateRandomAnswers}
                    title="Generate random answers"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/>
                      <path d="M7 12h2v5h2v-5h2V7H7v5zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
                    </svg>
                    Generate Random
                  </button>
                  <button 
                    className="download-button" 
                    onClick={downloadSurveyJson}
                    title="Download survey data as JSON"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                    </svg>
                    Download JSON
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Add a hidden file input for JSON upload */}
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={uploadSurveyJson}
        />
      </div>
    );
}

export default {
  render: createRender(WeightedAssessmentSurveyWidget as any) // Cast to any for createRender
} 