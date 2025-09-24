import Title from './Title';
import { useQuery } from '@tanstack/react-query';
import type { Post } from './PostList';
import { supabase } from '../supabase-client';
import PostPreview from './PostPreview';

interface Props {
    groupId: number;
}

interface PostWithGroup extends Post {
    groups: {
        name: string
    }
}


const fetchGroupPosts = async (groupId: number): Promise<PostWithGroup[]> => {

    const { data, error } = await supabase.from("posts").select("*, groups(name)").eq('group_id', groupId).order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data as PostWithGroup[];
}

const fetchGroupDetails = async (groupId: number) => {
    const { data, error } = await supabase
        .from("groups")
        .select("name")
        .eq('id', groupId)
        .single(); // .single() ensures we get one object, not an array

    if (error) throw new Error(error.message);
    return data;
}


const GroupDisplay = ({ groupId }: Props) => {


    const { data: groupData, isLoading: isGroupLoading } = useQuery({
        queryKey: ["group", groupId], // Unique key for this query
        queryFn: () => fetchGroupDetails(groupId)
    });


    const { data, error, isLoading } = useQuery<PostWithGroup[], Error>({ queryKey: ["groupPosts", groupId], queryFn: () => fetchGroupPosts(groupId) })

    if (isLoading || isGroupLoading) return <div>Loading Group...</div>

    if (error) return <div>Error: {error.message}</div>;


    return (
        <div>

            <Title>
                {groupData?.name} Group Posts
            </Title>


            {
                data && data.length > 0
                    ? (
                        <div className='flex flex-wrap gap-6 justify-center'>
                            {
                                data.map((post) => (<PostPreview post={post } key={post.id}/>))
                            }
                        </div>
                    )
                    : (<p className='text-center text-gray-400'>No posts in this group yet.</p>)
            }

        </div>
    )
}

export default GroupDisplay