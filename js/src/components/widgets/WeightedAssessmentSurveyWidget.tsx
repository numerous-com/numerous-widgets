import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.scss';
import '../../css/components/WeightedAssessmentSurvey.scss';

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
}

interface Group {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface SurveyData {
  title: string;
  description: string;
  groups: Group[];
  categories: Category[];
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
  const [activeEditTab, setActiveEditTab] = React.useState<'content' | 'categories'>('content');
  
  // State for showing category weights
  const [showCategoryWeights, setShowCategoryWeights] = React.useState<Record<string, boolean>>({});
  
  // Add state to track survey start time
  const [startTime] = React.useState<number>(Date.now());
  
  // Add state for submission
  const [submitted, setSubmitted] = useModelState<boolean>("submitted");
  
  // Add state for saved status
  const [isSaved, setIsSaved] = React.useState<boolean>(props.saved);
  
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
  
  // Add missing addGroup function
  const addGroup = () => {
    const newData = { ...surveyData };
    const groupId = `group${newData.groups.length + 1}`;
    
    newData.groups.push({
      id: groupId,
      title: "New Group",
      description: "Group description",
      questions: []
    });
    
    setSurveyData(newData);
    // Navigate to the new group
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
  
  // Navigation functions
  const goToNextGroup = () => {
    if (currentGroupIndex < surveyData.groups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };
  
  const goToPreviousGroup = () => {
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
  
  // Update question value with timestamp and reset submitted state
  const updateQuestionValue = (groupIndex: number, questionIndex: number, value: number) => {
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
    question.timestamps[value] = elapsedSeconds;
    
    // Update the value
    question.value = value;
    
    // Reset submitted state
    setSubmitted(false);
    
    setSurveyData(newData);
  };
  
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
      description: ""
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
    const markers = [];
    for (let i = min; i <= max; i++) {
      markers.push(
        <span key={i} className="slider-marker">{i}</span>
      );
    }
    return markers;
  };
  
  // Generate progress dots
  const renderProgressDots = () => {
    return surveyData?.groups?.map((_, index) => {
      let dotClass = "progress-dot";
      if (index === currentGroupIndex) {
        dotClass += " active";
      } else if (index < currentGroupIndex) {
        dotClass += " completed";
      }
      return (
        <div 
          key={index} 
          className={dotClass}
          onClick={() => setCurrentGroupIndex(index)}
          style={{ cursor: 'pointer' }}
        />
      );
    }) || []; // Return empty array if groups is undefined
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
    setIsSubmitted(true);
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
    
    // Switch out of edit mode after saving
    setEditMode(false);
  };
  
  return (
    <div className={`weighted-assessment-survey ${props.class_name || ''} ${readOnly ? 'read-only' : ''}`}>
      <div className="survey-header">
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
          </>
        ) : (
          <>
            <div className="survey-title">{surveyData?.title || ''}</div>
            <div className="survey-description">{surveyData?.description || ''}</div>
          </>
        )}
      </div>
      
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
        </div>
      )}
      
      {editMode && activeEditTab === 'categories' ? (
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
            </div>
          ))}
          
          <button className="add-button" onClick={addCategory}>
            <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Add Category
          </button>
        </div>
      ) : (
        <div className="survey-content">
          {surveyData?.groups?.length > 0 ? (
            surveyData.groups.map((group, groupIndex) => (
              <div 
                key={group.id || groupIndex} 
                className={`survey-group ${groupIndex === currentGroupIndex ? 'active' : ''}`}
                style={{ display: groupIndex === currentGroupIndex ? 'block' : 'none' }}
              >
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
                    <textarea
                      className="textarea-input"
                      value={group.description}
                      onChange={(e) => updateGroupDescription(groupIndex, e.target.value)}
                      placeholder="Group Description"
                    />
                  ) : (
                    <div className="group-description">{group.description}</div>
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
                              <div className="question-text">{question.text}</div>
                            </div>
                            
                            <div className="slider-container">
                              <input
                                type="range"
                                className={`assessment-slider ${question.value === null ? 'unselected' : ''}`}
                                value={question.value !== null ? question.value : question.min}
                                min={question.min}
                                max={question.max}
                                step={1}
                                onChange={(e) => updateQuestionValue(groupIndex, questionIndex, Number(e.target.value))}
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
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="currentColor"/>
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {editMode && (
                          <div className="question-content">
                            <div className="slider-container">
                              <input
                                type="range"
                                className={`assessment-slider ${question.value === null ? 'unselected' : ''}`}
                                value={question.value !== null ? question.value : question.min}
                                min={question.min}
                                max={question.max}
                                step={1}
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
                                type="range"
                                className={`assessment-slider ${question.value === null ? 'unselected' : ''}`}
                                value={question.value !== null ? question.value : question.min}
                                min={question.min}
                                max={question.max}
                                step={1}
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
                                <span className="weight-percentage">%</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {visibleComments[question.id] && !readOnly && (
                          <div className="comment-container">
                            <textarea
                              className="comment-textarea"
                              placeholder="Add your comment here..."
                              value={question.comment}
                              onChange={(e) => updateQuestionComment(groupIndex, questionIndex, e.target.value)}
                              disabled={readOnly}
                            />
                          </div>
                        )}
                        
                        {readOnly && question.comment && (
                          <div className="comment-container read-only">
                            <div className="comment-text">{question.comment}</div>
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
              </div>
            ))
          ) : (
            <div className="no-groups-message">
              {editMode ? 
                "No groups added yet. Use the 'Add Group' button below to create a group." : 
                "No survey content available."}
            </div>
          )}
        </div>
      )}
      
      <div className="survey-navigation">
        <div className="nav-buttons">
          <button 
            className="nav-button"
            onClick={goToPreviousGroup}
            disabled={!surveyData?.groups?.length || currentGroupIndex === 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
            Previous
          </button>
          
          <button 
            className="nav-button"
            onClick={goToNextGroup}
            disabled={!surveyData?.groups?.length || currentGroupIndex === (surveyData?.groups?.length - 1)}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        
        {!editMode && !readOnly && allQuestionsAnswered && (
          <button 
            className={`submit-button ${submitted ? 'submitted' : ''}`}
            onClick={handleSubmit}
            disabled={submitted}
          >
            {submitted ? "Submitted" : (props.submit_text || "Submit")}
          </button>
        )}
        
        <div className="progress-indicator">
          <div className="progress-dots">
            {renderProgressDots()}
          </div>
          <span>{progress.answeredQuestions} of {progress.totalQuestions} questions answered ({progress.percentage}%)</span>
        </div>
      </div>
      
      <div className="survey-footer">
        {editMode ? (
          <button
            className="save-button"
            onClick={handleSave}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
            </svg>
            Save Changes
          </button>
        ) : (
          !disableEditing && (
            <button
              className="edit-button"
              onClick={() => setEditMode(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
              </svg>
              Edit Survey
            </button>
          )
        )}
        
        {editMode && !disableEditing && (
          <button 
            className="add-button" 
            onClick={addGroup}
          >
            <svg className="add-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Add Group
          </button>
        )}
      </div>
    </div>
  );
}

export default {
  render: createRender(WeightedAssessmentSurveyWidget)
} 