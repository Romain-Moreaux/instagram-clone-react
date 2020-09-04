import { useState, useContext, useEffect } from 'react'
import authContext from './context'
import { auth } from '../../init-firebase'

// Provider hook that creates auth object and handles state
export const usePost = () => {
  const createPost = () => {}
  const deletePost = () => {}
  const updatePost = () => {}

  // Return post methods
  return {
    createPost,
    deletePost,
    updatePost,
  }
}
