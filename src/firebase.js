import { db } from './init-firebase'

export const generateUserDocument = async (user, collectionName) => {
  console.log('generateUserDocument', user)
  if (!user) return
  const userRef = db.collection(collectionName).doc(user.uid)
  const snapshot = await userRef.get()
  console.log('snapshot =>', snapshot.data())

  if (!snapshot.exists) {
    console.log('Snapshot not exist')
    const { email, displayName } = user
    try {
      await userRef.set({
        displayName,
        email,
      })
    } catch (error) {
      console.error('Error creating user document', error)
    }
  }
  return getUserDocument(user.uid)
}

const getUserDocument = async (uid) => {
  if (!uid) return null
  try {
    const userDocument = await db.doc(`subscribers/${uid}`).get()
    return {
      uid,
      ...userDocument.data(),
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}
