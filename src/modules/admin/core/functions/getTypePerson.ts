export function getTypePerson(type: string) {
  switch (type) {
    case 'speaker':
      return 'Ponente'
    case 'participant':
      return 'Asistente'
    case 'speaker_mg':
      return 'Ponente Magistral'

    default:
      return ''
  }
}
