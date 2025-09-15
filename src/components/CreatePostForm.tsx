import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';


import Button from './btns/Button'
import { supabase } from '../supabase-client';

interface PostInput{
    title: string;
    content: string
}

const createPost = async  (post: PostInput) => {
    const {data, error } = await supabase.from('posts').insert([post]);

    if (error) throw new Error(error.message)
    
    return data
}

const CreatePostForm = () => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const { mutate } = useMutation({mutationFn: createPost })

    const handleSubmitForm = (e:React.FormEvent) => {
        e.preventDefault()
        mutate({title, content})
    }

    return (
        <form onSubmit={handleSubmitForm}>
            <div>

                <input id='title' required type='text'
                    placeholder='Post Title...'
                    className=''
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <textarea id="content" required rows={5}
                    placeholder='Tell me more...'
                    onChange={(e) => setContent(e.target.value)}

                />
            </div>
            <Button  type="submit" >Post</Button>
        </form>
    )
}

export default CreatePostForm