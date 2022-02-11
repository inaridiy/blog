import { Col, Container, Row } from "@nextui-org/react";
import { ToggleLocale } from "../components/buttons/ToggleLocale";
import { Logo } from "../components/logo";
import { StyledNavContainer } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledNavContainer>
      <Container lg as="nav" display="flex" wrap="nowrap" alignItems="center">
        <Col>
          <Logo subtitle />
        </Col>
        <Col>
          <Row justify="flex-end">
            <ToggleLocale />
          </Row>
        </Col>
      </Container>
    </StyledNavContainer>
  );
};

export default Header;
