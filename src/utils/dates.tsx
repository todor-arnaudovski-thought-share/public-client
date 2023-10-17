import { format, parseISO } from "date-fns";

export const getFormattedDate = (dateString: string) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, "dd MMM yy @ HH:mm");
  return formattedDate;
};
