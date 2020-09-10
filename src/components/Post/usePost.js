// database
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from '../../init-firebase'
// auth
import { useAuth } from '../auth'

// Provider hook that creates auth object and handles state
export const usePost = () => {
  const { user } = useAuth()

  const create = (caption, url) => {
    return db
      .collection('posts')
      .add({
        caption: caption,
        imageUrl: url,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        author: user?.displayName,
        ownerUid: user?.uid,
      })
      .then((response) => {
        return { success: true }
      })
      .catch((error) => {
        return { success: false, error }
      })
  }

  const list = (setValues) => {
    console.log('list')
    return db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setValues(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }

  const single = (postId, setValue) => {
    return db
      .collection('posts')
      .doc(postId)
      .onSnapshot(async (snapshot) => {
        console.log('snapshot', snapshot)
        setValue(snapshot.data())
      })
  }

  const remove = (postId) => {
    return db
      .collection('posts')
      .doc(postId)
      .delete()
      .then(function (response) {
        return { success: true }
      })
      .catch(function (error) {
        return { success: false, error }
      })
  }
  const update = () => {}

  // Return post methods
  return {
    single,
    list,
    create,
    delete: remove,
    update,
  }
}
