import EditorLayout from "@/components/layouts/editorLayout";
import Editor from "@/components/modules/editor";
import { ArticleMetaType } from "@/types/articleTypes";
import { compressionImages, uploadFiles } from "@/util/EditUtil";
import { Button, Card } from "@nextui-org/react";
import { useState } from "react";

const EditPage = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [metaData, setMetaData] = useState<ArticleMetaType>({
    title: "",
    slug: "",
    category: [],
  });
  const onClick = async () => {
    const compressedImages = await compressionImages(images);
    const result = await uploadFiles(
      Object.assign({}, ...compressedImages.map((image, i) => ({ [i]: image })))
    );
    console.log(result);
  };

  return (
    <EditorLayout>
      <Card>
        <Button onClick={onClick}>Test</Button>
        <Editor
          {...{ text, setText, images, setImages, metaData, setMetaData }}
        />
      </Card>
    </EditorLayout>
  );
};

export default EditPage;
