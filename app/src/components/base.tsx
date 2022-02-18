import { Loading, LoadingProps, styled } from "@nextui-org/react";

export const Box = styled("div", {
  boxSizing: "border-box",
});

export const FullLoading: React.FC<Partial<LoadingProps>> = (props) => {
  return (
    <Box
      css={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading {...props} />
    </Box>
  );
};

export const VerticalDivider = styled(Box, {
  width: "1px",
  height: "1.5em",
  backgroundColor: "black",
});
