import { useMutation } from "@tanstack/react-query"


import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabase-client"

interface Props {
    postId: number;
}


const likePost = async (likes: number, postId: number, userId: string) => {
    const {error} = await supabase.from('likes').insert({ post_id: postId, user_id: userId, like: likes })

        if(error) throw new Error(error.message)
}

const LikeBtn = ({ postId }: Props) => {

    const { user } = useAuth();
    const { mutate } = useMutation({
        mutationFn: (likes: number) => {

            if(!user) throw new Error('Login to Like!')
            return likePost(likes, postId, user.id)

        }
    })


    return (
        <div>
            <button onClick={() => mutate(1)}>like</button>
            |||
            <button onClick={() => mutate(-1)}>DISSlike</button>
        </div>
    )
}

export default LikeBtn