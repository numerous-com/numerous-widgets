import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Text } from "../ui/Text";
import '../../css/styles.scss';

function TextWidget() {
    // Model states
    const [value] = useModelState<string>("value");
    const [disabled] = useModelState<boolean>("disabled");
    const [multiline] = useModelState<boolean>("multiline");
    const [height] = useModelState<number | null>("height");
    const [className] = useModelState<string>("class_name");

    return (
        <Text
            value={value}
            disabled={disabled}
            multiline={multiline}
            height={height || undefined}
            className={className}
        />
    );
}

export default {
    render: createRender(TextWidget)
} 