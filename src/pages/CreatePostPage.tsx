import React from 'react'
import CreatePostForm from '../components/CreatePostForm'

type Props = {}

const CreatePostPage = (props: Props) => {
  return (
      <div>
          <h2>Create New Post </h2>
          <CreatePostForm />
    </div>
  )
}

export default CreatePostPage