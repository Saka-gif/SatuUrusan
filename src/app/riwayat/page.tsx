import { Navbar } from "@/components/Navbar";
import { AccountRoadmaps } from "@/components/AccountRoadmaps";

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <AccountRoadmaps mode="history" />
    </>
  );
}
