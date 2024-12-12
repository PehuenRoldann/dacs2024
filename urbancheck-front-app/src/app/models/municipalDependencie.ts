enum MunicipalDependencies {
  Arbolado = 'Arbolado',
  AreasVerdes = 'Áreas Verdes',
  Barrido = 'Barrido',
  ConservacionDeCalles = 'Conservación de calles',
  Electrotecnia = 'Electrotecnia',
  EspaciosPublicos = 'Espacios Públicos',
  Microbasurales = 'Microbasurales',
  ObrasPrivadas = 'Obras Privadas',
  ObrasPublicas = 'Obras Públicas',
  OficinaTecnicaDeObrasSanitarias = 'Oficina Técnica de Obras Sanitarias',
  PoliciaMunicipal = 'Policia Municipal',
  Recoleccion = 'Recolección',
  RedDeAgua = 'Red de Agua',
  RedDeCloacas = 'Red de Cloacas',
  Riego = 'Riego',
  SaludAmbiental = 'Salud Ambiental',
  Transito = 'Tránsito',
  Zoonosis = 'Zoonosis'
}


export const DEPENDENCIES_MAP_IDS: { [key: number]: MunicipalDependencies } = {
  1: MunicipalDependencies.Arbolado,
  2: MunicipalDependencies.AreasVerdes,
  3: MunicipalDependencies.Barrido,
  4: MunicipalDependencies.ConservacionDeCalles,
  5: MunicipalDependencies.Electrotecnia,
  6: MunicipalDependencies.EspaciosPublicos,
  7: MunicipalDependencies.Microbasurales,
  8: MunicipalDependencies.ObrasPrivadas,
  9: MunicipalDependencies.ObrasPublicas,
  10: MunicipalDependencies.OficinaTecnicaDeObrasSanitarias,
  11: MunicipalDependencies.PoliciaMunicipal,
  12: MunicipalDependencies.Recoleccion,
  13: MunicipalDependencies.RedDeAgua,
  14: MunicipalDependencies.RedDeCloacas,
  15: MunicipalDependencies.Riego,
  16: MunicipalDependencies.SaludAmbiental,
  17: MunicipalDependencies.Transito,
  18: MunicipalDependencies.Zoonosis,
};


export function getDependencyId(value: MunicipalDependencies): number | undefined {
  const entry = Object.entries(DEPENDENCIES_MAP_IDS).find(
    ([, enumValue]) => enumValue === value
  );
  return entry ? Number(entry[0]) : undefined; // Devuelve el número o undefined si no lo encuentra
}


export default MunicipalDependencies;
