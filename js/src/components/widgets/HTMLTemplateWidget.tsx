import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.css';

function HTMLTemplateWidget() {
    const [template] = useModelState<string>("template");
    const [variables] = useModelState<Record<string, any>>("variables");
    const [renderedHtml] = useModelState<string>("rendered_html");
    const [className] = useModelState<string>("class_name");

    // Add effect to log when values change
    React.useEffect(() => {
        console.log("JS state update:", {
            template,
            variables,
            renderedHtml,
            className
        });
    }, [template, variables, renderedHtml, className]);

    return (
        <div 
            className={`html-template ${className}`}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
    );
}

export default {
    render: createRender(HTMLTemplateWidget)
} 