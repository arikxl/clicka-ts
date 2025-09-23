import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabase-client"

interface Props {
    postId: number;
}

interface Like {
    id: number;
    post_id: number;
    user_id: string;
    like: number;
}


const likePost = async (likes: number, postId: number, userId: string) => {


    const { data: existingLike } = await supabase.from('likes').select('*').eq('post_id', postId).eq('user_id', userId).maybeSingle();

    if (existingLike) {
        if (existingLike.like === likes) {
            const { error } = await supabase.from('likes').delete().eq('id', existingLike.id);
            if (error) throw new Error(error.message);
        } else {
            const { error } = await supabase.from('likes').update({ like: likes }).eq('id', existingLike.id)
            if (error) throw new Error(error.message)
        }
    } else {
        const { error } = await supabase.from('likes').insert({ post_id: postId, user_id: userId, like: likes })

        if (error) throw new Error(error.message)
    }
}

const fetchLikes = async (postId: number): Promise<Like[]> => {
    const { data, error } = await supabase.from('likes').select('*').eq('post_id', postId);

    if (error) throw new Error(error.message)


    return data as Like[];
}

const LikeBtn = ({ postId }: Props) => {

    const { user } = useAuth();
    const queryClient = useQueryClient()

    const { data: likes, isLoading, error } = useQuery<Like[], Error>({
        queryKey: ['likes', postId],
        queryFn: () => fetchLikes(postId),
        refetchInterval: 5000

    })


    const { mutate } = useMutation({
        mutationFn: (likes: number) => {

            if (!user) {
                window.alert('Login to Like')
                throw new Error('Login to Like!')
            }
            return likePost(likes, postId, user.id)

        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['likes', postId] })
        }
    })


    if (isLoading) return <div>Loading Likes...</div>

    if (error) return <div>Error: {error.message}</div>;

    const likesCount = likes?.filter((l) => l.like === 1).length || 0;
    const dislikesCounts = likes?.filter((l) => l.like === -1).length || 0;
    const userVote = likes?.find((l) => l.user_id === user?.id)?.like;


    return (
        <div className="mb-6">
            <button onClick={() => mutate(1)}
                className={`px-3 py-1 cursor-pointer rounded transition-colors duration-150 ${userVote === 1 ? 'bg-[hotPink] text-white' : 'bg-gray-200 text-black'}`}
            >
                {userVote === 1 ? '🤍' : '❤️'} {likesCount}
            </button>
            &nbsp;
            <button onClick={() => mutate(-1)}
                className={`px-3 py-1 cursor-pointer rounded transition-colors duration-150 ${userVote === -1 ? 'bg-slate-700 text-white' : 'bg-gray-200 text-black'}`}

            >
                💔 {dislikesCounts}
            </button>
        </div>
    )
}

export default LikeBtn