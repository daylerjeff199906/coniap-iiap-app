'use server'
import * as Brevo from '@getbrevo/brevo'

// const apiInstance = new brevo.TransactionalEmailsApi()
const apiContact = new Brevo.ContactsApi()
const apiCampaign = new Brevo.EmailCampaignsApi()

apiContact.setApiKey(
  Brevo.ContactsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
)

apiCampaign.setApiKey(
  Brevo.EmailCampaignsApiApiKeys.apiKey,
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
