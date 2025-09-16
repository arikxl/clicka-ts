import React from 'react'
import CreatePostForm from '../components/CreatePostForm'

type Props = {}

const CreatePostPage = (props: Props) => {
  return (
      <div className='pt-20'>
      <h2 className='text-center bg-clip-text text-transparent mb-6 text-6xl font-bold bg-gradient-to-r from-purple-500 to-[hotpink]'>Create New Post </h2>
          <CreatePostForm />
    </div>
  )
}

export default CreatePostPage