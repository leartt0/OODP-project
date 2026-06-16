import type { GhostKitchen } from "./types.js";

/** weEatz operates 8 ghost kitchen locations across Prishtina, Kosovo. */
export const GHOST_KITCHENS: GhostKitchen[] = [
  {
    id: "wk-dardania",
    name: "weEatz Dardania",
    district: "Dardania",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-ulpiana",
    name: "weEatz Ulpiana",
    district: "Ulpiana",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-bregu",
    name: "weEatz Bregu i Diellit",
    district: "Bregu i Diellit",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-lakrisha",
    name: "weEatz Lakrishtë",
    district: "Lakrishtë",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-veternik",
    name: "weEatz Veternik",
    district: "Veternik",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-kodra-e-trimave",
    name: "weEatz Kodra e Trimave",
    district: "Kodra e Trimave",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-sunnyhill",
    name: "weEatz Sunny Hill",
    district: "Sunny Hill",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
  {
    id: "wk-aktash",
    name: "weEatz Aktash",
    district: "Aktash",
    city: "Prishtina",
    cuisine: "Fast Food",
  },
];

export function getGhostKitchen(id: string): GhostKitchen | undefined {
  return GHOST_KITCHENS.find((k) => k.id === id);
}
