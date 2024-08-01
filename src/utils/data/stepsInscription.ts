import { DriveStep } from 'driver.js'

export const stepsInscription: DriveStep[] = [
  {
    element: '#form-inscriptions',
    popover: {
      title: 'Formulario de Inscripción',
      description:
        'Este es el formulario de inscripción, aquí podrás registrarte como asistente o como ponente.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: '#personal-data',
    popover: {
      title: 'Registra tus datos',
      description:
        'Completa tus datos personales para poder participar en el congreso.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '#role-data',
    popover: {
      title: 'Participa como Ponente',
      description:
        'Si deseas participar como ponente, selecciona la opción y crea una contraseña. De lo contrario no selecciones la opción.',
      side: 'bottom',
      align: 'start',
    },
  },
  // {
  //   element: '#password-data',
  //   popover: {
  //     title: 'Crea una contraseña',
  //     description:
  //       'Crea una contraseña para poder acceder a tu perfil de ponente. Luego confirma tu contraseña.',
  //     side: 'left',
  //     align: 'start',
  //   },
  // },
  {
    element: '#btn-submit-inscription',
    popover: {
      title: 'Enviar Inscripción',
      description:
        'Una vez completado el formulario, presiona el botón para enviar tu inscripción y confirma',
      side: 'top',
      align: 'start',
    },
  },
  {
    element: '#login-link',
    popover: {
      title: 'Iniciar Sesión',
      description:
        'Si ya estás registrado como ponente, puedes iniciar sesión para enviar tu propuesta como ponente.',
      side: 'top',
      align: 'start',
    },
  },
  {
    element: '#download-format',
    popover: {
      title: 'Descargar Formato',
      description:
        'Si te interesa participar como ponente, descarga el formato de como enviar tu propuesta.',
      side: 'top',
      align: 'start',
    },
  },
]
