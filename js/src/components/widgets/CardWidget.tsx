import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Card } from "../ui/Card";
import '../../css/styles.css';

function CardWidget() {
    const [title] = useModelState<string>("title");
    const [content] = useModelState<string>("content");
    const card = (
            <Card title={title} content={content} />
    );

    return card;
}

export default {
    render: createRender(CardWidget)
}
