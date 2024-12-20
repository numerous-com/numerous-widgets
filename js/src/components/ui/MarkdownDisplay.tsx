import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

interface MarkdownDisplayProps {
    content: string;
    className?: string;
}

export function MarkdownDisplay({ 
    content,
    className = ""
}: MarkdownDisplayProps) {
    return (
        <div className={`markdown-display ${className}`}>
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
    );
} 