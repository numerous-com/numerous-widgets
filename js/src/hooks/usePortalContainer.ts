import * as React from "react";

export function usePortalContainer(elementId: string | null) {
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!elementId) return;

        const setupPortal = (targetElement: HTMLElement) => {
            let container = targetElement.querySelector('[data-widget="card-container"]');
            if (!container) {
                container = document.createElement('div');
                container.setAttribute('data-widget', 'card-container');
                targetElement.appendChild(container);
            }
            setPortalContainer(container as HTMLElement);
        };

        const handleTabsMounted = (event: CustomEvent<{
            tabIds: { [key: string]: string },
            elements: { [key: string]: HTMLElement }
        }>) => {
            const targetElement = event.detail.elements[elementId];
            if (targetElement) {
                setupPortal(targetElement);
            }
        };

        document.addEventListener('marimo:tabs-mounted', handleTabsMounted as EventListener);
        
        return () => {
            document.removeEventListener('marimo:tabs-mounted', handleTabsMounted as EventListener);
            if (portalContainer) {
                portalContainer.remove();
                setPortalContainer(null);
            }
        };
    }, [elementId]);

    return portalContainer;
} 