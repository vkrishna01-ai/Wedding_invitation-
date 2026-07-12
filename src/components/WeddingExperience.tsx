import type { Guest } from "@/config/guests";
import Envelope from "@/components/sections/Envelope";
import Hero from "@/components/sections/Hero";
import Destination from "@/components/sections/Destination";
import Blessings from "@/components/sections/Blessings";
import Events from "@/components/sections/Events";
import RSVP from "@/components/sections/RSVP";
import Farewell from "@/components/sections/MemoryMode";
import Navigation from "@/components/Navigation";
import MusicPlayer from "@/components/MusicPlayer";
import GlobalPetals from "@/components/GlobalPetals";

export default function WeddingExperience({ guest }: { guest?: Guest }) {
  return (
    <>
      <GlobalPetals />
      <Navigation />
      <MusicPlayer />
      <Envelope />

      <main className="flex flex-col">
        {/* I · The Invitation */}
        <Hero />

        {/* II · The Destination */}
        <Destination />

        {/* III · Divine Blessings */}
        <Blessings />

        {/* IV · The Celebration */}
        <Events />

        {/* V · Kindly Respond */}
        <RSVP guest={guest} />

        {/* Farewell */}
        <Farewell />
      </main>
    </>
  );
}
