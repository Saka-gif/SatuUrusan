import { Navbar } from "@/components/Navbar";
import { AccountRoadmaps } from "@/components/AccountRoadmaps";

export default function MyMattersPage() {
  return (
    <>
      <Navbar />
      <AccountRoadmaps mode="active" />
    </>
  );
}
