import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Card } from "../ui/Card";
import { createPortal } from 'react-dom';

function CardWidget() {
    const [title] = useModelState<string>("title");
    const [content] = useModelState<string>("content");
    const [elementId] = useModelState<string>("element_id");
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

    const card = (
        <Card title={title}>
            {content}
        </Card>
    );

    React.useEffect(() => {
        if (elementId) {
            console.log('Setting up portal for ID:', elementId);
            
            // Function to setup portal with a target element
            const setupPortal = (targetElement: HTMLElement) => {
                console.log('Setting up portal with element:', {
                    id: targetElement.id,
                    className: targetElement.className
                });
                
                let container = targetElement.querySelector('[data-widget="card-container"]');
                if (!container) {
                    container = document.createElement('div');
                    container.setAttribute('data-widget', 'card-container');
                    targetElement.appendChild(container);
                    console.log('Created and appended portal container');
                }
                
                setPortalContainer(container as HTMLElement);
            };

            // Listen for the tabs mounted event
            const handleTabsMounted = (event: CustomEvent<{
                tabIds: { [key: string]: string },
                elements: { [key: string]: HTMLElement }
            }>) => {
                console.log('Tabs mounted event received:', event.detail);
                const targetElement = event.detail.elements[elementId];
                
                if (targetElement) {
                    setupPortal(targetElement);
                } else {
                    console.log('Target element not found in mounted tabs:', {
                        lookingFor: elementId,
                        availableIds: Object.keys(event.detail.elements)
                    });
                }
            };

            document.addEventListener('marimo:tabs-mounted', handleTabsMounted as EventListener);
            
            return () => {
                document.removeEventListener('marimo:tabs-mounted', handleTabsMounted as EventListener);
                if (portalContainer) {
                    console.log('Cleaning up portal container');
                    portalContainer.remove();
                    setPortalContainer(null);
                }
            };
        }
    }, [elementId]);

    if (elementId && portalContainer) {
        console.log('Rendering through portal');
        return createPortal(card, portalContainer);
    }

    console.log('Rendering normally (no elementId or container)');
    return card;
}

export default {
    render: createRender(CardWidget)
}
