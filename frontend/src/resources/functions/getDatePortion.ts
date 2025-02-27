export function getDatePortion(date: string): string {
  const datetime = new Date(date);

  return datetime.toLocaleDateString("en-US");
}
