//  Example output: "7/9/23 14:54"
export default function formatISODateStringCompact(
  isoDateString: string | number | Date
) {
  const date = new Date(isoDateString);
  return new Intl.DateTimeFormat("default", {
    year: "2-digit",
    month: "numeric", // "numeric" for no leading zero
    day: "numeric", // "numeric" for no leading zero
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  })
    .format(date)
    .replace(",", "")
    .replace(/(\d{1,2})\/(\d{1,2})\/(\d{2})/, "$1/$2/$3");
}
