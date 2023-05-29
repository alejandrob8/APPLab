export function convertHour12to24(hour12: string): string {

  const [hour, minutes, ampm] = hour12.split(/:|\s/);

  let hour24 = Number(hour);

  if (ampm.toLowerCase() === 'pm' && hour24 !== 12) {
    hour24 += 12;
  } else if (ampm.toLowerCase() === 'am' && hour24 === 12) {
    hour24 = 0;
  }

  const hour24String = hour24.toString().padStart(2, '0');

  const minutesString = minutes.padStart(2, '0');

  return `${hour24String}:${minutesString}`;
}

export function convertHour24to12(time24h: string): string { 
  // Divide la hora y los minutos 
  const [hours, minutes] = time24h.split(':'); 
  // Convierte las horas a un número entero 
  const hoursInt = parseInt(hours, 10); 
  // Determina si es AM o PM 
  const meridiem = hoursInt >= 12 ? 'PM' : 'AM'; 
  // Convierte las horas a formato de 12 horas 
  const hours12 = hoursInt % 12 || 12; 
  // Construye la hora en formato hh:mm AM/PM 
  const time12h = `${hours12}:${minutes} ${meridiem}`; 
  return time12h; 
}


