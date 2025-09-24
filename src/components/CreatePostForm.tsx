import React, { useRef, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';


import Button from './btns/Button'
import UploadImgBtn from './btns/UploadImgBtn';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase-client';
import { fetchGroups, type Group } from './GroupList';

interface PostInput {
    title: string;
    content: string;
    user_avatar_url: string | null;
    group_id?: number | null;
    author: string | null;
}

const createPost = async (post: PostInput, imgFile: File) => {
    const sanitizedName = imgFile.name.replace(/[^a-zA-Z0-9-]/g, '');
    const sanitizedTitle = post.title.replace(/[^a-zA-Z0-9-]/g, '');

    // const filePath = `${File.name}-${Date.now()}-${post.title}`;
    const filePath = `${sanitizedTitle}-${Date.now()}-${sanitizedName}`;
    const { error: uploadError } = await supabase.storage.from('post-images').upload(filePath, imgFile)

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrlData } = supabase.storage.from('post-images').getPublicUrl(filePath);

    const { data, error } = await supabase.from('posts').insert({ ...post, img_url: publicUrlData.publicUrl });


    if (error) throw new Error(error.message)

    return data
}

const CreatePostForm = () => {
    const navigate = useNavigate();


    const fileInputRef = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [groupId, setGroupId] = useState<number | null>(null);

    const { user } = useAuth();
    // console.log(user?.user_metadata.name)

    const { data: groupData } = useQuery<Group[], Error>({ queryKey: ["groups"], queryFn: fetchGroups })


    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: { post: PostInput, imgFile: File }) => {
            return createPost(data.post, data.imgFile)
        },
        onSuccess: () => {
            // This code will run only after a successful mutation
            console.log("Post created successfully! Navigating to homepage.");
            navigate('/');
        },
    })

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile) return
        mutate({ post: { title, content, author:user?.user_metadata.name, user_avatar_url: user?.user_metadata.avatar_url || null , group_id:groupId}, imgFile: selectedFile })
    }


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }


    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGroupId(value ? +value : null)
    }

    return (
        <form onSubmit={handleSubmitForm} className='max-w-2xl mx-auto space-y-4'>

            <div>
                <input type="file" id='img' required
                    accept='image/*' hidden
                    onChange={handleFileChange}
                    className='w-full text-gray-200'
                    ref={fileInputRef}
                />
                <UploadImgBtn onClick={handleUploadButtonClick} />
            </div>

            <div className=''>

                <input id='title' required type='text'
                    placeholder='Post Title...'
                    className='w-full border border-white/50 bg-transparent p-2 rounded'
                    onChange={(e) => setTitle(e.target.value)}
                    ref={titleInputRef}

                />
            </div>

            <div>
                <textarea id="content" required rows={5}
                    placeholder='Tell me more...'
                    onChange={(e) => setContent(e.target.value)}
                    className='mb-6 w-full border border-white/50 bg-transparent p-2 rounded'
                    ref={contentInputRef}
                />
            </div>


            <div>
                <label htmlFor="">Select Group: </label>
                <select name="" id="group"
                    onChange={handleGroupChange}
                    className='bg-black'
                >
                    <option value="">
                        -- Choose a Group --
                    </option>
                    {groupData?.map((group) => (
                        <option  key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>



            <Button type="submit" >
                {isPending ? 'Posting...' : 'Create Post'}
            </Button>


            {isError && <p className='text-red-500'>Try Again...</p>}
        </form>
    )
}

export default CreatePostForm