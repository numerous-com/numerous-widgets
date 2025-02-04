import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Button } from "../ui/Button";
import '../../css/styles.scss';

function ButtonWidget() {
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [clicked, setClicked] = useModelState<number>("clicked");
    const [disabled] = useModelState<boolean>("disabled");
    const [value, setValue] = useModelState<boolean>("value");
    const [className] = useModelState<string>("className");
    const [variant] = useModelState<'default' | 'process-step'>("variant");
    const [iconSvg] = useModelState<string>("icon_svg");
    const [fitToContent] = useModelState<boolean>("fit_to_content");

    const icon = iconSvg ? (
        <span dangerouslySetInnerHTML={{ __html: iconSvg }} />
    ) : null;

    const handleClick = React.useCallback(() => {
        const newClicked = clicked + 1;
        setClicked(newClicked);
        setValue(newClicked > 0);
    }, [clicked, setClicked, setValue]);

    return (
        <Button
            label={uiLabel}
            tooltip={uiTooltip}
            onClick={handleClick}
            disabled={disabled}
            value={value}
            className={className}
            variant={variant}
            icon={icon}
            fitToContent={fitToContent}
        />
    );
}

export default {
    render: createRender(ButtonWidget)
}