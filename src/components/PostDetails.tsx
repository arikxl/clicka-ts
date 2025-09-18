import { useQuery } from "@tanstack/react-query";


import Title from "./Title";
import LikeBtn from "./btns/LikeBtn";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";


interface Props {
  postId: number
}

const fetchPostById = async (postId: number): Promise<Post> => {

  const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (error) throw new Error(error.message);

  return data as Post;
}


const PostDetails = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId)
  })

  console.log(data)


  if (isLoading) return <div>Loading Posts...</div>

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 flex">

      <div className="flex-1">

        <Title>
          {data?.title}
        </Title>

        <p className="text-gray-400">
          {data?.content}
        </p>

        <LikeBtn postId={postId} />
      </div>

      <div className="flex-1">
        <img src={data?.img_url} alt={data?.title} className="mt-4 rounded object-cover w-full h-82" />
        <p className="text-gray-500 text-sm mt-10">
          Posted on: {new Date(data!.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default PostDetails