import { Articles } from "./contracts";

export const getArticles = async (contract: Articles) => {
  const signerAddress = await contract.signer.getAddress();
  const res = await contract.WRITER_ROLE();
  console.log(res);
};
