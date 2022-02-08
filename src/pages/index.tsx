import type { NextPage } from "next";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  console.log(isDark);
  return (
    <div>
      The current theme is: {type}
      <Switch
        initialChecked={isDark}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
    </div>
  );
};

export default Home;
