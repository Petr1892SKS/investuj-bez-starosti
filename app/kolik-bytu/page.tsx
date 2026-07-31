import type { Metadata } from "next";
import Kalkulacka from "./Kalkulacka";

export const metadata: Metadata = {
  title: "Kolik bytů = vaše výplata? | Investuj bez starostí",
  description:
    "Spočítejte si, kolik nájemních bytů potřebujete, aby vám pokryly měsíční příjem — a za jak dlouho vám to naskočí. Orientační propočet za pár vteřin.",
  openGraph: {
    title: "Kolik bytů = vaše výplata?",
    description:
      "Nastavte dvě čísla a zjistěte, kolik nájemních bytů potřebujete a kdy vám příjem naskočí.",
    type: "website",
  },
};

export default function Page() {
  return <Kalkulacka />;
}
