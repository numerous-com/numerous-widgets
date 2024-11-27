import * as React from "react";

interface CardProps {
    title?: string;
    children: React.ReactNode;
    parentId?: string;
}

export function Card({ 
    title, 
    children,
    parentId
}: CardProps) {
    return (
        <div className="card-container">
            {title && <div className="card-title">{title}</div>}
            <div className="card-content" data-widget="card-content-wrapper" data-parent-id={parentId}>
                {children}
            </div>
        </div>
    );
}
