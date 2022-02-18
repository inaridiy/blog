import { VerticalDivider } from "@/components/base";
import { Account } from "@/components/modules/account";
import { ToggleLocale, ToggleTheme } from "@/components/modules/buttons";
import { Logo } from "@/components/modules/logo";
import { Col, Container, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { ToggleChain } from "../modules/buttons/ToggleChain";
import { StyledIconContainer, StyledNavContainer } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledNavContainer>
      <Container lg as="nav" display="flex" wrap="nowrap" alignItems="center">
        <Col>
          <NextLink href="/">
            <Link>
              <Logo />
            </Link>
          </NextLink>
        </Col>

        <Col>
          <StyledIconContainer>
            <Account />
            <VerticalDivider />
            <ToggleChain />
            <ToggleTheme />
            <ToggleLocale />
          </StyledIconContainer>
        </Col>
      </Container>
    </StyledNavContainer>
  );
};

export default Header;
