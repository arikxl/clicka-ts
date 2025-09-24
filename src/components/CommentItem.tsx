import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from './btns/Button';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase-client';
import type { Comment } from './CommentSection';

interface Props {
    comment: Comment & {
        children?: Comment[]
    };
    postId: number;
}

const createReply = async (replyContent: string, postId: number, parentCommentId: number, userId?: string, author?: string) => {
    if (!userId || !author) throw new Error('Login to Reply!');

    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: replyContent,
        parent_comment_id: parentCommentId,
        user_id: userId,
        author: author
    });
    if (error) throw new Error(error.message);
}


const CommentItem = ({ comment, postId }: Props) => {

    const [showReply, setShowReply] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>('');

    const { user } = useAuth();
    const queryClient = useQueryClient()


    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (replyContent: string) =>
            createReply(replyContent, postId, comment.id, user?.id, user?.user_metadata?.name),
        onSuccess: () => {
            setReplyText('');
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            setShowReply(false)
        }
    })


    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText) return;
        mutate(replyText)

    }


    return (
        <div className='pl-4 border-l border-white/10'>
            <div className='mb-1'>
                <div className='flex items-center space-x-2'>
                    <span className='text-sm font-bold text-purple-500'>{comment.author}</span>
                    <span className='text-xs text-gray-500'>{new Date(comment.created_at).toLocaleString()}</span>

                </div>


                <p className='text-gray-300'>{comment.content}</p>

                {user && (
                    <button onClick={() => setShowReply((prev) => !prev)}
                        className='text-[hotpink] text-sm -mt-1'
                    >
                        <span className='cursor-pointer'> {showReply ? 'Cancel' : 'Reply'} </span>

                    </button>
                )}
            </div>

            {showReply && user && (
                <form onSubmit={handleReplySubmit} className='mb-8'>
                    <textarea rows={2}
                        value={replyText}
                        className="mb-2 w-full border border-white/50 bg-transparent p-2 rounded"
                        placeholder="Reply..."
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button disabled={!replyText} type="submit">
                        {
                            isPending
                                ? ('Sending...')
                                : (replyText ? 'Reply' : 'Write Something')
                        }
                    </Button>

                    {isError && <p className="text-red-500">Error Replying! ({error.message}) </p>}
                </form>
            )}


            {comment.children && comment.children.length > 0 && (
                <div>
                    <button onClick={() => setIsCollapsed((prev) => !prev)}>
                        <span className='cursor-pointer'>
                            {isCollapsed ? <>&and;</> : <>&or;</>}

                        </span>
                    </button>

                    {!isCollapsed && (

                        <div className='space-y-2'>
                            {comment.children.map((child, idx) => (
                                <CommentItem key={idx} comment={child} postId={postId} />
                            ))}
                        </div>
                    )}

                </div>
            )}

        </div>
    )
}

export default CommentItem