import { Button, Checkbox, Input } from '@nextui-org/react'
import svgLine from '@/assets/svg/patron-fino.svg'
import Image from 'next/image'

export const FrmContactUs = () => {
  return (
    <>
      <section className="bg-primary-900 section-home">
        <div className="container grid grid-cols-1 gap-24 sm:grid-cols-2 sm:gap-6 lg:gap-24">
          <section className="text-white space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase">
              Cuéntanos lo que te interesa
            </h1>
            <h3>
              ¿Tiene preguntas sobre la conferencia? ¿Está interesado en
              patrocinar,quieres saber más sobre cómo puedes participar?
              ¡Contáctenos!
            </h3>
            <Image
              src={svgLine}
              alt="Patrón fino"
              width={340}
              //   height={10}
              className="object-cover"
            />
          </section>
          <section>
            <h3 className="text-white pb-3">
              Ingresa tus datos y nos pondremos en contacto contigo.
            </h3>
            <form className="grid grid-cols-1 gap-3">
              <Input
                aria-label="Nombre"
                placeholder="John Doe"
                label="Nombre"
                radius="sm"
                size="sm"
              />
              <Input
                aria-label="Correo electrónico"
                placeholder="ejemplo@correo.com.pe"
                label="Correo electrónico"
                size="sm"
                radius="sm"
              />
              <Input
                aria-label="Teléfono"
                placeholder="987654321"
                label="Teléfono"
                radius="sm"
                size="sm"
              />
              <Checkbox size="sm">
                <p className="text-white text-xs">
                  Acepto la política de privacidad y los términos de uso
                </p>{' '}
              </Checkbox>
              <div>
                <Button
                  variant="solid"
                  color="primary"
                  radius="full"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  )
}
