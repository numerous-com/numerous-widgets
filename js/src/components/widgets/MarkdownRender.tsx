import * as React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

// Define the props interface
export interface MarkdownRenderProps {
  content: string;
  className?: string;
}

// Create a lightweight version without all plugins for simple text
export const SimpleMarkdownRender: React.FC<MarkdownRenderProps> = React.memo(
  ({ content, className = "" }) => {
    if (!content) {
      return <div className={`simple-markdown-content ${className}`}></div>;
    }
    
    return (
      <div className={`simple-markdown-content ${className}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => 
    prevProps.content === nextProps.content && 
    prevProps.className === nextProps.className
);

// Full version with all plugins for rich content
export const MarkdownRender: React.FC<MarkdownRenderProps> = React.memo(
  ({ content, className = "" }) => {
    // Don't render anything for empty content
    if (!content) {
      return <div className={`markdown-content ${className}`}></div>;
    }
    
    // Lazy load the plugins only when needed
    const plugins = React.useMemo(() => ({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeHighlight]
    }), []);
    
    return (
      <div className={`markdown-content ${className}`}>
        <ReactMarkdown
          {...plugins}
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
    );
  },
  (prevProps, nextProps) => 
    prevProps.content === nextProps.content && 
    prevProps.className === nextProps.className
); 