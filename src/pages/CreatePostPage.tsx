import CreatePostForm from '../components/CreatePostForm'
import Title from '../components/Title'


const CreatePostPage = () => {
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