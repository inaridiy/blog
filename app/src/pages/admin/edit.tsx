import EditorLayout from "@/components/layouts/editorLayout";
import Editor from "@/components/modules/editor";
import { useStorageState } from "@/hooks";
import { ArticleMetaType } from "@/types/articleTypes";
import { fetchArticleHash } from "@/util/ArticleUtil";
import { submit } from "@/util/EditUtil";
import { Card, Input, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hashes, setHashes] = useStorageState<string[]>("articleHashes", []);
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [pwd, setPwd] = useStorageState("javascriptVsPython", "");
  const [isOpenPwd, setIsOpenPwd] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [metaData, setMetaData] = useState<ArticleMetaType>({
    title: "",
    slug: "",
    category: [],
  });
  const router = useRouter();

  const handlePwd = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setPwd(e.target.value);

  const handleSubmit = async () => {
    try {
      if (text && metaData.title) {
        if (!pwd) {
          setIsOpenPwd(true);
          throw new Error("Auth Error");
        }
        setIsLoading(true);
        const { IpfsHash } = await submit(metaData, text, images, pwd);
        setHashes([IpfsHash, ...hashes]);
        await router.push(`/admin/edit?hash=${IpfsHash}`);
        setHash(String(IpfsHash));
      }
    } catch (e) {
      setPwd("");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const loadArticle = async (hash: string) => {
    try {
      setIsLoading(true);
      const { meta, body } = await fetchArticleHash(hash);
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
      <Modal open={isOpenPwd} onClose={() => setIsOpenPwd(false)}>
        <Modal.Body>
          <Input placeholder="PassWord" value={pwd} onChange={handlePwd} />
        </Modal.Body>
      </Modal>
    </EditorLayout>
  );
};

export default EditPage;
