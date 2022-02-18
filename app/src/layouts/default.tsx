import { Container } from "@nextui-org/react";
import Header from "./header";

type Props = {};

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <Container
        lg={true}
        display="flex"
        as="main"
        alignContent="space-between"
        className="main-container"
        css={{
          position: "relative",
          minHeight: "90vh",
          flexDirection: "column",
          "@mdMax": {
            overflowX: "hidden",
          },
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default DefaultLayout;
