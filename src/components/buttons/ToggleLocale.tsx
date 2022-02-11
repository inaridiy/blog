import { Button, Text, Tooltip } from "@nextui-org/react";
import NextLink from "next/link";
import { IoLanguageSharp } from "react-icons/io5";
import { StyledIconButton } from "./styles";

const SelectLocale = () => {
  return (
    <Button.Group color="gradient" bordered>
      <Button>
        <NextLink href="/" locale="ja">
          <Text>Japanese</Text>
        </NextLink>
      </Button>
      <Button>
        <NextLink href="/" locale="en">
          <Text>English</Text>
        </NextLink>
      </Button>
    </Button.Group>
  );
};

export const ToggleLocale: React.FC = () => {
  return (
    <Tooltip trigger="click" placement="bottomEnd" content={<SelectLocale />}>
      <StyledIconButton>
        <IoLanguageSharp size="1.5em" />
      </StyledIconButton>
    </Tooltip>
  );
};
