import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

interface MarkdownDrawerProps {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: (isOpen: boolean) => void;
}

export function MarkdownDrawer({ 
    title, 
    content, 
    isOpen, 
    onToggle 
}: MarkdownDrawerProps) {
    return (
        <div className={`markdown-drawer ${isOpen ? 'open' : ''}`}>
            <button 
                className="drawer-toggle" 
                onClick={() => onToggle(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={isOpen ? 'open' : ''}>
                    ▶
                </span>
                {title}
            </button>
            <div className="drawer-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex, rehypeHighlight]}
                    components={{
                        // Custom component rendering
                        a: ({node, ...props}) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                        img: ({node, ...props}) => (
                            <img {...props} loading="lazy" />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
