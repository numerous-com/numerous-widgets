import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

function DOMElementMapWidget() {
    const [elementIds] = useModelState<string[]>("element_ids");
    const [values, setValues] = useModelState<{ [key: string]: string }>("values");
    const [jsToEval, setJsToEval] = useModelState<string>("js_to_eval");
    const [jsEvalResult, setJsEvalResult] = useModelState<string>("js_eval_result");
    const [valuesToSet] = useModelState<{ [key: string]: string }>("values_to_set");
    const previousValuesRef = React.useRef<{ [key: string]: string }>({});
    const updateTimeoutRef = React.useRef<number | null>(null);
    const previousJsToEvalRef = React.useRef<string>("");
    const previousValuesToSetRef = React.useRef<{ [key: string]: string }>({});

    // Function to get value from DOM element
    const getElementValue = React.useCallback((element: Element | null): string | null => {
        if (!element) return null;
        
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            return element.value || null;
        }
        return null;
    }, []);

    // Function to set value on DOM element
    const setElementValue = React.useCallback((element: Element | null, value: string): void => {
        if (!element) return;
        
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            // Only update if value actually changed to avoid loops
            if (element.value !== value) {
                element.value = value;
                // Dispatch input event to trigger any listeners
                const event = new Event('input', { bubbles: true });
                element.dispatchEvent(event);
            }
        }
    }, []);

    // Debounced update function
    const debouncedUpdate = React.useCallback((newValues: { [key: string]: string }) => {
        if (updateTimeoutRef.current) {
            window.clearTimeout(updateTimeoutRef.current);
        }
        
        updateTimeoutRef.current = window.setTimeout(() => {
            const strNewValues = JSON.stringify(newValues);
            const strPrevValues = JSON.stringify(previousValuesRef.current);
            
            if (strNewValues !== strPrevValues) {
                console.log('[DOM] Updating values:', newValues);
                previousValuesRef.current = newValues;
                setValues(newValues);
            }
        }, 100); // 100ms debounce
    }, [setValues]);

    // Handle element change
    const handleElementChange = React.useCallback((element: Element) => {
        const value = getElementValue(element);
        const previousValue = previousValuesRef.current[element.id];
        
        if (value !== previousValue) {
            console.log(`[DOM] Element ${element.id} value changed from "${previousValue}" to "${value}"`);
            
            const newValues = { ...previousValuesRef.current };
            if (value === null) {
                delete newValues[element.id];
            } else {
                newValues[element.id] = value;
            }
            debouncedUpdate(newValues);
        }
    }, [getElementValue, debouncedUpdate]);

    // Setup listeners and initial values
    React.useEffect(() => {
        if (!elementIds?.length) return;

        const cleanups: (() => void)[] = [];
        
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (!element || !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return;

            // Set initial value
            handleElementChange(element);

            // Only listen for actual input events
            const listener = () => handleElementChange(element);
            element.addEventListener('input', listener);
            cleanups.push(() => element.removeEventListener('input', listener));
        });

        return () => {
            if (updateTimeoutRef.current) {
                window.clearTimeout(updateTimeoutRef.current);
            }
            cleanups.forEach(cleanup => cleanup());
        };
    }, [elementIds, handleElementChange]);

    // Handle setting values from Python
    React.useEffect(() => {
        if (!valuesToSet || Object.keys(valuesToSet).length === 0) return;
        
        const strNewValues = JSON.stringify(valuesToSet);
        if (strNewValues === JSON.stringify(previousValuesToSetRef.current)) return;
        
        console.log('[DOM] Setting values from Python:', valuesToSet);
        previousValuesToSetRef.current = valuesToSet;
        
        Object.entries(valuesToSet).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                setElementValue(element, value);
            }
        });
    }, [valuesToSet, setElementValue]);

    // Handle JavaScript evaluation
    React.useEffect(() => {
        if (!jsToEval || jsToEval === previousJsToEvalRef.current) return;
        
        console.log('[JS Eval] Evaluating JavaScript:', jsToEval);
        previousJsToEvalRef.current = jsToEval;
        
        try {
            // Using Function constructor is slightly safer than eval
            // as it runs in the global scope rather than the local scope
            const evalFunc = new Function(`return (${jsToEval})`);
            const result = evalFunc();
            const resultStr = result !== undefined ? String(result) : "";
            console.log('[JS Eval] Result:', resultStr);
            setJsEvalResult(resultStr);
        } catch (error: unknown) {
            console.error('[JS Eval] Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setJsEvalResult(`Error: ${errorMessage}`);
        }
    }, [jsToEval, setJsEvalResult]);

    return null;
}

export default {
    render: createRender(DOMElementMapWidget)
} 