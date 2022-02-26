import {
  Button,
  Card,
  Col,
  Container,
  Link,
  Loading,
  Switch,
  Text,
} from "@nextui-org/react";
import NextLink from "next/link";
import { BsPlay } from "react-icons/bs";
import { MdArrowBackIos, MdEdit } from "react-icons/md";
import { StyledIconContainer, StyledNavContainer } from "./styles";

type Props = { onSubmit?: () => void; loading: boolean; hash?: string };
const EditorLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  onSubmit,
  loading,
  hash,
}) => {
  const copyHash = () => {
    navigator.clipboard.writeText(hash || "").then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
  const abbreviatedHash = `${hash?.slice(0, 4) || ""}.....${
    hash?.slice(-4) || ""
  }`;

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
              <Card bordered shadow={false} clickable onClick={copyHash}>
                <Text>{abbreviatedHash}</Text>
              </Card>
              <Switch
                size="lg"
                iconOn={<BsPlay size="1em" />}
                iconOff={<MdEdit />}
                shadow
              ></Switch>
              <Button
                color="gradient"
                auto
                shadow
                clickable={!loading}
                onClick={onSubmit}
              >
                {loading ? (
                  <Loading color="white" />
                ) : (
                  <Text size={16} color="white" b>
                    Submit
                  </Text>
                )}
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
