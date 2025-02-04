import * as React from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface WorkflowProps {
    steps: string[];
    activeStep: number;
    completedSteps: number[];
    onStepChange: (step: number) => void;
}

export function Workflow({ steps, activeStep, completedSteps, onStepChange }: WorkflowProps) {
    const canGoToStep = (stepIndex: number) => {
        // Can go to completed steps or the first uncompleted step
        return completedSteps.includes(stepIndex) || 
               (stepIndex === 0 || completedSteps.length >= stepIndex);
    };

    return (
        <div className="workflow-container">
            <button
                className="workflow-nav-button"
                onClick={() => onStepChange(activeStep - 1)}
                disabled={activeStep === 0}
            >
                <ChevronLeft size={20} />
            </button>
            
            <div className="workflow-steps">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`workflow-step ${index === activeStep ? 'active' : ''} ${
                            completedSteps.includes(index) ? 'completed' : ''
                        } ${canGoToStep(index) ? 'clickable' : ''}`}
                        onClick={() => canGoToStep(index) && onStepChange(index)}
                    >
                        <div className="step-number">
                            {completedSteps.includes(index) ? (
                                <Check size={14} />
                            ) : (
                                index + 1
                            )}
                        </div>
                        <div className="step-label">{step}</div>
                    </div>
                ))}
            </div>

            <button
                className="workflow-nav-button"
                onClick={() => onStepChange(activeStep + 1)}
                disabled={activeStep === steps.length - 1 || !canGoToStep(activeStep + 1)}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
} 