import axios from 'axios'
import { FirebaseService } from '../../src/common/firebase/firebase.service'
import { Role } from '../../src/common/types'
import { admins, creds } from './data/user'

const usersToken = {}

export const getAuthHeader = async (
  uid: string,
): Promise<{ uid: string; authorization: string }> => {
  const user = creds.find((cred) => cred.uid === uid)

  if (usersToken[uid]) {
    return usersToken[uid]
  }

  const firebaseUser = await axios.post(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.firebaseAPIKey}`,
    user,
  )

  const token = firebaseUser.data.idToken
  const userId = firebaseUser.data.localId

  const obj = { uid: userId, authorization: `Bearer ${token}` }
  usersToken[uid] = obj

  console.log('Obj: ', obj)

  return obj
}

export const setFirebaseRole = async ({
  firebaseService,
  uid,
  roles,
}: {
  firebaseService: FirebaseService
  uid: string
  roles: Role[]
}) => {
  await firebaseService.getAuth().setCustomUserClaims(uid, {
    roles,
  })

  console.log(`Successfully set ${roles}`)
}

export const setUserRoles = async ({
  firebaseService,
  roles,
}: {
  firebaseService: FirebaseService
  roles: Role[]
}) => {
  for (const user of admins) {
    await setFirebaseRole({
      firebaseService,
      roles: roles,
      uid: user.uid,
    })
  }
}
