import useQuill from './useQuill'
import { useFormContext } from 'react-hook-form'

export const MoreDescription = () => {
  const { control } = useFormContext()

  const handleDescriptionChange = (content: string) => {
    // Manejar cambios en la descripción aquí
  }

  return (
    <section className="grid grid-cols-1 gap-4">
      <h1 className="text-lg">Personalizar descripción</h1>
      {useQuill({ onChange: handleDescriptionChange })}
    </section>
  )
}
