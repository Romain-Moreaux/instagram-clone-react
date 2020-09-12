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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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

  const getCollection = (setValues) => {
    console.log('list')
    return db
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        setValues(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }

  const getSnapshot = async (postId) => {
    try {
      return db
        .collection('posts')
        .doc(postId)
        .then((response) => {
          return { data: response }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getDoc = (postId) => {
    console.log('getDocument')
    return db
      .collection('posts')
      .doc(postId)
      .get()
      .then((doc) => {
        console.log('doc', doc)
        if (doc.exists) {
          return {
            success: true,
            data: doc.data(),
          }
        } else {
          return {
            success: false,
            error: 'No such document',
          }
        }
      })
      .catch((error) => {
        console.log(error)
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
  const update = async (postId, fields) => {
    console.log('post update')
    return db
      .collection('posts')
      .doc(postId)
      .update({
        ...fields,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((response) => {
        return { success: true }
      })
      .catch((error) => {
        return { success: false, error }
      })
  }

  // const reportInapropriate = (postId) => {}

  // const unfollow = (ownerUid) => {}

  // Return post methods
  return {
    getSnapshot,
    getDoc,
    getCollection,
    create,
    delete: remove,
    update,
  }
}
