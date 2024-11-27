import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Card } from "../ui/Card";
import { createPortal } from 'react-dom';
import { usePortalContainer } from "../../hooks/usePortalContainer";

// Add error boundary component
class PortalErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div className="portal-error">Failed to render card</div>;
        }
        return this.props.children;
    }
}

function CardWidget() {
    const [title] = useModelState<string>("title");
    const [elementId] = useModelState<string>("element_id");
    const [parentId] = useModelState<string>("parent_id");
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

    const card = (
        <PortalErrorBoundary>
            <Card title={title} parentId={parentId}>
                <div data-marimo-content="true"></div>
            </Card>
        </PortalErrorBoundary>
    );

    if (!elementId) {
        return card;
    }

    if (!portalContainer) {
        // Return null during initial setup, but fall back to regular render if it takes too long
        return shouldFallback ? card : null;
    }
    
    try {
        return createPortal(card, portalContainer);
    } catch (error) {
        console.error('Portal creation failed:', error);
        return card;
    }
}

export default {
    render: createRender(CardWidget)
}
