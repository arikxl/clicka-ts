import { Link } from 'react-router'

import { colors } from '../utils/utils'
import type { Post } from './PostList'
import Avatar from 'boring-avatars'


interface Props {
    post: Post
}


const PostPreview = ({ post }: Props) => {


    return (
        <figure className='relative group'>
            <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-pink-600 to-purple-600 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none"></div>
            <Link to={`/post/${post.id}`} className="block relative z-10">
                <div style={{ backgroundImage: `URL(${post.img_url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
                    className="background-cover w-80 h-70 bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] text-white flex flex-col justify-between overflow-hidden transition-colors duration-300 group-hover:bg-gray-800">
                    {/* Header: Avatar and Title */}
                    <div className="flex items-center space-x-2  p-2 ">
                        <Avatar  className='cursor-pointer'
                            name={post.author} colors={colors} variant="beam" size={40} />
                        <div className="flex flex-col flex-1 ">
                            <div className="text-[20px] leading-[22px] font-semibold">
                                {post.title}
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-around items-center bg-black/50 w-full">
                        <span className="text-xl h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
                            🩷 <span className="ml-2">{post.like_count ?? 0}</span>
                        </span>
                        <span className="text-xl h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
                            💬 <span className="ml-2">{post.comment_count ?? 0}</span>
                        </span>
                    </div>


                </div>
            </Link>
        </figure>
    )
}

export default PostPreview