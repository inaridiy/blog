import { useTheme } from "@nextui-org/react";
import type { NextPage } from "next";
import { useTheme as useNextTheme } from "next-themes";
import DefaultLayout from "../layouts/default";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <DefaultLayout>
      <div></div>
    </DefaultLayout>
  );
};

export default Home;
