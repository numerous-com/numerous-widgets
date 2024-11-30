import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { MarkdownDrawer } from "../ui/MarkdownDrawer";
import '../../css/styles.css';

function MarkdownDrawerWidget() {
    const [title] = useModelState<string>("title");
    const [content] = useModelState<string>("content");
    const [isOpen, setIsOpen] = useModelState<boolean>("is_open");

    return (
        <MarkdownDrawer
            title={title}
            content={content}
            isOpen={isOpen}
            onToggle={setIsOpen}
        />
    );
}

export default {
    render: createRender(MarkdownDrawerWidget)
}
