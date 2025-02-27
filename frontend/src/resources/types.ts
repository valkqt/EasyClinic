export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  fiscalCode: string;
  examinations: Examination[];
}

export interface Examination {
  id: number;
  anamnesis: string;
  category: number;
  motivation: number;
  dateTime: string;
}
