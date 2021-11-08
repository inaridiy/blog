import { Box } from '@chakra-ui/react';
import toMaterialStyle from 'material-color-hash';

type Props = { children?: React.ReactNode };

export const ArticleTag: React.FC<Props> = ({ children }) => {
  const color = toMaterialStyle(String(children), 900);

  return (
    <Box
      color="white"
      px="4"
      py="0.5"
      rounded="full"
      bg={color.backgroundColor}
    >
      {children}
    </Box>
  );
};
