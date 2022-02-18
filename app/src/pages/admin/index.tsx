import { FullLoading } from "../../components/base";
import { useContract } from "../../hooks/useContract";
import DefaultLayout from "../../layouts/default";

export default function AdminIndex() {
  const contract = useContract();

  return (
    <DefaultLayout>
      <FullLoading size="xl" />
    </DefaultLayout>
  );
}
