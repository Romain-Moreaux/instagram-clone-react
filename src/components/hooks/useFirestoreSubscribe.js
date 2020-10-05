import { useReducer, useEffect } from 'react'
import { useRefCompare } from './useRefCompare'

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

export function useFirestoreSubscribe(query) {
  // console.log('useFirestoreSubscribe', query)

  // Start with an "idle" status if query is falsy
  const initialState = {
    status: query ? 'loading' : 'idle',
    data: undefined,
    error: undefined,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Get cached Firestore query object with useRefCompare to avoid unnecessary re-render
  const queryCached = useRefCompare(query, (prevQuery) => {
    // Use built-in Firestore isEqual method to determine if "equal"
    return prevQuery && query && query.isEqual(prevQuery)
  })

  useEffect(() => {
    // Return early if query is falsy and reset to "idle"
    if (!queryCached) {
      dispatch({ type: 'idle' })
      return
    }

    dispatch({ type: 'loading' })

    // Subscribe to query with onSnapshot and returns an unsubscribe function
    return queryCached.onSnapshot(
      (response) => {
        // Get data for collection or doc
        const data = response.docs
          ? getCollectionData(response)
          : getDocData(response)

        dispatch({ type: 'success', payload: data })
      },
      (error) => {
        dispatch({ type: 'error', payload: error })
      }
    )
  }, [queryCached])

  return state
}

function getDocData(doc) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null
}

function getCollectionData(collection) {
  return collection.docs.map(getDocData)
}
