import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.scss';
import { noop } from "chart.js/helpers";

function HTMLTemplateWidget() {
    const [template] = useModelState<string>("template");
    const [variables] = useModelState<Record<string, any>>("variables");
    const [renderedHtml] = useModelState<string>("rendered_html");
    const [className] = useModelState<string>("class_name");
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Add effect to execute scripts when HTML content changes
    React.useEffect(() => {
        if (!containerRef.current) return;
        
        // Find all script tags in the rendered content
        const scripts = containerRef.current.getElementsByTagName('script');
        Array.from(scripts).forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Copy all attributes
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Copy the content
            newScript.textContent = oldScript.textContent;
            
            // Replace the old script with the new one
            oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
    }, [renderedHtml]);

    return (
        <div 
            ref={containerRef}
            className={`html-template ${className}`}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
    );
}

export default {
    render: createRender(HTMLTemplateWidget)
} 