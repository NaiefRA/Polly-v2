import DisplayPolls from "./DisplayPolls";
import useFetch from "./UseFetch";

const Home = () => {
  const { data, err, isPending } = useFetch("/polls/");

  return (
    <div>
      {!err && isPending && <div>Loading...</div>}
      {data && <DisplayPolls polls={data} />}
      {err && <div>{err}</div>}{" "}
    </div>
  );
};

export default Home;
