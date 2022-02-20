import {
  Card,
  Grid,
  Input,
  Spacer,
  StyledInput,
  Text,
  Textarea,
} from "@nextui-org/react";
import React, { memo, useState } from "react";
import { BsPlus } from "react-icons/bs";

const Editor: React.FC = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setText(`${text}\n![*](${URL.createObjectURL(file)})`);
      setImages([...images, file]);
    }
  };
  return (
    <Card>
      <Input underlined labelLeft="Title" size="xl" />
      <Spacer y={1} />
      <Input underlined labelLeft="Slug" />
      <Spacer y={1} />
      <Input underlined labelLeft="Category" />
      <Spacer y={1} />
      <Grid.Container gap={1}>
        <Images images={images} />
        <Grid>
          <Card css={{ position: "relative" }}>
            <BsPlus size="2em" />
            <StyledInput
              type="file"
              onChange={onFileChange as any}
              css={{
                position: "absolute",
                opacity: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Textarea
        minRows={9}
        maxRows={25}
        bordered
        fullWidth
        value={text}
        onChange={onTextChange as any}
      />
    </Card>
  );
};

export default Editor;

const Images: React.FC<{ images: File[] }> = memo(({ images }) => {
  return (
    <>
      {URL.createObjectURL &&
        images.map((image) => (
          <Grid xs={4} sm={2} key={image.name}>
            <Card cover hoverable>
              <Card.Image
                width="100%"
                height="100%"
                src={URL.createObjectURL(image)}
              />
              <Card.Footer
                blur
                css={{
                  position: "absolute",
                  bgBlur: "#ffffff",
                  borderTop:
                    "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                  bottom: 0,
                  padding: "$1",
                  paddingLeft: "$4",
                  zIndex: 1,
                }}
              >
                <Text size={14} b>
                  {image.name}
                </Text>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
    </>
  );
});
