import { useContext } from "react";
import { Web3Context } from "../components/Web3Provider";
import { Web3ContextInterface } from "../types/web3Types";

export const useWeb3 = (): Web3ContextInterface => useContext(Web3Context);
