import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.css';
import { noop } from "chart.js/helpers";

function HTMLTemplateWidget() {
    const [template] = useModelState<string>("template");
    const [variables] = useModelState<Record<string, any>>("variables");
    const [renderedHtml] = useModelState<string>("rendered_html");
    const [className] = useModelState<string>("class_name");

    // Add effect to log when values change
    React.useEffect(() => {
        noop
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