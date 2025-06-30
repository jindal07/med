import React from 'react';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const KeywordHighlighter = ({ text, keywords = [], onClickKeyword }) => {
  if (!keywords.length) return <span>{text}</span>;

  // Build regex for all keywords (case-insensitive)
  const pattern = `(${keywords.map(escapeRegExp).join('|')})`;
  const regex = new RegExp(pattern, 'gi');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const matched = match[0];
    parts.push(
      <span
        key={match.index}
        className="bg-yellow-200 cursor-pointer px-1 rounded hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        onClick={() => onClickKeyword && onClickKeyword(matched)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClickKeyword && onClickKeyword(matched);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Click to explain medical term: ${matched}`}
      >
        {matched}
      </span>
    );
    lastIndex = match.index + matched.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <span>{parts}</span>;
};

export default KeywordHighlighter; 