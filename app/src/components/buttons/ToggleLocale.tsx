import { Button, Text, Tooltip } from "@nextui-org/react";
import NextLink from "next/link";
import { IoLanguageSharp } from "react-icons/io5";
import { useContent } from "../../hooks/useContent";
import { StyledIconButton } from "./styles";

const SelectLocale = () => {
  const { selectLocale } = useContent();
  return (
    <Button.Group color="gradient" bordered css={{ m: 0 }}>
      <Button>
        <NextLink href="/" locale="ja">
          <Text weight="bold">{selectLocale.ja}</Text>
        </NextLink>
      </Button>
      <Button>
        <NextLink href="/" locale="en">
          <Text weight="bold">{selectLocale.en}</Text>
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
