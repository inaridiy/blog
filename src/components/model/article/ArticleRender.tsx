import ReactMarkdown from 'react-markdown';
import { Box, BoxProps } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import dynamic from 'next/dynamic';

type Props = BoxProps & { markdown: string };

export const ArticleRender: React.FC<Props> = (props) => {
  const { markdown, ...rest } = props;
  const components = {
    code: dynamic(() => import('./ArticleCodeBlock')),
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
