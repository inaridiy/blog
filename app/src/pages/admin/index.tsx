import DefaultLayout from "@/components/layouts/default";
import AdminPage from "@/components/pages/admin";
import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";

export default function AdminIndex() {
  const { account, isLoading } = useWeb3();
  const contract = useContract();

  return (
    <DefaultLayout>
      <AdminPage />
    </DefaultLayout>
  );
}
