import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', block = false }) => {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    if (block) {
      try {
        return katex.renderToString(content, {
          displayMode: true,
          throwOnError: false,
        });
      } catch (e) {
        return `<code class="text-sm">${content}</code>`;
      }
    }

    // Auto-wrap if string is a raw LaTeX expression with backslashes but without $
    let processedContent = content;
    if (
      !processedContent.includes('$') &&
      /\\(frac|angle|circ|sqrt|times|sum|pm|le|ge|alpha|beta|theta|pi|Delta|text|cdot)/.test(processedContent)
    ) {
      processedContent = `$${processedContent}$`;
    }

    // Split text by $$...$$ and $...$
    // Replace $$formula$$ with display math and $formula$ with inline math
    const parts = processedContent.split(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g);

    return parts
      .map((part) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          try {
            return katex.renderToString(math, { displayMode: true, throwOnError: false });
          } catch {
            return part;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          try {
            return katex.renderToString(math, { displayMode: false, throwOnError: false });
          } catch {
            return part;
          }
        }
        // Normal text - escape HTML and format line breaks
        return part
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br/>');
      })
      .join('');
  }, [content, block]);

  return (
    <span
      className={`math-content inline-block max-w-full overflow-x-auto align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};
