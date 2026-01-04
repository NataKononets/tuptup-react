import { useLanguage } from "../context/LanguageContext";

const langs = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "uk", label: "UA", flag: "🇺🇦" },
  { code: "ja", label: "JP", flag: "🇯🇵" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="d-flex align-items-center gap-2">
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`btn btn-sm ${lang === l.code ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setLang(l.code)}
          aria-label={`Switch language to ${l.code}`}
          title={l.label}
          style={{ lineHeight: 1 }}
        >
          <span style={{ fontSize: 18 }}>{l.flag}</span>
        </button>
      ))}
    </div>
  );
}