import { Articles } from "./contracts";
import { convertAccount } from "./web3Util";

export const getArticles = async (contract: Articles) => {
  const signerAddress = await contract.signer.getAddress();
  const res = await contract.WRITER_ROLE();
  console.log(res);
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
  console.log({ admin, editor, writer });
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
