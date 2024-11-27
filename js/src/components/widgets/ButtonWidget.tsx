import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Button } from "../ui/Button";
import '../../css/styles.css';

function ButtonWidget() {
    const [label] = useModelState<string>("label");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [clicked, setClicked] = useModelState<number>("clicked");

    const handleClick = () => {
        setClicked(clicked + 1);
    };

    return (
        <Button
            label={label}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onClick={handleClick}
        />
    );
}

export default {
    render: createRender(ButtonWidget)
} 