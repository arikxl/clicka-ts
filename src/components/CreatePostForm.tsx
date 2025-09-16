import React, { useRef, useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query';


import Button from './btns/Button'
import { supabase } from '../supabase-client';
import UploadImgBtn from './btns/UploadImgBtn';

interface PostInput{
    title: string;
    content: string
}

const createPost = async  (post: PostInput, imgFile:File) => {
    const sanitizedName = imgFile.name.replace(/[^a-zA-Z0-9-]/g, '');
    const sanitizedTitle = post.title.replace(/[^a-zA-Z0-9-]/g, '');

    // const filePath = `${File.name}-${Date.now()}-${post.title}`;
    const filePath = `${sanitizedTitle}-${Date.now()}-${sanitizedName}`;
    const {error:uploadError} = await supabase.storage.from('post-images').upload(filePath, imgFile)
    
    if (uploadError) throw new Error(uploadError.message);

    const { data:publicUrlData } = supabase.storage.from('post-images').getPublicUrl(filePath);
    
    const { data, error } = await supabase.from('posts').insert({...post, img_url:publicUrlData.publicUrl});
    
    
    if (error) throw new Error(error.message)
    
    return data
}

const CreatePostForm = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate, isPending, isError} = useMutation({
        mutationFn: (data:{post:PostInput, imgFile: File}) => {
        return createPost(data.post, data.imgFile)
    } })

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        if(!selectedFile) return
        mutate({ post: { title, content }, imgFile: selectedFile })
    }


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }


    const handleUploadButtonClick = () => {
        // בודקים שה-ref אכן קיים ומפעילים עליו קליק
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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

            {/* {
                selectedFile && (
                    <img src={ } />
                )
            } */}
           
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


 


            <Button type="submit" > 
                {isPending ? 'Posting...' : 'Create Post'}
            </Button>
            

            {isError && <p className='text-red-500'>Try Again...</p>}
        </form>
    )
}

export default CreatePostForm