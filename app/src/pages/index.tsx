import DefaultLayout from "@/components/layouts/default";
import { useWeb3 } from "@/hooks/useWeb3";
import { Text } from "@nextui-org/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { connectWallet, account } = useWeb3();

  return (
    <DefaultLayout>
      <Text h2>Hello World</Text>
    </DefaultLayout>
  );
};

export default Home;
