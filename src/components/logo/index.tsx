import { Col, Text } from "@nextui-org/react";
import { useContent } from "../../hooks/useContent";

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
      <Text size={size} weight="bold" css={{ mb: _subtitle ? "-0.3em" : 0 }}>
        {title}
      </Text>
      <Text small hidden={!_subtitle}>
        {subtitle}
      </Text>
    </Col>
  );
};
