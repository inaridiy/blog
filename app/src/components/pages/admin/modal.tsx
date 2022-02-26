import { useContract } from "@/hooks";
import { ForContract } from "@/types/articleTypes";
import { postArticle } from "@/util/AdminUtil";
import {
  Button,
  Input,
  Loading,
  Modal,
  ModalProps,
  Text,
} from "@nextui-org/react";
import { useState } from "react";

export const ArticleInput: React.FC<{
  data: ForContract;
  setData: (data: ForContract) => void;
}> = ({ data, setData }) => {
  const handleChangeAny =
    (key: string) =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setData({ ...data, [key]: e.target.value });
  return (
    <>
      <Input
        bordered
        labelLeft="TokenURI"
        value={data.tokenURI}
        onChange={handleChangeAny("tokenURI")}
      />
      <Input
        bordered
        labelLeft="OwnerOnly"
        value={data.ownerOnly}
        onChange={handleChangeAny("ownerOnly")}
      />
      <Input
        bordered
        labelLeft="quantity"
        value={data.quantity}
        onChange={handleChangeAny("quantity")}
      />
      <Input
        bordered
        labelLeft="Price"
        labelRight="MATIC"
        value={data.price}
        onChange={handleChangeAny("price")}
      />
    </>
  );
};

export const PostArticleModal: React.FC<Partial<ModalProps>> = (props) => {
  const { onClose } = props;
  const contract = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ForContract>({
    tokenURI: "",
    ownerOnly: "",
    quantity: "1000000",
    price: "0",
  });

  const post = async () => {
    try {
      if (contract) {
        setIsLoading(true);
        await postArticle(contract, data);
        onClose && onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal {...props}>
      <Modal.Header>
        <Text h2>記事を投稿</Text>
      </Modal.Header>
      <Modal.Body>
        <ArticleInput {...{ data, setData }} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          shadow
          auto
          color="error"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button shadow auto onClick={post} clickable={!isLoading}>
          {isLoading ? <Loading /> : " Post!!"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const EditArticleModal: React.FC<Partial<ModalProps>> = () => {
  return <Modal></Modal>;
};