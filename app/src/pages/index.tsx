import { Button } from "@nextui-org/react";
import type { NextPage } from "next";
import { useWeb3 } from "../hooks/useWeb3";
import DefaultLayout from "../layouts/default";

const Home: NextPage = () => {
  const { initWeb3, account } = useWeb3();
  const connectWallet = async () => {
    console.log("on click");
    await initWeb3({ isRequestAccount: true });
  };
  return (
    <DefaultLayout>
      <Button onClick={connectWallet} shadow>
        Connect Wallet
      </Button>
      {String(account?.ethName || account?.abbreviatedId)}
    </DefaultLayout>
  );
};

export default Home;
