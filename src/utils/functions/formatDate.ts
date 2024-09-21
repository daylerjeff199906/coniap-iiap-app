type DateFormats =
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'MM/YYYY'
  | 'DD/MM/YYYY Hora: HH:mm'

  export function formatDate(dateString: string, format: DateFormats): string {
    // Dividir el dateString en partes
    const [datePart, timePart] = dateString.split('T');
    const dateParts = datePart.split('-');
    
    // Crear la fecha basada en el datePart
    const year = parseInt(dateParts[0], 10);
    const month = dateParts[1] ? parseInt(dateParts[1], 10) - 1 : 0; // Mes (restar 1 ya que los meses en JS son 0-based)
    const day = dateParts[2] ? parseInt(dateParts[2], 10) : 1; // Si no hay día, asumir 1
    const date = new Date(year, month, day);
  
    // Si el formato incluye horas, extraerlas o asignar valores predeterminados
    let hours = '00', minutes = '00';
    if (timePart) {
      const [h, m] = timePart.split(':');
      hours = h.padStart(2, '0');
      minutes = m.padStart(2, '0');
    }
  
    const dayString = String(date.getDate()).padStart(2, '0');
    const monthString = String(date.getMonth() + 1).padStart(2, '0');
    const yearString = String(date.getFullYear());
  
    // Devolver el formato solicitado
    return format
      .replace('DD', dayString)
      .replace('MM', monthString)
      .replace('YYYY', yearString)
      .replace('HH', hours)
      .replace('mm', minutes);
  }

export function formatDateLarge(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + 1)) // Usamos Date.UTC para evitar el problema de la zona horaria
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }
  return date
    .toLocaleDateString('es-ES', options)
    .toUpperCase()
    .replace('.', '')
}
