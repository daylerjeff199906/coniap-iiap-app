'use server'
import * as Brevo from '@getbrevo/brevo'

// const apiInstance = new brevo.TransactionalEmailsApi()
const apiContact = new Brevo.ContactsApi()
const apiCampaign = new Brevo.EmailCampaignsApi()
const apiTransactional = new Brevo.TransactionalEmailsApi()

apiContact.setApiKey(
  Brevo.ContactsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
)

apiCampaign.setApiKey(
  Brevo.EmailCampaignsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
)

apiTransactional.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
)

interface IContact {
  email: string
  name: string
  surname: string
}

interface IMessage {
  email: string
  name: string
  surname: string
  subject: string
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

export const updateCampaignContacts = async (
  campaignId: number,
  listId: number,
  contacts: IContact[]
) => {
  try {
    // // 1. Eliminar todos los contactos existentes de la lista
    // const listContacts = await apiContact.getContactsFromList(listId)
    // const existingContacts = listContacts.contacts.map((contact) => contact.id)
    // if (existingContacts.length > 0) {
    //   await apiContact.deleteContactFromList(listId, {
    //     contactIds: existingContacts,
    //   })
    // }

    // 2. Añadir los nuevos contactos a la lista
    for (const contact of contacts) {
      const newContact = {
        email: contact.email,
        attributes: {
          NOMBRE: contact.name,
          APELLIDOS: contact.surname,
        },
        listIds: [listId],
        updateEnabled: true,
      }

      await apiContact.createContact(newContact)
    }

    // 3. Actualizar la campaña con la nueva lista de contactos
    const updateCampaign = {
      recipients: {
        listIds: [listId],
      },
    }

    await apiCampaign.updateEmailCampaign(campaignId, updateCampaign)

    console.log('Campaign updated successfully!')
  } catch (error: any) {
    console.error('Error updating campaign:', error)
  }
}

export const sendTemplateMessage = async (
  templateId: number,
  message: IMessage
) => {
  try {
    const { email, name, surname, subject } = message

    // Actualiza los atributos del contacto con los datos proporcionados
    const updateContact = {
      email: email,
      attributes: {
        NOMBRE: name, // Utiliza el nombre proporcionado
        APELLIDOS: surname, // Utiliza el apellido proporcionado
        SUBJECT: subject, // Utiliza el asunto proporcionado
      },
    }

    // Actualiza el contacto en Brevo
    await apiContact.updateContact(email, updateContact)

    // Envía el mensaje
    const sendSmtpEmail = {
      to: [{ email: message.email }],
      templateId: templateId,
      params: {
        NOMBRE: message.name,
        APELLIDOS: message.surname,
        SUBJECT: message.subject,
      },
    }

    const response = await apiTransactional.sendTransacEmail(sendSmtpEmail)
    console.log('Email sent successfully:', response)
    return true
  } catch (error: any) {
    console.error('Error sending email:', error)
  }
}
