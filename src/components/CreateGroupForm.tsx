import React, { useState } from 'react'
import Button from './btns/Button'
import { useNavigate } from 'react-router'
import {  useMutation, useQueryClient } from '@tanstack/react-query'


import { supabase } from '../supabase-client'

interface GroupInput {
    name: string,
    desc: string,
}


const buildGroup = async (group: GroupInput) => {
    const { error, data } = await supabase.from('groups').insert( group );
    if (error) throw new Error(error.message);
    return data;
}




const CreateGroupForm = () => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient()


    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: buildGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
            navigate('/groups')
        }
    })

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ name, desc })
    }


    // if (isLoading) return <div>Loading Comments...</div>

    // if (commentsListError) return <div>Error: {commentsListError.message}</div>;


    return (
        <form onSubmit={handleSubmitForm} className='max-w-2xl mx-auto space-y-4'>
            <div className=''>
                <input id='name' required type='text'
                    placeholder="Group's name..."
                    className='w-full border border-white/50 bg-transparent p-2 rounded'
                    onChange={(e) => setName(e.target.value)}
                //   ref={titleInputRef}

                />
            </div>

            <div>
                <textarea id="desc" required rows={3}
                    placeholder='Tell me more about the new group...'
                    onChange={(e) => setDesc(e.target.value)}
                    className='mb-6 w-full border border-white/50 bg-transparent p-2 rounded'
                //   ref={contentInputRef}

                />
            </div>



            <Button type="submit" >
                {isPending ? 'Building...' : 'Build a Group'}
            </Button>

            {isError && <p className="text-red-500">Error Building a Group!! ({error.message}) </p>}

        </form>
    )
}

export default CreateGroupForm