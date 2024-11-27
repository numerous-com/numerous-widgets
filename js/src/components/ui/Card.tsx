import * as React from "react";

interface CardProps {
    title?: string;
    children?: React.ReactNode;
    content?: string;
    parentId?: string;
    model?: any;
}

export function Card({ 
    title, 
    children,
    content,
    model,
}: CardProps) {
    const widgetId = model?.model_id || 'default';
    
    // Memoize the content check to prevent unnecessary re-renders
    const shouldRenderContent = React.useMemo(() => 
        content && typeof content === 'string' && content.trim().length > 0,
        [content]
    );

    // Memoize the content element
    const contentElement = React.useMemo(() => 
        shouldRenderContent ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
            children
        ),
        [shouldRenderContent, content, children]
    );

    return (
        <div className="card-container">
            {title && <div className="card-title">{title}</div>}
            <div className="card-content" data-widget="card-content-wrapper">
                {contentElement}
            </div>
        </div>
    );
}
