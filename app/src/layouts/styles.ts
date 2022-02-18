import { styled } from "@nextui-org/react";

export const StyledNavContainer = styled("nav", {
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  height: "76px",
  position: "sticky",
  background: "transparent",
  zIndex: "$max",
  "& .navbar__social-icon": {
    fill: "$colors$headerIconColor",
  },
  variants: {
    showBlur: {
      true: {
        background: "$headerBackground",
        backdropFilter: "saturate(180%) blur(10px)",
      },
    },
    detached: {
      true: {
        boxShadow: "0px 5px 20px -5px rgba(2, 1, 1, 0.1)",
      },
    },
  },
});

export const StyledIconContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "0.75em",
  "@xsMax": {
    gap: "0.5em",
  },
});
