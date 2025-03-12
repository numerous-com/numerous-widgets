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
  timestamps: Record<number, number>; // Store timestamps for each value change
}

interface Category {
  id: string;
  name: string;
  description: string;
  scoringRanges: ScoringRange[];  // Add scoring ranges to categories
  icon?: string;  // SVG icon code
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
}

function WeightedAssessmentSurveyWidget(props: WeightedAssessmentSurveyWidgetProps) {
  const [surveyData, setSurveyData] = useModelState<SurveyData>("survey_data");
  const [editMode, setEditMode] = useModelState<boolean>("edit_mode");
  const [className] = useModelState<string>("class_name");
  const [saved, setSaved] = useModelState<boolean>("saved");  // Get both value and setter
  const [disableEditing] = useModelState<boolean>("disable_editing");
  const [readOnly] = useModelState<boolean>("read_only");
  
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
        categories: []
      });
    } else if (!surveyData.groups) {
      setSurveyData({
        ...surveyData,
        groups: []
      });
    }
  }, [surveyData, setSurveyData]);
  
  // State for tracking which comments are visible
  const [visibleComments, setVisibleComments] = React.useState<Record<string, boolean>>({});
  
  // State for slide navigation
  const [currentGroupIndex, setCurrentGroupIndex] = React.useState(0);
  
  // State for edit mode tabs
  const [activeEditTab, setActiveEditTab] = React.useState<'content' | 'categories' | 'weights' | 'conclusion'>('content');
  
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
  
  // Add state to track slider value during dragging
  const [sliderDragValue, setSliderDragValue] = React.useState<{
    groupIndex: number;
    questionIndex: number;
    value: number;
  } | null>(null);
  
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
    
    // Sort ranges by min value
    group.scoringRanges.sort((a, b) => a.min - b.min);
    
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
            if (question?.value !== null) {
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
    return surveyData.groups[groupIndex].questions.every(q => q.value !== null);
  };

  const countUnansweredQuestionsInGroup = (groupIndex: number): number => {
    if (!surveyData?.groups?.[groupIndex]) return 0;
    return surveyData.groups[groupIndex].questions.filter(q => q.value === null).length;
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
    return group.questions.filter(q => q.value === null).length;
  };
  
  // Modify navigation functions to handle intro slide and final slide
  const goToNextGroup = () => {
    // Special case for intro screen - bypass validation check
    if (showIntro) {
      setShowIntro(false);
      setCurrentGroupIndex(0);
      setValidationMessage('');
      const surveyContent = document.querySelector('.survey-content');
      if (surveyContent) {
        surveyContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (currentGroupIndex >= surveyData?.groups?.length - 1) {
      handleSubmit();
      return;
    }

    if (!areAllQuestionsAnsweredInGroup(currentGroupIndex)) {
      setValidationMessage(generateValidationMessage(currentGroupIndex));
      return;
    }

    setCurrentGroupIndex(currentGroupIndex + 1);
    setValidationMessage('');
  };
  
  const goToPreviousGroup = () => {
    if (currentGroupIndex === 0) {
      setShowIntro(true);
      const surveyContent = document.querySelector('.survey-content');
      if (surveyContent) {
        surveyContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
      const surveyContent = document.querySelector('.survey-content');
      if (surveyContent) {
        surveyContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
  
  // Update question value with timestamp and reset submitted state
  const updateQuestionValue = (groupIndex: number, questionIndex: number, newValue: number | null): void => {
    if (readOnly) return; // Don't update if in read-only mode
    
    const newData = { ...surveyData };
    const question = newData.groups[groupIndex].questions[questionIndex];
    
    // Calculate elapsed time in seconds
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    // Initialize timestamps object if it doesn't exist
    if (!question.timestamps) {
      question.timestamps = {};
    }
    
    // Store the timestamp for this value
    // Round to 2 decimal places for use as an object key
    if (newValue !== null) {
      const roundedValue = Math.round(newValue * 100) / 100;
      question.timestamps[roundedValue] = elapsedSeconds;
      
      // Update the value - keep full precision
      question.value = newValue;
    } else {
      question.value = null;
    }
    
    // Reset submitted state
    setSubmitted(false);
    
    // Update validation message based on current state of questions
    if (areAllQuestionsAnsweredInGroup(groupIndex)) {
      setValidationMessage('');
    } else if (validationMessage) {
      setValidationMessage(generateValidationMessage(groupIndex));
    }
    
    setSurveyData(newData);
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
      icon: "",
      scoringRanges: [{ min: 0, max: 100, title: "Default Range", text: "Default range description" }]  // Initialize with default range
    };
    
    const updatedSurveyData = { ...surveyData };
    
    if (!updatedSurveyData.categories) {
      updatedSurveyData.categories = [];
    }
    
    updatedSurveyData.categories.push(newCategory);
    
    // Initialize this category's weight in all questions
    updatedSurveyData.groups.forEach(group => {
      group.questions.forEach(question => {
        if (!question.categoryWeights) {
          question.categoryWeights = {};
        }
        question.categoryWeights[categoryId] = 0;
      });
    });
    
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
  
  const updateCategoryIcon = (index: number, icon: string) => {
    const updatedSurveyData = { ...surveyData };
    updatedSurveyData.categories[index].icon = icon;
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
    
    // Initialize category weights for the new question
    const categoryWeights: Record<string, number> = {};
    if (newData.categories) {
      newData.categories.forEach(category => {
        categoryWeights[category.id] = 0;
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
      timestamps: {}
    });
    
    setSurveyData(newData);
  };
  
  const deleteQuestion = (groupIndex: number, questionIndex: number) => {
    const newData = { ...surveyData };
    newData.groups[groupIndex].questions.splice(questionIndex, 1);
    setSurveyData(newData);
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
    // Calculate appropriate step size to ensure we have at most 6 markers
    const range = max - min;
    const maxMarkers = 6;
    let step = Math.ceil(range / (maxMarkers - 1));
    
    // Create array of marker values
    const markers = [];
    for (let value = min; value <= max; value += step) {
      markers.push(value);
    }
    
    // Ensure the max value is always included
    if (markers[markers.length - 1] !== max) {
      markers[markers.length - 1] = max;
    }
    
    // When using qualitative scale, always show exactly 5 labels
    if (surveyData.useQualitativeScale) {
      const qualitativeValues = [0, 1, 2, 3, 4]; // These will be normalized to the min-max range
      
      return (
        <div className="slider-markers qualitative-scale">
          {qualitativeValues.map((value) => {
            // Calculate the actual value in the min-max range
            const actualValue = min + (value * (max - min) / 4);
            // Calculate the position as a percentage along the slider
            const percentage = (value / 4) * 100;
            return (
              <div 
                key={value} 
                className="slider-marker"
                style={{ left: `${percentage}%` }}
              >
                {getQualitativeLabel(value, 0, 4)} {/* Always use standard 0-4 range for labels */}
              </div>
            );
          })}
        </div>
      );
    }
    
    // Default numeric display
    return (
      <div className="slider-markers">
        {markers.map((value) => {
          // Calculate the position as a percentage along the slider
          const percentage = ((value - min) / (max - min)) * 100;
          return (
            <div 
              key={value} 
              className="slider-marker"
              style={{ left: `${percentage}%` }}
            >
              {value}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Replace renderProgressDots with renderProgressBar
  const renderProgressBar = () => {
    const progressPercentage = progress.percentage;
    
    return (
      <div className="progress-bar-container">
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
    // Set the submitted flag to true to trigger Python callback
    await setSubmitted(true);
    
    // Ensure model changes are saved
    if (props.model) {
      await props.model.save_changes();
    }
    
    // Update local UI state
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
      <div className="weights-matrix-container">
        <div className="weights-matrix-header">
          <h3>Category Weights Matrix</h3>
          <p className="weights-matrix-description">
            View and edit the weights of each question across categories.
          </p>
        </div>
        
        <button 
          className="edit-weights-button"
          onClick={() => setShowWeightsMatrix(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/>
            <path d="M11 7h2v10h-2z" fill="currentColor"/>
            <path d="M7 11h10v2H7z" fill="currentColor"/>
          </svg>
          Open Full-Screen Matrix
        </button>
        
        {showWeightsMatrix && (
          <div className="weights-modal-overlay" onClick={() => setShowWeightsMatrix(false)}>
            <div className="weights-modal-fullscreen" onClick={e => e.stopPropagation()}>
              <div className="weights-modal-header">
                <h2>Category Weights Matrix</h2>
                <button 
                  className="weights-modal-close"
                  onClick={() => setShowWeightsMatrix(false)}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="weights-modal-content">
                <WeightsMatrix />
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
    
    // Sort ranges by min value
    category.scoringRanges.sort((a, b) => a.min - b.min);
    
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

  // Add clearQuestionAnswer function after updateQuestionValue
  const clearQuestionAnswer = (groupIndex: number, questionIndex: number) => {
    const newData = { ...surveyData };
    const question = newData.groups[groupIndex].questions[questionIndex];
    
    // Clear the value
    question.value = null;
    
    // Reset submitted state
    setSubmitted(false);
    
    setSurveyData(newData);
  };

  // Add function to clear all answers
  const clearAllAnswers = () => {
    const newData = { ...surveyData };
    
    // Clear all question values
    newData.groups.forEach(group => {
      group.questions.forEach(question => {
        question.value = null;
      });
    });
    
    // Reset submitted state
    setSubmitted(false);
    
    setSurveyData(newData);
  };

  // Add generateRandomAnswers function after clearAllAnswers
  const generateRandomAnswers = async () => {
    const newData = { ...surveyData };
    
    // Sample comments in plain text (without markdown formatting)
    const commentTemplates = [
      "This score seems appropriate based on the current circumstances.",
      "I'd like to note that this area needs improvement.",
      "Additional Notes: This rating reflects recent changes we've observed.",
      "Score is based on the following factors: Recent performance, Historical data, Team feedback",
      "This is a provisional rating that may change with more information.",
      "Rating justification: Value represents current assessment based on available data",
      "I'm confident in this score based on multiple observations.",
      "Previous rating was lower but recent improvements justify this score.",
      "Reasoning: This score aligns with our expectations for this category.",
      "Rating is influenced by: Primary factors, Secondary considerations, External variables",
      "Note: This assessment is preliminary and subject to review.",
      "The score reflects a balanced consideration of strengths and weaknesses."
    ];
    
    // Generate random answers for all questions
    newData.groups.forEach(group => {
      group.questions.forEach(question => {
        // Ensure min and max are valid numbers
        const min = typeof question.min === 'number' ? question.min : 0;
        const max = typeof question.max === 'number' ? question.max : 5;
        
        // Generate a random value between min and max (inclusive)
        const range = max - min;
        const randomValue = Math.floor(Math.random() * (range + 1)) + min;
        question.value = randomValue;
        
        // Generate a random comment for approximately 40% of questions
        if (Math.random() < 0.4) {
          // Select a random comment template
          const commentTemplate = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
          
          // Create value-specific comment content
          let valueSpecificComment = "";
          if (randomValue <= min + (range * 0.25)) {
            valueSpecificComment = "\n\nThis low score indicates significant concerns.";
          } else if (randomValue <= min + (range * 0.5)) {
            valueSpecificComment = "\n\nThis score indicates some areas for improvement.";
          } else if (randomValue <= min + (range * 0.75)) {
            valueSpecificComment = "\n\nThis above-average score shows good progress.";
          } else {
            valueSpecificComment = "\n\nThis high score reflects excellent performance.";
          }
          
          // Combine template and value-specific comment
          question.comment = commentTemplate + valueSpecificComment;
        } else {
          // Clear any existing comment
          question.comment = "";
        }
      });
    });
    
    // Update survey data
    setSurveyData(newData);
    
    // Set submitted to true to trigger Python callback
    await setSubmitted(true);
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
              timestamps: q.timestamps || {}
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
          conclusion: uploadedData.conclusion || ''
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

  // Get the qualitative labels for a numeric value
  const getQualitativeLabel = (value: number, min: number, max: number) => {
    // If min and max don't match the standard 0-4 range, adjust accordingly
    const normalizedValue = min === 0 && max === 4 
      ? value 
      : Math.round((value - min) / (max - min) * 4);
    
    switch (normalizedValue) {
      case 0: return "Strongly Disagree";
      case 1: return "Disagree";
      case 2: return "Neutral";
      case 3: return "Agree";
      case 4: return "Strongly Agree";
      default: return value.toString(); // Fallback to numeric value
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

  // Handle slider drag (update visual state only)
  const handleSliderDrag = (groupIndex: number, questionIndex: number, value: number) => {
    setSliderDragValue({
      groupIndex,
      questionIndex,
      value
    });
  };

  // Handle slider release (commit the value)
  const handleSliderRelease = () => {
    if (sliderDragValue) {
      const { groupIndex, questionIndex, value } = sliderDragValue;
      updateQuestionValue(groupIndex, questionIndex, value);
      setSliderDragValue(null);
    }
  };

  // Add state for icon preview background mode (checkerboard or dark)
  const [iconPreviewDarkMode, setIconPreviewDarkMode] = React.useState<Record<string, boolean>>({});
  
  // Function to toggle the icon preview background for a specific category
  const toggleIconPreviewMode = (categoryId: string) => {
    setIconPreviewDarkMode(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Add mouse hover handling for sliders
  const handleSliderMouseMove = (e: React.MouseEvent<HTMLInputElement>, groupIndex: number, questionIndex: number, question: Question) => {
    // Only show preview position if the slider hasn't been set yet
    if (question.value !== null) return;
    
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, position / rect.width));
    
    // Calculate value based on percentage of slider width
    const value = question.min + percentage * (question.max - question.min);
    
    // Update slider preview position
    handleSliderDrag(groupIndex, questionIndex, Math.round(value));
  };
  
  const handleSliderMouseLeave = () => {
    // For unselected sliders, don't immediately clear the preview
    // Instead, let the CSS transition handle the visual fade-out
    if (sliderDragValue && surveyData.groups[sliderDragValue.groupIndex]?.questions[sliderDragValue.questionIndex]?.value === null) {
      // Set a short timeout to allow the CSS transition to complete before removing the thumb completely
      setTimeout(() => {
        setSliderDragValue(null);
      }, 250); // Match this with the CSS transition duration
    }
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
                  className={`edit-tab ${activeEditTab === 'conclusion' ? 'active' : ''}`}
                  onClick={() => setActiveEditTab('conclusion')}
                >
                  Conclusion
                </button>
              </div>
            )}
            
            {editMode && activeEditTab === 'weights' ? (
              renderWeightsSection()
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
                      <h4>Category Icon (SVG)</h4>
                      <div className="icon-editor-container">
                        <div className="icon-textarea-container">
                          <textarea
                            className="textarea-input icon-textarea"
                            value={category.icon || ''}
                            onChange={(e) => updateCategoryIcon(index, e.target.value)}
                            placeholder="Paste SVG code here..."
                          />
                        </div>
                        <div className="icon-preview-container">
                          <div className="icon-preview-heading">
                            Preview:
                            <button 
                              type="button"
                              className="icon-preview-toggle"
                              onClick={() => toggleIconPreviewMode(category.id)}
                              title={iconPreviewDarkMode[category.id] ? "Switch to checkerboard background" : "Switch to dark background"}
                            >
                              {iconPreviewDarkMode[category.id] ? "Light" : "Dark"}
                            </button>
                          </div>
                          <div 
                            className={`icon-preview ${iconPreviewDarkMode[category.id] ? 'dark-mode' : ''}`}
                            dangerouslySetInnerHTML={{ __html: category.icon || '<div class="no-icon">No icon</div>' }}
                          />
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
                                  <SimpleMarkdownRender content={question.text} className="question-text" />
                                  </div>
                                </div>
                              )}
                              
                              <div className="controls-row">
                                <div className="slider-container">
                                  <input
                                    type="range"
                                    className={`assessment-slider ${question.value === null ? 'unselected' : ''}`}
                                    value={
                                      sliderDragValue && 
                                      sliderDragValue.groupIndex === groupIndex && 
                                      sliderDragValue.questionIndex === questionIndex
                                        ? sliderDragValue.value
                                        : question.value !== null ? question.value : question.min
                                    }
                                    min={question.min}
                                    max={question.max}
                                    onChange={(e) => handleSliderDrag(groupIndex, questionIndex, Number(e.target.value))}
                                    onMouseMove={(e) => handleSliderMouseMove(e, groupIndex, questionIndex, question)}
                                    onMouseLeave={handleSliderMouseLeave}
                                    onMouseUp={handleSliderRelease}
                                    onTouchEnd={handleSliderRelease}
                                    disabled={readOnly}
                                  />
                                  <div className="slider-markers">
                                    {renderSliderMarkers(question.min, question.max)}
                                  </div>
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
                        <button 
                          className="nav-button next-button"
                          onClick={goToNextGroup}
                          disabled={!areAllQuestionsAnsweredInGroup(currentGroupIndex)}
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
  render: createRender(WeightedAssessmentSurveyWidget)
} 