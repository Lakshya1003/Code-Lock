import React from 'react';

interface AnimateTextProps {
  text: string;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' | 'p';
  preserveSpans?: boolean;
}

/**
 * Splits text into individual letters and applies animation
 * @param text - The text to animate
 * @param className - Additional class names to apply
 * @param tagName - HTML tag to use (default: div)
 * @param preserveSpans - Whether to preserve existing span elements (for colored text)
 */
export const AnimateText: React.FC<AnimateTextProps> = ({
  text,
  className = '',
  tagName = 'div',
  preserveSpans = true
}) => {
  const Tag = tagName as keyof JSX.IntrinsicElements;
  
  // Function to split text into letters with animation
  const processText = (inputText: string) => {
    return inputText.split('').map((letter, index) => (
      <span key={index} className="letter">
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };
  
  // If we need to preserve spans (like for colored text parts)
  if (preserveSpans && text.includes('<span')) {
    // Find all spans with their content
    const parts = [];
    let currentText = text;
    let spanRegex = /<span[^>]*>(.*?)<\/span>/g;
    let lastIndex = 0;
    let match;
    
    while ((match = spanRegex.exec(text)) !== null) {
      // Add text before the span
      if (match.index > lastIndex) {
        const textBefore = text.substring(lastIndex, match.index);
        parts.push(processText(textBefore));
      }
      
      // Get span content and attributes
      const fullSpan = match[0];
      const spanContent = match[1];
      const classMatch = fullSpan.match(/class="([^"]*)"/);
      const spanClass = classMatch ? classMatch[1] : '';
      
      // Add the span with animated letters
      parts.push(
        <span key={`span-${match.index}`} className={spanClass}>
          {processText(spanContent)}
        </span>
      );
      
      lastIndex = match.index + fullSpan.length;
    }
    
    // Add any remaining text after the last span
    if (lastIndex < text.length) {
      parts.push(processText(text.substring(lastIndex)));
    }
    
    return <Tag className={`heading-animate ${className}`}>{parts}</Tag>;
  }
  
  // Simple case: just animate all letters
  return (
    <Tag className={`heading-animate ${className}`}>
      {processText(text)}
    </Tag>
  );
};

/**
 * Function to manually animate text
 * This can be used when you can't use the React component directly
 * It returns the HTML string to be inserted
 */
export const animateTextString = (text: string, preserveHtml = true): string => {
  if (!preserveHtml) {
    // Simple case: just wrap each letter
    return text
      .split('')
      .map(letter => letter === ' ' 
        ? '<span class="letter">&nbsp;</span>' 
        : `<span class="letter">${letter}</span>`)
      .join('');
  }
  
  // Handle case with HTML (like spans) - more complex
  let result = '';
  let inTag = false;
  let currentTag = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '<') {
      inTag = true;
      currentTag += char;
    } else if (char === '>') {
      inTag = false;
      currentTag += char;
      result += currentTag;
      currentTag = '';
    } else if (inTag) {
      currentTag += char;
    } else if (char === ' ') {
      result += '<span class="letter">&nbsp;</span>';
    } else {
      result += `<span class="letter">${char}</span>`;
    }
  }
  
  return result;
};

export default AnimateText; 