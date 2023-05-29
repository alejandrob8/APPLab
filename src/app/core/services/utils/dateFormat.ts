export function dateFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  export function dateToMonthDayYear(dateToFormat: string): string{
    const datePart = dateToFormat.split('/');
    const day = datePart[0];
    const month = datePart[1];
    const year = datePart[2];
    return `${month}/${day}/${year}`;
  }