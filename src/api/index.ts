import {
  fetchEvents,
  fetchAllEvents,
  fetchEventById,
  createEvent,
  updateEvent,
} from './fetchEvents'

import {
  createPerson,
  fetchPerson,
  fetchSpeakers,
  fetchPersonById,
  updatePerson,
  fetchPersonsInEvent,
  fetchPersonsNotInEvent,
} from './fetchPerson'

import { updateField, addFileToBucket } from './fetchFields'

import {
  fetchPrograms,
  createProgram,
  updateProgram,
  updateFieldProgram,
  fetchProgram,
} from './fetchPrograms'

import {
  fetchTopics,
  fetchTopic,
  createTopic,
  updateTopic,
} from './fetchTopics'

import {
  createSponsor,
  fetchSponsors,
  updateSponsor,
  fetchSponsor,
} from './fetchSponsors'

import { fetchCountries, fetchAllCountries } from './fetchCountries'

export {
  //Events crud
  fetchEvents,
  fetchAllEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  //Persons crud
  fetchPerson,
  fetchSpeakers,
  createPerson,
  fetchPersonById,
  updatePerson,
  fetchPersonsInEvent,
  fetchPersonsNotInEvent,
  //Programs crud
  fetchProgram,
  fetchPrograms,
  createProgram,
  updateProgram,
  updateFieldProgram,
  //Topics crud
  fetchTopics,
  fetchTopic,
  createTopic,
  updateTopic,
  //Sponsors crud
  createSponsor,
  fetchSponsors,
  updateSponsor,
  fetchSponsor,
  //Fields crud
  updateField,
  addFileToBucket,
  //Countries
  fetchCountries,
  fetchAllCountries,
}
