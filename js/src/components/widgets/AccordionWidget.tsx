import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Accordion } from "../ui/Accordion";
import '../../css/styles.scss';

function AccordionWidget({ model }: { model?: any }) {
    const [title] = useModelState<string>("title");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [isExpanded, setIsExpanded] = useModelState<boolean>("is_expanded");

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Accordion
            title={title}
            isExpanded={isExpanded}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={handleToggle}
        />
    );
}

export default {
    render: createRender(AccordionWidget)
} 