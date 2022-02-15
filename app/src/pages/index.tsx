import { Button, Text } from "@nextui-org/react";
import type { NextPage } from "next";
import { useWeb3 } from "../hooks/useWeb3";
import DefaultLayout from "../layouts/default";

const Home: NextPage = () => {
  const { connectWallet, account } = useWeb3();
  const handleClick = async () => {
    console.log("on click");
    await connectWallet();
  };
  return (
    <DefaultLayout>
      <Button onClick={handleClick} shadow>
        Connect Wallet
      </Button>
      <Text>{String(account?.ethName || account?.abbreviatedId)}</Text>
    </DefaultLayout>
  );
};

export default Home;
