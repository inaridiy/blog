import { Box, FullLoading } from "@/components/base";
import { AccountInfo } from "@/components/modules/account";
import { StyledIconButton } from "@/components/modules/buttons/styles";
import {
  useArticleFetcher,
  useContent,
  useContract,
  useContractFetcher,
  useHashFetcher,
  useStorageState,
  useWeb3,
} from "@/hooks";
import { ByContract } from "@/types/articleTypes";
import { Account } from "@/types/web3Types";
import { getArticles, getMembers } from "@/util/AdminUtil";
import {
  Button,
  Card,
  Container,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { EditArticleModal, PostArticleModal } from "./modal";

const AdminPage: React.FC = () => {
  const { isLoading, connectWallet, isTargetChain, account } = useWeb3();
  const { chainDiffMsg } = useContent();
  const contract = useContract();
  const handleClick = () => connectWallet();

  if (contract) {
    return (
      <>
        <AdminEditorHistory />
        <Spacer y={2} />
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

const AdminEditorHistory: React.FC = () => {
  const [input, setInput] = useState("");
  const [hashes, _setHashes] = useStorageState<string[]>("articleHashes", []);
  const router = useRouter();

  const setHashes = (s: string[]) =>
    _setHashes(Array.from(new Set([input, ...hashes])));

  const inputHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };
  const openHandler = async () => {
    if (input) {
      setHashes([input, ...hashes]);
      await router.push(`/admin/edit?hash=${input}`);
    }
  };

  return (
    <Card>
      <Row justify="space-between" align="center">
        <Text size={30} b>
          編集履歴
        </Text>
        <NextLink href="/admin/edit">
          <StyledIconButton>
            <BsPlus size="3em" />
          </StyledIconButton>
        </NextLink>
      </Row>
      <Box css={{ display: "flex", flexDirection: "column", gap: "$6" }}>
        <Row>
          <Input
            placeholder="ipfs hash"
            width="100%"
            value={input}
            onChange={inputHandler}
          />
          <Spacer />
          <Button auto onClick={openHandler}>
            Open
          </Button>
        </Row>
        {hashes.map((hash) => (
          <AdminHashItem hash={hash} key={hash} />
        ))}
      </Box>
    </Card>
  );
};

const AdminHashItem: React.FC<{ hash: string }> = ({ hash }) => {
  const { article } = useHashFetcher(hash);
  const [isCopied, setIsCopied] = useState(false);
  const [hided, setIsHided] = useState(false);
  const [hashes, setHashes] = useStorageState<string[]>("articleHashes", []);
  const router = useRouter();
  const copyURI = () => {
    void navigator.clipboard.writeText(hash ? `ipfs://${hash}` : "");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };
  const abbreviatedHash = `${hash?.slice(0, 4) || ""}.....${
    hash?.slice(-4) || ""
  }`;
  const hide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setHashes(hashes.filter((v) => v !== hash));
    setIsHided(true);
  };
  const edit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    void router.push(`/admin/edit?hash=${hash}`);
  };

  return (
    <Box
      css={{
        maxW: "100%",
        overflow: "hidden",
        display: hided ? "none" : "block",
      }}
    >
      <Tooltip content={isCopied ? "Copied!!" : "Click To Copy IPFS URI"}>
        <Card
          clickable
          bordered
          shadow={false}
          onClick={copyURI}
          css={{
            overflowWrap: "break-word",
          }}
        >
          <Text size={20} b>
            {article ? article.meta.title : "Loading"}
          </Text>
          <Text css={{ "@xs": { display: "none" } }}>
            ipfs://{abbreviatedHash}
          </Text>
          <Text css={{ "@xsMax": { display: "none" } }}>ipfs://{hash}</Text>
          <Row justify="flex-end">
            <Button auto color="error" light onClick={hide}>
              Hide
            </Button>
            <Button shadow auto onClick={edit}>
              Edit
            </Button>
          </Row>
        </Card>
      </Tooltip>
    </Box>
  );
};

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
            NFT一覧
          </Text>
          <StyledIconButton onClick={handler(true)}>
            <BsPlus size="3em" />
          </StyledIconButton>
        </Row>
        <Box css={{ display: "flex", flexDirection: "column", gap: "$6" }}>
          {articles?.map((article) => (
            <AdminArticleCard contractData={article} key={article.tokenURI} />
          ))}
        </Box>
      </Card>
      <PostArticleModal open={isOpen} onClose={handler(false)} />
    </>
  );
};

const AdminArticleCard: React.FC<{ contractData: ByContract }> = ({
  contractData,
}) => {
  const { article } = useArticleFetcher(contractData);
  const [isOpen, setIsOpen] = useState(false);

  const writer = article?.writer.ethName || article?.writer.abbreviatedId;
  const handler = (bool: boolean) => () => setIsOpen(bool);

  return (
    <>
      <Card
        clickable
        bordered
        shadow={false}
        onClick={handler(true)}
        css={{ height: "fit-content", width: "fit-content" }}
      >
        {article ? (
          <>
            <Text size={20} b>
              {article?.meta.title}
            </Text>
            <Row>
              <Text>{article?.contract.price} Matic</Text>
            </Row>
            <Text>{writer}</Text>
          </>
        ) : (
          <FullLoading />
        )}
      </Card>
      {article && (
        <EditArticleModal
          article={article}
          open={isOpen}
          onClose={handler(false)}
        />
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
