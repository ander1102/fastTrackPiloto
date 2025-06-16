export interface Giro {
  idagep_catgiro: number;
  nombre: string;
}
export interface Sucursales {
  idagep_sucursal: number;
  nombre: string;
}

export interface GiroGetResponse {
  empresas: Giro[];
}

export interface NativeCountryName {
  official: string;
  common: string;
}

export interface CountryName extends NativeCountryName {
  nativeName: { [key: string]: NativeCountryName };
}

export interface CountryConcurrency {
  name: string;
  symbol: string;
}

export interface CountryIDD {
  root: string;
  suffixes: string[];
}

export interface CountryDemonyms {
  f: string;
  m: string;
}

export interface CountryMap {
  googleMaps: string;
  openStreetMaps: string;
}

export interface CountryCarInfo {
  signs: string[];
  side: "left" | "right";
}

export interface CountryImage {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCapitalInfo {
  latlng: number[];
}

export interface CountryPostalCode {
  format: string;
  regex: string;
}

export interface Country {
  name: CountryName;
  tld: string[];
  cca2: string[];
  ccn3: string[];
  cca3: string[];
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: { [key: string]: CountryConcurrency };
  idd: CountryIDD;
  capital: string[];
  altSpellings: string[];
  region: string[];
  subregion: string[];
  languages: { [key: string]: string };
  translations: { [key: string]: NativeCountryName };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: { [key: string]: CountryDemonyms };
  flag: string;
  maps: CountryMap;
  population: number;
  fifa: string;
  car: CountryCarInfo;
  timezones: string[];
  continents: string[];
  flags: CountryImage;
  coatOfArms: CountryImage;
  startOfWeek: "monday";
  capitalInfo: CountryCapitalInfo;
  postalCode: CountryPostalCode;
}

export interface MetPago {
  idagep_catpago: number;
  tipo: string;
}
export interface Adquiriente {
  idagep_adquiriente: number;
  banco: string;
  redlogica: string;
  estatus: string;
}

export interface Tasas {
  idagep_tipo_tasa: number;
  nombre: string;
  monto: number;
  descripcion: string;
}
