import { ByContract, ForContract } from "@/types/articleTypes";
import { ethers } from "ethers";
import { Articles } from "./contracts";
import { convertAccount } from "./web3Util";

export const postArticle = async (
  contract: Articles,
  { tokenURI, ownerOnly, quantity, price }: ForContract
) => {
  await contract.post(
    tokenURI,
    ownerOnly,
    quantity,
    ethers.utils.parseEther(price)
  );
};

export const getArticles = async (
  contract: Articles
): Promise<ByContract[]> => {
  const signerAddress = await contract.signer.getAddress();
  const res = await contract.getArticles(signerAddress);
  const articles = res.map(({ ownerOnly, price, uri, writer }, index) => ({
    id: index + 1,
    ownerOnly,
    price: ethers.utils.formatEther(price),
    tokenURI: uri,
    writer,
  }));
  return articles;
};

export const getMembers = async (contract: Articles) => {
  const [admin, editor, writer] = await Promise.all([
    (async () =>
      await getRoleMembers(contract, await contract.DEFAULT_ADMIN_ROLE()))(),
    (async () =>
      await getRoleMembers(contract, await contract.EDITOR_ROLE()))(),
    (async () =>
      await getRoleMembers(contract, await contract.WRITER_ROLE()))(),
  ]);
  return { admin, editor, writer };
};

export const getRoleMembers = async (contract: Articles, role: string) => {
  const roleMemberCount = await contract.getRoleMemberCount(role);
  const roleMembersPromise = Array(roleMemberCount.toNumber())
    .fill("")
    .map(
      async (_, index) =>
        await convertAccount(await contract.getRoleMember(role, index))
    );
  const roleMembers = await Promise.all(roleMembersPromise);
  return roleMembers;
};
