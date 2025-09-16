import PostList from "../components/PostList";

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="pt-10">
      <h2 className='text-center bg-clip-text text-transparent mb-6 text-6xl font-bold bg-gradient-to-r from-purple-500 to-[hotpink]'>Recent Posts</h2>

      <h2 className="">Recent Posts</h2>
      <div>
        <PostList />
      </div>
    </div>
  )
}


export default Home;