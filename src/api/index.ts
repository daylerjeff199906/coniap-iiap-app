import {
  fetchEvents,
  fetchAllEvents,
  fetchEventById,
  createEvent,
} from './fetchEvents'

import { createPerson, fetchPerson } from './fetchPerson'
import { updateField } from './fetchFields'

import {
  fetchPrograms,
  createProgram,
  updateProgram,
  updateFieldProgram,
  fetchProgram,
} from './fetchPrograms'

import { fetchTopics, createTopic } from './fetchTopics'
import { createSponsor, fetchSponsors } from './fetchSponsors'

export {
  //Events crud
  fetchEvents,
  fetchAllEvents,
  fetchEventById,
  createEvent,
  //Persons crud
  fetchPerson,
  createPerson,
  //Programs crud
  fetchProgram,
  fetchPrograms,
  createProgram,
  updateProgram,
  updateFieldProgram,
  //Topics crud
  fetchTopics,
  createTopic,
  //Sponsors crud
  createSponsor,
  fetchSponsors,
  //Fields crud
  updateField,
}
