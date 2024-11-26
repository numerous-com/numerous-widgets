import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.css';
interface NumberWidgetProps {
   value: number;
   start: number;
   stop: number;
   step: number;
   ui_label: string;
   ui_tooltip: string;
}

function NumberWidget() {
   // Model states
   const [value, setValue] = useModelState<number>("value");
   const [start] = useModelState<number>("start");
   const [stop] = useModelState<number>("stop");
   const [step] = useModelState<number>("step");
   const [uiLabel] = useModelState<string>("ui_label");
   const [uiTooltip] = useModelState<string>("ui_tooltip");
    // Local state for button acceleration
   const [stepMultiplier, setStepMultiplier] = React.useState(1);
   const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
   const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const getStepDecimals = (stepValue: number): number => {
       const str = stepValue.toString();
       return str.includes('.') ? str.split('.')[1].length : 0;
   };
    const formatToStepPrecision = (num: number, decimals: number): number => {
       return Number(num.toFixed(decimals));
   };
    const validateAndAdjustValue = (inputValue: number): number => {
       if (!start || !stop || !step) return inputValue;
       
       const stepDecimals = getStepDecimals(step);
       let newValue = formatToStepPrecision(inputValue, stepDecimals);
       
       // Clamp value between start and stop
       newValue = Math.max(start, Math.min(stop, newValue));
       
       // Adjust to nearest step multiple
       const stepsFromStart = Math.round((newValue - start) / step);
       newValue = formatToStepPrecision(start + (stepsFromStart * step), stepDecimals);
       
       // Final clamp
       return Math.max(start, Math.min(stop, newValue));
   };
    const updateValue = (newValue: string | number) => {
       if (!step) return;
       
       const stepDecimals = getStepDecimals(step);
       
       if (newValue === '' || isNaN(Number(newValue))) {
           setValue(value || 0);
           return;
       }
        const validValue = validateAndAdjustValue(Number(newValue));
       setValue(validValue);
   };
    const handleButtonPress = (direction: 1 | -1) => {
       if (!step || !value) return;
       
       const updateWithAcceleration = () => {
           const newValue = value + (direction * step * stepMultiplier);
           updateValue(newValue);
           setStepMultiplier(prev => Math.min(prev + 0.5, 10));
       };
        updateWithAcceleration();
        timeoutRef.current = setTimeout(() => {
           intervalRef.current = setInterval(updateWithAcceleration, 50);
       }, 500);
   };
    const handleButtonRelease = () => {
       if (intervalRef.current) {
           clearInterval(intervalRef.current);
           intervalRef.current = null;
       }
       if (timeoutRef.current) {
           clearTimeout(timeoutRef.current);
           timeoutRef.current = null;
       }
       setStepMultiplier(1);
   };
    // Cleanup on unmount
   React.useEffect(() => {
       return () => {
           if (intervalRef.current) clearInterval(intervalRef.current);
           if (timeoutRef.current) clearTimeout(timeoutRef.current);
       };
   }, []);
    return (
       <div className="number-input-container">
           <label className="number-label">
               <span>{uiLabel}</span>
               <span className="tooltip-icon" data-tooltip={uiTooltip}>ⓘ</span>
           </label>
           <div className="input-wrapper">
               <input 
                   type="number"
                   value={value}
                   min={start}
                   max={stop}
                   step={step}
                   onChange={(e) => updateValue(e.target.value)}
                   onBlur={(e) => updateValue(e.target.value)}
               />
               <div className="buttons">
                   <button
                       className="step-button down"
                       onMouseDown={() => handleButtonPress(-1)}
                       onMouseUp={handleButtonRelease}
                       onMouseLeave={handleButtonRelease}
                       onTouchStart={() => handleButtonPress(-1)}
                       onTouchEnd={handleButtonRelease}
                       onTouchCancel={handleButtonRelease}
                   >
                       −
                   </button>
                   <button
                       className="step-button up"
                       onMouseDown={() => handleButtonPress(1)}
                       onMouseUp={handleButtonRelease}
                       onMouseLeave={handleButtonRelease}
                       onTouchStart={() => handleButtonPress(1)}
                       onTouchEnd={handleButtonRelease}
                       onTouchCancel={handleButtonRelease}
                   >
                       +
                   </button>
               </div>
           </div>
       </div>
   );
}

export default {
   render: createRender(NumberWidget)
}