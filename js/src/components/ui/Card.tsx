import * as React from "react";

interface CardProps {
    title?: string;
    children: React.ReactNode;
}

export function Card({ 
    title, 
    children
}: CardProps) {
    return (
        <div className="card-container">
            {title && <div className="card-title">{title}</div>}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
}
