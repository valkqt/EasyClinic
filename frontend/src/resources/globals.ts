export enum Motivation {
  PrimaVisita = 0,
  Controllo = 1,
  Urgenza = 2,
}

export const motivationMap: Record<number, string> = {
  [Motivation.PrimaVisita]: "Prima Visita",
  [Motivation.Controllo]: "Controllo",
  [Motivation.Urgenza]: "Urgenza",
};

export enum Category {
  Ambulatoriale = 0,
  Domiciliare = 1,
}

export const categoryMap: Record<number, string> = {
  [Category.Ambulatoriale]: "Ambulatoriale",
  [Category.Domiciliare]: "Domiciliare",
};
