import React from 'react'
import CreatePostForm from '../components/CreatePostForm'
import Title from '../components/Title'

type Props = {}

const CreatePostPage = (props: Props) => {
  return (
    <div className='pt-10'>
      <Title>
        Create New Post
      </Title>
          <CreatePostForm />
    </div>
  )
}

export default CreatePostPage