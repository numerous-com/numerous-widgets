import * as React from "react";

export function usePortalContainer(elementId: string | null) {
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);
    const retryTimeoutRef = React.useRef<NodeJS.Timeout>();
    const mountedRef = React.useRef(false);

    React.useEffect(() => {
        if (!elementId) return;
        mountedRef.current = true;

        const setupPortal = (targetElement: HTMLElement) => {
            if (!mountedRef.current) return;
            
            let container = targetElement.querySelector('[data-widget="card-container"][data-card-id="' + elementId + '"]');
            if (!container) {
                container = document.createElement('div');
                container.setAttribute('data-widget', 'card-container');
                container.setAttribute('data-card-id', elementId);
                const wrapper = targetElement.querySelector('[data-widget="tab-content-wrapper"]');
                if (wrapper) {
                    wrapper.appendChild(container);
                } else {
                    targetElement.appendChild(container);
                }
            }
            setPortalContainer(container as HTMLElement);
        };

        const findAndSetupPortal = () => {
            const existingElement = document.querySelector(`[data-marimo-tab-id="${elementId}"]`);
            if (existingElement instanceof HTMLElement) {
                setupPortal(existingElement);
                return true;
            }
            return false;
        };

        // Initial attempt
        findAndSetupPortal();

        // Listen for the event
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
            mountedRef.current = false;
            document.removeEventListener('marimo:tabs-mounted', handleTabsMounted as EventListener);
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
            }
            if (portalContainer) {
                portalContainer.remove();
                setPortalContainer(null);
            }
        };
    }, [elementId]);

    return portalContainer;
} 