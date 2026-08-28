"use client";

/**
 * Past na roboty.
 *
 * Pole je pro člověka neviditelné a nedosažitelné tabulátorem, takže ho vyplní
 * jen automat, který prochází DOM. Server pak takový požadavek tiše zahodí.
 *
 * Schválně se skrývá odsunutím mimo plochu, ne `display: none` — to část robotů
 * pozná a pole přeskočí. Název `website` je zvolený tak, aby vypadal jako běžná
 * položka formuláře.
 */
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      tabIndex={-1}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
