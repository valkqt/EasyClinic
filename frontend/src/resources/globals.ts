import { Patient } from "./types";

export const patient = {
  id: 12,
  firstName: "plofi",
  lastName: "briccoli",
  photo: "images/generic_person.jpg",
  fiscalCode: "AAAABBBBCCCCDDDD",
};

export const motivationMap: Record<number, string> = {
  0: "Prima Visita",
  1: "Controllo",
  2: "Urgenza",
};

export const categoryMap: Record<number, string> = {
  0: "Ambulatoriale",
  1: "Domiciliare",
};
