import { Box } from '@chakra-ui/layout';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return (
      <code className={`${className} rounded-lg text-black bg-gray-200 p-1`}>
        {children}
      </code>
    );
  }
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  const code = String(children).replace(/\n$/, '');
  return (
    <SyntaxHighlighter
      style={style}
      language={lang}
      customStyle={{ background: 'none', margin: 0 }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
