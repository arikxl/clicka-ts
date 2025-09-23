import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "./btns/Button";
import CommentItem from "./CommentItem";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";

interface Props {
    postId: number;
}

interface NewComment {
    content: string;
    parent_comment_id?: number | null
}

export interface Comment {
    id: number;
    post_id: number;
    parent_comment_id: number | null;
    content: string;
    user_id: string;
    created_at: string;
    author: string;
}

const createComment = async (newComment: NewComment, postId: number, userId?: string, author?: string) => {
    if (!userId || !author) throw new Error('Login to Comment!');

    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: newComment.content,
        parent_comment_id: newComment.parent_comment_id || null,
        user_id: userId,
        author: author
    });
    if (error) throw new Error(error.message);
}


const fetchComments = async (postId: number): Promise<Comment[]> => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true });

    if (error) throw new Error(error.message)
    return data as Comment[];
}


const CommentSection = ({ postId }: Props) => {


    const [newCommentText, setNewCommentText] = useState<string>('');

    const { user, loginWithGoogle } = useAuth();
    const queryClient = useQueryClient()

    const { data: comments, isLoading, error: commentsListError } = useQuery<Comment[], Error>({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
        refetchInterval: 5000
    })

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (newComment: NewComment) =>
            createComment(newComment, postId, user?.id, user?.user_metadata?.name),
        onSuccess: () => {
            setNewCommentText('');
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })

        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText) return;

        mutate({ content: newCommentText, parent_comment_id: null })
    }


    const buildCommentTree = (flatComments:Comment[]):(Comment & {children?:Comment[]})[] => {
        const map = new Map<number, Comment & { children?: Comment[] }>();
        const roots: (Comment & { children?: Comment[] })[] = [];

        flatComments.forEach((comment) => {
            map.set(comment.id, {...comment, children:[]})
        })

        flatComments.forEach((comment) => {
            if (comment.parent_comment_id) {
                const parent = map.get(comment.parent_comment_id);
                if (parent) {
                    parent.children!.push(map.get(comment.id)!)
                }
            } else {
                roots.push(map.get(comment.id)!)
           }
        })


        return roots;
    }


    if (isLoading) return <div>Loading Comments...</div>

    if (commentsListError) return <div>Error: {commentsListError.message}</div>;


    const commentTree = comments ? buildCommentTree(comments) : [];

    return (
        <section>
            <h3 className="">Comments:</h3>

            <div className="space-y-4">

                {commentTree.map((comment, idx) => (
                    <CommentItem key={idx} comment={comment} postId={postId } />
                ))}


            </div>







            {
                user
                    ? (
                        <form onSubmit={handleSubmit}>
                            <textarea rows={3}
                                value={newCommentText}
                                className="mb-6 w-full border border-white/50 bg-transparent p-2 rounded"
                                placeholder="Write a Comment..."
                                onChange={(e) => setNewCommentText(e.target.value)}
                            />
                            <Button disabled={!newCommentText} type="submit">
                                {
                                    isPending
                                        ? ('Sending...')
                                        : (newCommentText ? 'Send Comment' : 'Write Something')
                                }
                            </Button>

                            {isError && <p className="text-red-500">Error Commenting! ({error.message}) </p>}
                        </form>


                    )
                    : (
                        <Button onClick={loginWithGoogle}>
                            Login to Comment
                        </Button>)
            }

        </section>
    )
}

export default CommentSection