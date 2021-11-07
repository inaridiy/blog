import { Container, ContainerProps } from '@chakra-ui/layout';

export const TwContainer: React.FC<ContainerProps> = (props) => (
  <Container
    maxW={['container.sm', 'container.md', 'container.lg', 'container.xl']}
    {...props}
  ></Container>
);
