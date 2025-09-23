import Title from '../components/Title'
import CreateGroupForm from '../components/CreateGroupForm'


const CreateGroupPage = () => {
  return (
      <div className='pt-10'>
          <Title>
              Build a New Group
          </Title>
          <CreateGroupForm />
      </div>
  )
}

export default CreateGroupPage