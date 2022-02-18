import { useEffect, useState } from "react";
import { Articles, Articles__factory } from "../util/contracts";
import { useWeb3 } from "./useWeb3";

export const useContract = () => {
  const [contract, setContract] = useState<Articles | null>(null);
  const { provider, isTargetChain } = useWeb3();

  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (provider && contractAddress && isTargetChain) {
      const signer = provider.getSigner();
      const ArticlesContract = Articles__factory.connect(
        contractAddress,
        signer
      );
      setContract(ArticlesContract);
    } else {
      setContract(null);
    }
  }, [provider, isTargetChain]);

  return contract;
};
