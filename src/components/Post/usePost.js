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
    db.collection('posts').add({
      caption: caption,
      imageUrl: url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      author: user?.displayName,
      ownerUid: user?.uid,
    })
  }

  const getList = (setValues) => {
    console.log('Getlist')
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

  const get = async (postId) => {
    let response = await db
      .collection('posts')
      .doc(postId)
      .onSnapshot(async (snapshot) => {
        console.log(snapshot)
        return await snapshot.data()
      })
  }

  const remove = () => {}
  const update = () => {}

  // Return post methods
  return {
    get,
    getList,
    create,
    delete: remove,
    update,
  }
}
