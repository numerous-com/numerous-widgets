import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.css';

function HTMLWidget() {
    // Model state for HTML content
    const [htmlContent] = useModelState<string>("html_content");

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="html-widget-container"
        />
    );
}

export default {
    render: createRender(HTMLWidget)
}
