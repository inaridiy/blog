import { Box, FullLoading } from "@/components/base";
import { AccountInfo } from "@/components/modules/account";
import { StyledIconButton } from "@/components/modules/buttons/styles";
import {
  useArticleFetcher,
  useContent,
  useContract,
  useContractFetcher,
  useWeb3,
} from "@/hooks";
import { ByContract } from "@/types/articleTypes";
import { Account } from "@/types/web3Types";
import { getArticles, getMembers } from "@/util/AdminUtil";
import {
  Button,
  Card,
  Container,
  Grid,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { PostArticleModal } from "./modal";

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
  const [isOpen, setIsOpen] = useState(false);
  const contract = useContract();
  const { data: articles } = useContractFetcher(
    contract,
    "articles",
    getArticles
  );

  const handler = (bool: boolean) => () => setIsOpen(bool);

  return (
    <>
      <Card>
        <Row justify="space-between" align="center">
          <Text size={30} b>
            投稿一覧
          </Text>
          <StyledIconButton onClick={handler(true)}>
            <BsPlus size="3em" />
          </StyledIconButton>
        </Row>
        <Grid.Container>
          <Grid>
            {articles?.map((article) => (
              <AdminArticleCard contractData={article} key={article.tokenURI} />
            ))}
          </Grid>
        </Grid.Container>
      </Card>
      <PostArticleModal open={isOpen} onClose={handler(false)} />
    </>
  );
};

const AdminArticleCard: React.FC<{ contractData: ByContract }> = ({
  contractData,
}) => {
  const { article } = useArticleFetcher(contractData);
  const writer = article?.writer.ethName || article?.writer.abbreviatedId;

  return (
    <>
      {article && (
        <Card clickable>
          <Text size={20} b>
            {article?.meta.title}
          </Text>
          <Row>
            <Text>{article?.contract.price} Matic</Text>
          </Row>
          <Text>{writer}</Text>
        </Card>
      )}
    </>
  );
};

const AdminMembers: React.FC = () => {
  const { account } = useWeb3();
  const contract = useContract();
  const { data: members } = useContractFetcher(contract, "members", getMembers);
  const isAdmin = useCallback(
    () =>
      account &&
      members &&
      members.admin.some(
        (member) => member.id.toLowerCase() === account.id.toLowerCase()
      ),
    [account, members]
  );
  return (
    <Card>
      <Row justify="space-between" align="center">
        <Text size={30} b>
          メンバー一覧
          {!members && <Loading />}
        </Text>
        {isAdmin() && (
          <StyledIconButton>
            <BsPlus size="3em" />
          </StyledIconButton>
        )}
      </Row>
      {members && (
        <>
          <AdminShowMembers text="Admin" accounts={members.admin} />
          <AdminShowMembers text="Editor" accounts={members.editor} />
          <AdminShowMembers text="Writer" accounts={members.writer} />
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
        <AccountInfo account={account} size="large" key={text + account.id} />
      ))}
    </Container>
  ) : (
    <></>
  );
};
