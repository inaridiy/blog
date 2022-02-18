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
