# Instrukce projektu – investujbezstarosti.cz

## Kdo je klient a co dělá

**Klient: František Petrouš (Ing.)** — spoluzakladatel projektu
Tel: +420 725 027 957

Projekt prodává **konkrétní byty z existujícího portfolia** investorům jako pasivní investici s garantovaným nájemním příjmem a all-in správou. Byty jsou v **družstevním vlastnictví** (lze převést do OV kdykoli). František vlastní osobní portfolio 81 nemovitostí v hodnotě 285 mil. Kč, v oboru od roku 2014.

**Aktuální nabídka — projekt Alšova, Bílina:**
- Byt 2+1 · 53,1 m² · 1. patro · 2 290 000 Kč · 10 279 Kč/měsíc · 5,39 % p.a.
- Byt 3+1 · 82,3 m² bez zádveří · 4. patro · 2 850 000 Kč · 12 974 Kč/měsíc · 5,46 % p.a.
- Byt 3+1 · 87,2 m² se zádveřím · 3. patro · 2 990 000 Kč · 13 370 Kč/měsíc · 5,37 % p.a.

**Připravovaná 2. etapa:** Osecká 73, 75, 77 – Duchcov · Finalizace · Jaro 2026

**Petr Hlaváč** — provozuje web a komunikuje s Claudem přes VS Code extension.

---

## Co pro něj řešíš

- Úpravy a rozvoj webu `investujbezstarosti.cz` (Next.js 15, App Router)
- Tvorba a úpravy PDF teaserů pro investory (HTML soubory tisknutelné jako PDF)
- Aktualizace dat projektů (ceny, výnosy, fotky, patra)
- Opravy textů a copy dle zpětné vazby klienta
- Správa fotek — nahrávání do `/public/images/`, aktualizace galerií
- Git commits a push na GitHub (Vercel auto-deploy)

---

## Tech stack

- **Next.js 15**, App Router, TypeScript, React
- **Inline CSS** v `<style>` tagu — žádný Tailwind, žádné CSS moduly
- **Vercel** hosting, GitHub auto-deploy (`main` branch)
- Repo: `github.com/Petr1892SKS/investuj-bez-starosti`

## Struktura projektu

```
app/
  page.tsx                          # Landing page (~1400 řádků)
  projekty/
    alsova-bilina/page.tsx          # Detail 3+1 se zádveřím (87,2 m²)
    alsova-bilina-bez-zadveri/      # Detail 3+1 bez zádveří (82,3 m²)
    alsova-bilina-2-1/page.tsx      # Detail 2+1 (53,1 m²)

public/images/
  alsova-bilina-2-1/                # Fotky bytu 2+1
  alsova-bilina-3-1-zadveri/        # Fotky bytu 3+1 se zádveřím
  alsova-bilina-3-1-bez-zadveri/    # Fotky bytu 3+1 bez zádveří
  alsova-bilina-budova/             # Fotky budovy
  team/                             # Fotky týmu (frantisek-petrous.jpg)

teaser.html                         # PDF teaser – standardní verze
teaser-druzstevni.html              # PDF teaser – verze s důrazem na družstevní výhodu
```

## Design systém

- **Primární modrá:** `#366dff`
- **Tmavý text:** `#0f172a`
- **Zlatá:** `#d97706`, světlá `#f59e0b`
- **Pozadí:** `#f7f7fb`
- **Border:** `#e2e8f0`
- **Šedá (text2):** `#64748b`
- **Font:** Plus Jakarta Sans

---

## Jazyk, formát a tón výstupů

- **Jazyk:** česky, investiční terminologie — ne realitní
- **Tón:** věcný, profesionální, bez vykřičníků, bez superlativer
- **Zakázané formulace:** "krásný výhled", "skvělá příležitost!", "jedinečný"
- **Povolené formulace:** "garantovaná výše příjmu", "smluvně stanovená", "přímé vlastnictví"

---

## Kritická právní pravidla

1. **NIKDY neslučovat** garantovaný nájemní příjem a kapitálové zhodnocení do jednoho čísla
2. Kapitálové zhodnocení vždy označit jako "předpokládané" nebo "odhad" — **není garantováno**
3. Právní note na každé stránce teaseru: *"Předpokládané kapitálové zhodnocení nemovitosti 7 % p.a. není garantováno a je nad rámec garantovaného příjmu z nájmu."*
4. Garantovaný výnos = **příjem z nájmu** (5,37–5,46 % dle bytu), zhodnocení = **7 % p.a. odhad**

---

## Workflow

1. Petr popíše změnu (textem nebo screenshotem)
2. Claude upraví soubory přímo
3. Claude commituje a pushuje na GitHub (po mlčenlivém souhlasu nebo výzvě)
4. Vercel nasadí automaticky za ~1 minutu

---

## Specifika družstevního vlastnictví (klíčové USP)

- Byty jsou v **družstevním vlastnictví** — lze ponechat nebo převést do OV
- V DV se nepočítají do limitu 2 nemovitostí dle **regulace ČNB od 1. 4. 2026**
- Lze dát do zástavy, koupit na hypotéku, pronajímat
- Toto je hlavní konkurenční výhoda oproti ostatním projektům na trhu
