import type { Metadata } from "next";
import BytNaHypoteku from "./BytNaHypoteku";

export const metadata: Metadata = {
  title: "Byt na hypotéku jako investice – síla páky | Investuj bez starostí",
  description:
    "S úsporami do milionu korun můžete vlastnit byt v hodnotě téměř 3 miliony. Garantovaný nájem pokrývá splátku, zhodnocuje se celá nemovitost. Spočítejte si konkrétní příklad.",
  openGraph: {
    title: "Byt na hypotéku jako investice – síla páky",
    description:
      "S úsporami do milionu korun vlastníte byt za 2,99 mil. Kč. Nájem pokrývá splátku, roste celá nemovitost.",
    type: "website",
  },
};

export default function Page() {
  return <BytNaHypoteku />;
}
