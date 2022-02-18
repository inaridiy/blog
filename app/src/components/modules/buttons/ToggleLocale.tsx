import { useContent } from "@/hooks/useContent";
import { Button, Link, Text, Tooltip } from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IoLanguageSharp } from "react-icons/io5";
import { StyledIconButton } from "./styles";

const SelectLocale = () => {
  const { selectLocale } = useContent();
  const { pathname } = useRouter();

  return (
    <Button.Group color="gradient" bordered css={{ m: 0 }}>
      <Button>
        <NextLink href={pathname} locale="ja">
          <Link>
            <Text weight="bold">{selectLocale.ja}</Text>
          </Link>
        </NextLink>
      </Button>
      <Button>
        <NextLink href={pathname} locale="en">
          <Link>
            <Text weight="bold">{selectLocale.en}</Text>
          </Link>
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
