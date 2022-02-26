import { useWeb3 } from "@/hooks/useWeb3";
import { Account as AccountType } from "@/types/web3Types";
import { Avatar, Button, Loading, Row, Spacer, Text } from "@nextui-org/react";
import { BiWallet } from "react-icons/bi";

export const Account: React.FC = () => {
  const { account, isLoading, connectWallet } = useWeb3();
  const handleClick = async () => {
    await connectWallet();
  };

  if (account) {
    return <AccountInfo account={account} />;
  } else if (isLoading) {
    return <Loading type="points" />;
  } else {
    return (
      <Button auto light css={{ px: "$1" }} onClick={handleClick}>
        <BiWallet size="2em" />
        <Spacer
          x={0.2}
          css={{
            "@xsMax": {
              display: "none",
            },
          }}
        />
        <Text
          css={{
            "@xsMax": {
              display: "none",
            },
          }}
        >
          Connect Wallet
        </Text>
      </Button>
    );
  }
};

export const AccountInfo: React.FC<{
  account?: AccountType;
  size?: "auto" | "small" | "large";
}> = ({ account, size = "auto" }) => {
  const avatarSrc = account?.avatar || undefined;
  const avatarText = account?.ethName || account?.id;
  return (
    <Row css={{ width: "fit-content" }} align="center" gap={0.5}>
      <Avatar
        src={avatarSrc}
        text={avatarText}
        color={avatarSrc ? "gradient" : undefined}
        bordered
        css={{ p: "$0" }}
      ></Avatar>
      <Text
        css={{
          display: size === "auto" || size === "large" ? "block" : "none",
          "@xsMax": {
            display: size === "auto" || size === "small" ? "none" : "block",
          },
        }}
      >
        {avatarText}
      </Text>
    </Row>
  );
};
