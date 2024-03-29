import {
  fetchEvents,
  fetchAllEvents,
  fetchEventById,
  createEvent,
} from './fetchEvents'

import { createPerson, fetchPerson, fetchSpeakers } from './fetchPerson'
import { updateField, addFileToStorage } from './fetchFields'

import {
  fetchPrograms,
  createProgram,
  updateProgram,
  updateFieldProgram,
  fetchProgram,
} from './fetchPrograms'

import { fetchTopics, fetchTopic, createTopic } from './fetchTopics'
import { createSponsor, fetchSponsors } from './fetchSponsors'

export {
  //Events crud
  fetchEvents,
  fetchAllEvents,
  fetchEventById,
  createEvent,
  //Persons crud
  fetchPerson,
  fetchSpeakers,
  createPerson,
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
  //Sponsors crud
  createSponsor,
  fetchSponsors,
  //Fields crud
  updateField,
  addFileToStorage,
}
