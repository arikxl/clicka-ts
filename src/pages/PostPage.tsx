import PostDetails from '../components/PostDetails'
import { useParams } from 'react-router';


const PostPage = () => {

    const { id } = useParams<{ id: string }>(); 


  return (
      <div className="pt-10">
          {/* <Title>
              Recent Posts
          </Title> */}
          <div>
              <PostDetails postId={Number(id) } />
          </div>
      </div>
  )
}

export default PostPage