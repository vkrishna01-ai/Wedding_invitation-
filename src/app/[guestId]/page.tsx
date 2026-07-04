import { getGuestById } from "@/config/guests";
import WeddingExperience from "@/components/WeddingExperience";
import { notFound } from "next/navigation";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ guestId: string }>
}) {
  const { guestId } = await params;
  const guest = getGuestById(guestId);

  if (!guest) {
    notFound();
  }

  return <WeddingExperience guest={guest} />;
}
