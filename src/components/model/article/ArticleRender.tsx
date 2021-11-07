import ReactMarkdown from 'react-markdown';
import { Box, BoxProps } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import CodeBlock from './ArticleCodeBlock';

type Props = BoxProps & { markdown: string };

export const ArticleRender: React.FC<Props> = (props) => {
  const { markdown, ...rest } = props;
  const components = {
    code: CodeBlock,
  };

  return (
    <Box as="article" {...rest}>
      <ReactMarkdown
        className={`prose prose-red lg:prose-lg ${useColorModeValue(
          '',
          'prose-dark'
        )}`}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};
