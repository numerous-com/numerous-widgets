import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { MarkdownDisplay } from "../ui/MarkdownDisplay";
import '../../css/styles.css';

function MarkdownDisplayWidget() {
    const [content] = useModelState<string>("content");
    const [className] = useModelState<string>("class_name");

    return (
        <MarkdownDisplay
            content={content}
            className={className}
        />
    );
}

export default {
    render: createRender(MarkdownDisplayWidget)
} 