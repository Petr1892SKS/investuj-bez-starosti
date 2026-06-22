import type { Metadata } from "next";
import MojeStrategie from "./MojeStrategie";

export const metadata: Metadata = {
  title: "Moje strategie – z nájmu v Praze k vlastnímu bydlení | Investuj bez starostí",
  description:
    "Bydlíte v Praze v nájmu? Koupíte dostupný investiční byt mimo Prahu, nájem pokrývá splátku a byt roste na hodnotě. Za pár let jím ručíte a financujete vlastní bydlení v Praze.",
  openGraph: {
    title: "Moje strategie – z nájmu v Praze k vlastnímu bydlení",
    description:
      "Dostupný investiční byt mimo Prahu, který se splácí nájmem a roste na hodnotě. Za pár let jím ručíte na vlastní bydlení v Praze.",
    type: "website",
  },
};

export default function Page() {
  return <MojeStrategie />;
}
