import { Box, FullLoading } from "@/components/base";
import { AccountInfo } from "@/components/modules/account";
import { StyledIconButton } from "@/components/modules/buttons/styles";
import { useContent, useContract, useWeb3 } from "@/hooks";
import { useContractFetcher } from "@/hooks/useFetcher";
import { Account } from "@/types/web3Types";
import { getMembers } from "@/util/AdminUtil";
import {
  Button,
  Card,
  Container,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { BsPlus } from "react-icons/bs";

const AdminPage: React.FC = () => {
  const { isLoading, connectWallet, isTargetChain, account } = useWeb3();
  const { chainDiffMsg } = useContent();
  const contract = useContract();
  const handleClick = () => connectWallet();

  if (contract) {
    return (
      <>
        <AdminArticles />
        <Spacer y={2} />
        <AdminMembers />
      </>
    );
  } else if (isLoading) {
    return <FullLoading />;
  } else if (!isTargetChain && account) {
    return (
      <Box
        css={{
          display: "flex",
          width: "100%",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text h3>{chainDiffMsg}</Text>
      </Box>
    );
  } else {
    return (
      <Box
        css={{
          display: "flex",
          width: "100%",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button size="xl" color="gradient" shadow onClick={handleClick}>
          Connect Wallet
        </Button>
      </Box>
    );
  }
};

export default AdminPage;

const AdminArticles: React.FC = () => {
  return (
    <Card>
      <Row justify="space-between" align="center">
        <Text size={30} b>
          投稿一覧
        </Text>
        <StyledIconButton>
          <BsPlus size="3em" />
        </StyledIconButton>
      </Row>
    </Card>
  );
};

const AdminMembers: React.FC = () => {
  const contract = useContract();
  const { data } = useContractFetcher(contract, getMembers);
  return (
    <Card>
      <Row justify="space-between" align="center">
        <Text size={30} b>
          メンバー一覧
          {!data && <Loading />}
        </Text>
        <StyledIconButton>
          <BsPlus size="3em" />
        </StyledIconButton>
      </Row>
      {data && (
        <>
          <AdminShowMembers text="Admin" accounts={data.admin} />
          <AdminShowMembers text="Editor" accounts={data.editor} />
          <AdminShowMembers text="Writer" accounts={data.writer} />
        </>
      )}
    </Card>
  );
};

const AdminShowMembers: React.FC<{
  text: string;
  accounts: Account[];
}> = ({ text, accounts }) => {
  return accounts.length ? (
    <Container>
      <Text size={24} b>
        {text}
      </Text>
      {accounts.map((account) => (
        <AccountInfo account={account} size="large" />
      ))}
    </Container>
  ) : (
    <></>
  );
};
