import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Info } from 'lucide-react';
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
    const drawerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                onToggle(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);

    return (
        <>
            {isOpen && (
                <div className="markdown-drawer open" ref={drawerRef}>
                    <button 
                        className="drawer-toggle" 
                        onClick={() => onToggle(!isOpen)}
                        aria-expanded={isOpen}
                        title={title}
                    >
                        <span className="arrow open">
                            <Info size={20} />
                        </span>
                    </button>
                    <div className="drawer-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex, rehypeHighlight]}
                            components={{
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
            )}
            {!isOpen && (
                <button 
                    className="drawer-toggle closed" 
                    onClick={() => onToggle(!isOpen)}
                    aria-expanded={isOpen}
                    title={title}
                >
                    <span className="arrow closed">
                        <Info size={20} />
                    </span>
                </button>
            )}
        </>
    );
}
