import { Button, Col, Container, Link, Switch, Text } from "@nextui-org/react";
import NextLink from "next/link";
import { BsPlay } from "react-icons/bs";
import { MdArrowBackIos, MdEdit } from "react-icons/md";
import { StyledIconContainer, StyledNavContainer } from "./styles";

type Props = {};
const EditorLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <>
      <StyledNavContainer>
        <Container lg as="nav" display="flex" wrap="nowrap" alignItems="center">
          <Col>
            <NextLink href="/admin">
              <Link>
                <MdArrowBackIos color="black" size="2em" />
              </Link>
            </NextLink>
          </Col>
          <Col>
            <StyledIconContainer>
              <Switch
                size="lg"
                iconOn={<BsPlay size="1em" />}
                iconOff={<MdEdit />}
                shadow
              ></Switch>
              <Button auto color="gradient" shadow>
                <Text size={16} color="white" b>
                  Submit
                </Text>
              </Button>
            </StyledIconContainer>
          </Col>
        </Container>
      </StyledNavContainer>
      <Container
        lg={true}
        display="flex"
        as="main"
        alignContent="space-between"
        className="main-container"
        css={{
          position: "relative",
          minHeight: "80vh",
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

export default EditorLayout;
