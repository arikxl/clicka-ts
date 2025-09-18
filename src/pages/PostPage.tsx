import React from 'react'
import PostDetails from '../components/PostDetails'
import { useParams } from 'react-router';

type Props = {}

const PostPage = (props: Props) => {

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