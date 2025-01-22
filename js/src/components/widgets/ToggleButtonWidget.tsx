import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Button } from "../ui/Button";
import '../../css/styles.scss';

function ToggleButtonWidget() {
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [value, setValue] = useModelState<boolean>("value");
    const [disabled] = useModelState<boolean>("disabled");

    const handleClick = React.useCallback(() => {
        setValue(!value);
    }, [value, setValue]);

    const labelWithIcon = React.useMemo(() => {
        return (
            <span className="toggle-button-content">
                {uiLabel}
                {value ? (
                    <svg 
                        className="toggle-check-icon" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M13.3334 4L6.00008 11.3333L2.66675 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg 
                        className="toggle-x-icon" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M12 4L4 12M4 4L12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
        );
    }, [uiLabel, value]);

    return (
        <Button
            label={labelWithIcon}
            tooltip={uiTooltip}
            onClick={handleClick}
            disabled={disabled}
            value={value}
        />
    );
}

export default {
    render: createRender(ToggleButtonWidget)
} 