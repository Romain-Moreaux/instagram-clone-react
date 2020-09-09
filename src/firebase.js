import { db } from './init-firebase'

export const generateUserDocument = async (user, collectionName) => {
  console.log('generateUserDocument')
  if (!user) return
  try {
    const userRef = db.collection(collectionName).doc(user.uid)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
      console.log('Creating user document...')
      const { email, displayName } = user
      await userRef.set({
        displayName,
        email,
        followers: [],
        likes: [],
      })

      return getUserDocument(user.uid)
    }
  } catch (error) {
    console.error('Error while generating user document', error)
  }
}

const getUserDocument = async (uid) => {
  console.log('getUserDocument')
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
