// Defines the Trip data model used across the application.

export interface Trip {
  _id?: string;
  code: string;
  name: string;
  resort: string;
  length: string;
  start: string;
  perPerson: number;
  image: string;
  description: string;
  slug?: string;
}
