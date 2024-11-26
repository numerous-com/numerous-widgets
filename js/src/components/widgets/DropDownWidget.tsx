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
    const [shouldFallback, setShouldFallback] = React.useState(false);
    const portalContainer = usePortalContainer(elementId);

    // Add fallback timer
    React.useEffect(() => {
        if (elementId && !portalContainer) {
            const fallbackTimer = setTimeout(() => {
                setShouldFallback(true);
            }, 2000); // 2 second timeout

            return () => clearTimeout(fallbackTimer);
        }
    }, [elementId, portalContainer]);

    const dropdown = (
        <DropDown
            value={value}
            options={options}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={setValue}
        />
    );

    if (!elementId) {
        return dropdown;
    }

    if (!portalContainer) {
        // Return null during initial setup, but fall back to regular render if it takes too long
        return shouldFallback ? dropdown : null;
    }

    try {
        return createPortal(dropdown, portalContainer);
    } catch (error) {
        console.error('Portal creation failed:', error);
        return dropdown;
    }
}

export default {
    render: createRender(DropDownWidget)
}
