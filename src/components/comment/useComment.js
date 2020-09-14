// database
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from '../../init-firebase'
// auth
import { useAuth } from '../auth'

// Provider hook that creates auth object and handles state
export const useComment = () => {
  const { user } = useAuth()

  const create = (postId, comment) => {
    return db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        username: user.displayName,
        ownerUid: user.uid,
        text: comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((response) => {
        return { success: true }
      })
      .catch((error) => {
        return { success: false, error }
      })
  }

  const getCollection = (postId, setValues) => {
    console.log('commentlist')
    return db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        setValues(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data(),
          }))
        )
      })
  }

  // Return post methods
  return {
    create,
    getCollection,
  }
}
