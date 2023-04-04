import { FirebaseService } from '../../../src/common/firebase/firebase.service'
import { getAuthHeader, setUserRoles } from '../auth'
import { gqlClient } from '../config'
import { locationStats } from '../data-convert/locationStats-final'
import { properties } from '../data-convert/properties-final'

import { admins, agents, buyers, sellers } from '../data/user'
import {
  CreateBuyerDocument,
  CreateSellerDocument,
  CreateAgentDocument,
  CreatePropertyDocument,
  CreateLocationStatsDocument,
} from '../generated/graphql'

export const createAgentDocuments = async () => {
  const firebaseService = new FirebaseService()
  await setUserRoles({ firebaseService, roles: ['seller'] })
  for (const { uid, name } of agents) {
    const { authorization } = await getAuthHeader(uid)

    const newUser = await gqlClient.request(
      CreateAgentDocument,
      {
        createAgentInput: { uid },
      },
      { authorization },
    )
  }
}

export const createSellerDocuments = async () => {
  for (const { uid } of sellers) {
    const { authorization } = await getAuthHeader(uid)

    const newUser = await gqlClient.request(
      CreateSellerDocument,
      {
        createSellerInput: { uid },
      },
      { authorization },
    )
  }
}

export const createBuyerDocuments = async () => {
  for (const { uid } of buyers) {
    const { authorization } = await getAuthHeader(uid)

    const newUser = await gqlClient.request(
      CreateBuyerDocument,
      {
        createBuyerInput: { uid },
      },
      { authorization },
    )
  }
}

export const createPropertyDocuments = async () => {
  for (const property of properties) {
    const { authorization } = await getAuthHeader(property.sellerUid)

    const newProperty = await gqlClient.request(
      CreatePropertyDocument,
      {
        createPropertyInput: property,
      },
      { authorization },
    )
  }
}
export const createLocationStatsDocuments = async () => {
  const adminUid = admins[0].uid
  for (const locationStat of locationStats) {
    const { authorization } = await getAuthHeader(adminUid)

    const newProperty = await gqlClient.request(
      CreateLocationStatsDocument,
      {
        createLocationStatsInput: locationStat,
      },
      { authorization },
    )
  }
}
