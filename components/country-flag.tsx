import { getCountryFlagUrl } from "@/lib/country-flags";

interface CountryFlagProps {
  country: string;
  size?: number;
  className?: string;
}

export function CountryFlag({ country, size = 20, className }: CountryFlagProps) {
  const url = getCountryFlagUrl(country);
  if (!url) return null;

  return (
    <img
      src={url}
      alt={`${country} flag`}
      width={size}
      height={Math.round(size * 0.75)}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
      loading="lazy"
    />
  );
}
