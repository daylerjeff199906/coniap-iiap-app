'use server'
import * as Brevo from '@getbrevo/brevo'

// const apiInstance = new brevo.TransactionalEmailsApi()
const apiContact = new Brevo.ContactsApi()

apiContact.setApiKey(
  Brevo.ContactsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
)

interface IContact {
  email: string
  name: string
  surname: string
}

export const addContactToList = async (props: IContact, listId: number) => {
  try {
    const contact = {
      email: props.email,
      attributes: {
        NOMBRE: props.name,
        APELLIDOS: props.surname,
      },
      listIds: [listId], // Aquí especificas la lista a la que quieres añadir el contacto
      updateEnabled: true, // Si true, actualizará el contacto si ya existe
    }

    await apiContact.createContact(contact)
  } catch (error: any) {
    if (error.body && error.body.code === 'duplicate_parameter') {
      console.log('Contact already exists:', props.email)
    } else {
      console.error('Error adding contact:', error)
    }
  }
}
