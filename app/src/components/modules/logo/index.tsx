import { useContent } from "@/hooks/useContent";
import { Col, Text } from "@nextui-org/react";

type Props = {
  size?: string;
  subtitle?: boolean;
};

export const Logo: React.FC<Props> = ({
  subtitle: _subtitle = false,
  size = "2em",
}) => {
  const { title, subtitle } = useContent();
  return (
    <Col>
      <Text
        size={size}
        weight="bold"
        css={{
          mb: _subtitle ? "-0.3em" : 0,
          width: "fit-content",
        }}
      >
        {title}
      </Text>
      <Text small hidden={!_subtitle} color="$subtext">
        {subtitle}
      </Text>
    </Col>
  );
};