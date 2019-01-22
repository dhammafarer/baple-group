import chroma from "chroma-js";

export const darken = (color: string) => (v: number) => chroma(color).darken(v).hex();
export const lighten = (color: string) => (v: number) => chroma(color).brighten(v).hex();

export const isRoot = (s: string): boolean=> {
  return ['/', '/en', '/en/', '/es', '/es/', '/zh', '/zh/'].indexOf(s) > -1;
}
