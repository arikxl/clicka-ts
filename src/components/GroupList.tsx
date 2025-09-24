/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';


import { supabase } from '../supabase-client';

export interface Group {
    id: number;
    name: string;
    desc: string;
    created_at: string;
}


export const fetchGroups = async (): Promise<Group[]> => {

    const { data, error } = await supabase.from("groups").select("*").order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data as Group[];
}


const GroupList = () => {



    const { data, error, isLoading } = useQuery<Group[], Error>({ queryKey: ["groups"], queryFn: fetchGroups })

    if (isLoading) return <div>Loading Groups...</div>

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='max-w-5xl mx-auto space-y-4'>
            {/* <div className='flex flex-wrap gap-6 justify-center'> */}
            {
                data?.map((group) => (
                    <div key={group.id} className='border border-white/10 p-4 rounded hover:border-[hotpink] transform transition-colors duration-150 cursor-pointer'>

                        <Link to={`/group/${group.id}`} >
                            <p className='text-2xl font-bold text-purple-500 hover:underline'>{group.name}</p>
                            <p className=' mt-2'>{group.desc}</p>
                            <p className='text-gray-400'>Builded in: {new Date(group!.created_at).toLocaleDateString()}</p>
                        </Link>
                    </div>

                ))
            }
        </div>
    )
}

export default GroupList