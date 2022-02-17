import { Text, Tooltip, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import { StyledIconButton } from "./styles";

export const ToggleTheme: React.FC = () => {
  const { setTheme, theme } = useNextTheme();
  const { isDark } = useTheme();
  const toggleTheme = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Tooltip placement="bottomEnd" content={<Text b>{theme}</Text>}>
      {isDark ? (
        <StyledIconButton onClick={toggleTheme}>
          <BsMoon size="1.5em" />
        </StyledIconButton>
      ) : (
        <StyledIconButton onClick={toggleTheme}>
          <BsSun size="1.5em" />
        </StyledIconButton>
      )}
    </Tooltip>
  );
};
