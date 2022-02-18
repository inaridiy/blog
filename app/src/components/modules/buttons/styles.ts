import { styled } from "@nextui-org/react";

export const StyledIconButton = styled("button", {
  dflex: "center",
  display: "block",
  size: "auto",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  padding: 0,
  "&:hover": {
    opacity: 0.7,
  },
});
