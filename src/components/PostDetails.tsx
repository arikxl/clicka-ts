import { useQuery } from "@tanstack/react-query";


import Title from "./Title";
import LikeBtn from "./btns/LikeBtn";
import CommentSection from "./CommentSection";
import { supabase } from "../supabase-client";
import type { Post } from "./PostList";
import { Link } from "react-router";


interface Props {
  postId: number
}

const fetchPostById = async (postId: number): Promise<Post> => {

  const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (error) throw new Error(error.message);
  return data as Post;
}

const fetchGroupDetails = async (groupId: number) => {
  const { data, error } = await supabase
    .from("groups")
    .select("name")
    .eq('id', groupId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}


const PostDetails = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId)
  })


  const groupId = data?.group_id;

  const { data: groupData, isLoading: isGroupLoading } = useQuery({
    queryKey: ["group", groupId],
    enabled: !!groupId && groupId !== 'null',
    queryFn: () => fetchGroupDetails(groupId!)
  });

  // console.log(groupData)
  // console.log(data)


  // if (isLoading ) return <div>Loading Posts...</div>
  if (isLoading || isGroupLoading) return <div>Loading Posts...</div>

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 ">


      <Title>
        {data?.title}
      </Title>

      <div className="flex gap-6 flex-col md:flex-row">


      <div className="flex-1 order-2 md:order-1">

        <p className="text-gray-400 mb-10">
          {data?.content}
        </p>

        <LikeBtn postId={postId} />
        <CommentSection postId={postId} />
      </div>

      <div className="flex-1 md:order-2">
        <p className="text-gray-500 text-sm mt-10">
          Posted on: {new Date(data!.created_at).toLocaleDateString()}

          {
            groupData?.name && (
              <>
                &nbsp;in <Link to={`/group/${groupId}`} className="text-white underline">{groupData?.name}</Link> group
              </>
            )
          }
        </p>
        <img src={data?.img_url} alt={data?.title} className=" mt-4 rounded object-cover w-full" />
      </div>
      </div>
    </div>
  )
}

export default PostDetails