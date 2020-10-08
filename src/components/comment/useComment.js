// database
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from '../../init-firebase'
// auth
import { useAuth } from '../auth'
import { useReducer } from 'react'

// Reducer for hook state and actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'idle':
      return { status: 'idle', data: undefined, error: undefined }
    case 'loading':
      return { status: 'loading', data: undefined, error: undefined }
    case 'success':
      return { status: 'success', data: action.payload, error: undefined }
    case 'error':
      return { status: 'error', data: undefined, error: action.payload }
    default:
      throw new Error('invalid action')
  }
}

export const useComment = () => {
  const { user } = useAuth()
  // Start with an "idle" status if query is falsy
  const initialState = {
    status: 'idle',
    data: undefined,
    error: undefined,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const create = async (id, comment) => {
    try {
      const response = await db
        .collection('posts')
        .doc(id)
        .collection('comments')
        .add({
          username: user.displayName,
          ownerUid: user.uid,
          text: comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      dispatch({ type: 'success', payload: response })
    } catch (error) {
      dispatch({ type: 'error', payload: error })
    }

    // return state
  }

  const deleteComment = async (postId, id, comment) => {
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(id)
      .delete()
      .then(function () {
        console.log(`Comment ${id} successfully deleted!`)
      })
      .catch(function (error) {
        console.error(`Error removing comment: ${id} `, error)
      })
  }

  // Return post methods
  return {
    create,
    delete: deleteComment,
    state,
  }
}
