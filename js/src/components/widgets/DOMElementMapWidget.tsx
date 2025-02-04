import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

function DOMElementMapWidget() {
    const [elementIds] = useModelState<string[]>("element_ids");
    const [values, setValues] = useModelState<{ [key: string]: string }>("values");
    const previousValuesRef = React.useRef<{ [key: string]: string }>({});
    const updateTimeoutRef = React.useRef<number | null>(null);

    // Function to get value from DOM element
    const getElementValue = React.useCallback((element: Element | null): string | null => {
        if (!element) return null;
        
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            return element.value || null;
        }
        return null;
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

    return null;
}

export default {
    render: createRender(DOMElementMapWidget)
} 