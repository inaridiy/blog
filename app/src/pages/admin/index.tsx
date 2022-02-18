import { FullLoading } from "@/components/base";
import DefaultLayout from "@/components/layouts/default";
import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";

export default function AdminIndex() {
  const { account, isLoading } = useWeb3();
  const contract = useContract();

  return (
    <DefaultLayout>
      <FullLoading size="xl" />
    </DefaultLayout>
  );
}
