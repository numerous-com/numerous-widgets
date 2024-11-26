import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { DropDown } from "../ui/DropDown";
import { createPortal } from 'react-dom';
import { usePortalContainer } from "../../hooks/usePortalContainer";
import '../../css/styles.css';

function DropDownWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [options] = useModelState<string[]>("options");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [elementId] = useModelState<string>("element_id");
    const portalContainer = usePortalContainer(elementId);

    const dropdown = (
        <DropDown
            value={value}
            options={options}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={setValue}
        />
    );

    return elementId && portalContainer ? createPortal(dropdown, portalContainer) : dropdown;
}

export default {
    render: createRender(DropDownWidget)
}
