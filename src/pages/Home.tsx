import PostList from "../components/PostList";
import Title from "../components/Title";

type Props = {}



const Home = (props: Props) => {
  return (
    <div className="pt-10">
      <Title>
        Recent Posts
      </Title>
      <div>
        <PostList />
      </div>
    </div>
  )
}


export default Home;