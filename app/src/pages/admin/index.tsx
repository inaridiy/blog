import { useWeb3 } from "@/hooks/useWeb3";
import { FullLoading } from "../../components/base";
import { useContract } from "../../hooks/useContract";
import DefaultLayout from "../../layouts/default";

export default function AdminIndex() {
  const { account, isLoading } = useWeb3();
  const contract = useContract();

  return (
    <DefaultLayout>
      <FullLoading size="xl" />
    </DefaultLayout>
  );
}
