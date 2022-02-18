import { Col, Container, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { ToggleLocale } from "../components/buttons/ToggleLocale";
import { ToggleTheme } from "../components/buttons/ToggleTheme";
import { Logo } from "../components/logo";
import { StyledIconContainer, StyledNavContainer } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledNavContainer>
      <Container lg as="nav" display="flex" wrap="nowrap" alignItems="center">
        <Col>
          <NextLink href="/">
            <Link>
              <Logo subtitle />
            </Link>
          </NextLink>
        </Col>
        <Col css={{ flexShrink: 2 }}>
          <StyledIconContainer>
            <ToggleTheme />
            <ToggleLocale />
          </StyledIconContainer>
        </Col>
      </Container>
    </StyledNavContainer>
  );
};

export default Header;