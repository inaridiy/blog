import DefaultLayout from "@/components/layouts/default";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/modules/editor"));

const EditPage = () => {
  return (
    <DefaultLayout>
      <Editor />
    </DefaultLayout>
  );
};

export default EditPage;
