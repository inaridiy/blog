import { Box, FullLoading } from "@/components/base";
import { StyledIconButton } from "@/components/modules/buttons/styles";
import { useContent, useContract, useWeb3 } from "@/hooks";
import { getArticles } from "@/util/AdminUtil";
import { Button, Card, Row, Spacer, Text } from "@nextui-org/react";
import { useEffect } from "react";
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
  const contract = useContract();
  useEffect(() => {
    if (contract) {
      getArticles(contract).catch((e) => console.error(e));
    }
  }, [contract]);
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
  return (
    <Card>
      <Row justify="space-between" align="center">
        <Text size={30} b>
          メンバー一覧
        </Text>
        <StyledIconButton>
          <BsPlus size="3em" />
        </StyledIconButton>
      </Row>
    </Card>
  );
};
