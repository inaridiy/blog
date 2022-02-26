import EditorLayout from "@/components/layouts/editorLayout";
import Editor from "@/components/modules/editor";
import { ArticleMetaType } from "@/types/articleTypes";
import { hashToURL, submit } from "@/util/EditUtil";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [metaData, setMetaData] = useState<ArticleMetaType>({
    title: "",
    slug: "",
    category: [],
  });
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (text && metaData.title) {
        setIsLoading(true);
        const { IpfsHash } = await submit(metaData, text, images);
        await router.push(`/admin/edit?hash=${IpfsHash}`);
        setHash(String(IpfsHash));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const loadArticle = async (hash: string) => {
    try {
      setIsLoading(true);
      const data = await fetch(hashToURL(hash));
      const { meta, body } = (await data.json()) as {
        meta: ArticleMetaType;
        body: string;
      };
      setMetaData(meta);
      setText(body);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { hash } = router.query;
    if (hash) {
      setHash(String(hash));
      void loadArticle(String(hash));
    }
  }, [router.query]);

  return (
    <EditorLayout onSubmit={handleSubmit} loading={isLoading} hash={hash}>
      <Card>
        <Editor
          {...{ text, setText, images, setImages, metaData, setMetaData }}
        />
      </Card>
    </EditorLayout>
  );
};

export default EditPage;
