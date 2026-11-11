import { getCountries } from "@/app/_lib/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
  const rawCountries = await getCountries();

  const countriesList = Array.isArray(rawCountries)
    ? rawCountries
    : (rawCountries?.data ?? []);

  // Normalize data to support both v2 (c.name as string) and v3 (c.name.common)
  const countries = countriesList
    .map((c) => ({
      name: typeof c.name === "object" ? c.name.common : c.name,
      flag: c.flag || c.flags?.svg || c.flags?.png || "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      key={defaultCountry}
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
