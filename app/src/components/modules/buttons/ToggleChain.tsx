import { useContent, useWeb3 } from "@/hooks";
import { switchChain } from "@/util/web3Util";
import { Text, Tooltip } from "@nextui-org/react";
import { VscDebugDisconnect } from "react-icons/vsc";
import { StyledIconButton } from "./styles";

export const ToggleChain: React.FC = () => {
  const { isTargetChain, isMetaMask, provider, account } = useWeb3();
  const { chainDiffMsg } = useContent();
  const handleClick = async () => {
    if (isMetaMask && provider) {
      await switchChain(provider);
    }
  };
  return (
    <Tooltip placement="bottomEnd" content={<Text>{chainDiffMsg}</Text>}>
      <StyledIconButton
        css={{ d: (isTargetChain || !account) && "none" }}
        onClick={handleClick}
      >
        <VscDebugDisconnect size="2em" color="#f21361" />
      </StyledIconButton>
    </Tooltip>
  );
};
