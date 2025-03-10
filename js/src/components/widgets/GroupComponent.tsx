import * as React from "react";
import { SimpleMarkdownRender } from "./MarkdownRender";
import { QuestionComponent } from "./QuestionComponent";
import { Group, ScoringRange, Question, SurveyData } from "./types";

interface GroupProps {
  group: Group;
  groupIndex: number;
  editMode: boolean;
  readOnly: boolean;
  surveyData: SurveyData;
  currentGroupIndex: number;
  visibleComments: Record<string, boolean>;
  showCategoryWeights: Record<string, boolean>;
  pendingChanges?: {
    questionValues: Record<string, number | null>;
    questionComments: Record<string, string>;
  };
  goToPreviousGroup: () => void;
  goToNextGroup: () => void;
  updateGroupTitle: (groupIndex: number, title: string) => void;
  updateGroupDescription: (groupIndex: number, description: string) => void;
  deleteGroup: (groupIndex: number) => void;
  addQuestion: (groupIndex: number) => void;
  toggleComment: (questionId: string) => void;
  toggleCategoryWeights: (questionId: string) => void;
  updateQuestionText: (groupIndex: number, questionIndex: number, text: string) => void;
  updateQuestionId: (groupIndex: number, questionIndex: number, id: string) => void;
  updateQuestionValue: (groupIndex: number, questionIndex: number, value: number) => void;
  updateQuestionComment: (groupIndex: number, questionIndex: number, comment: string) => void;
  updateQuestionRange: (groupIndex: number, questionIndex: number, min: number, max: number) => void;
  updateCategoryWeight: (groupIndex: number, questionIndex: number, categoryId: string, weight: number) => void;
  clearQuestionAnswer: (groupIndex: number, questionIndex: number) => void;
  deleteQuestion: (groupIndex: number, questionIndex: number) => void;
  renderSliderMarkers: (min: number, max: number) => JSX.Element;
  renderScoringRanges: (group: Group, groupIndex: number) => JSX.Element;
}

export const GroupComponent: React.FC<GroupProps> = ({
  group,
  groupIndex,
  editMode,
  readOnly,
  surveyData,
  currentGroupIndex,
  visibleComments,
  showCategoryWeights,
  pendingChanges,
  goToPreviousGroup,
  goToNextGroup,
  updateGroupTitle,
  updateGroupDescription,
  deleteGroup,
  addQuestion,
  toggleComment,
  toggleCategoryWeights,
  updateQuestionText,
  updateQuestionId,
  updateQuestionValue,
  updateQuestionComment,
  updateQuestionRange,
  updateCategoryWeight,
  clearQuestionAnswer,
  deleteQuestion,
  renderSliderMarkers,
  renderScoringRanges
}) => {
  return (
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
          <QuestionComponent
            key={question.id}
            question={question}
            groupIndex={groupIndex}
            questionIndex={questionIndex}
            editMode={editMode}
            readOnly={readOnly}
            surveyData={surveyData}
            visibleComments={visibleComments}
            showCategoryWeights={showCategoryWeights}
            pendingChanges={pendingChanges}
            toggleComment={toggleComment}
            toggleCategoryWeights={toggleCategoryWeights}
            updateQuestionText={updateQuestionText}
            updateQuestionId={updateQuestionId}
            updateQuestionValue={updateQuestionValue}
            updateQuestionComment={updateQuestionComment}
            updateQuestionRange={updateQuestionRange}
            updateCategoryWeight={updateCategoryWeight}
            clearQuestionAnswer={clearQuestionAnswer}
            deleteQuestion={deleteQuestion}
            renderSliderMarkers={renderSliderMarkers}
          />
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
  );
}; 