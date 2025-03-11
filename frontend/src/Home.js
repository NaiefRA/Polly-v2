import DisplayPolls from "./DisplayPolls";
import useFetch from "./UseFetch";

const Home = () => {
  const { data, err, isPending } = useFetch(
    "https://polly-v2.onrender.com/polls/"
  );

  return (
    <div>
      {!err && isPending && <div>Loading...</div>}
      {data && <DisplayPolls polls={data} />}
      {err && <div>{err}</div>}{" "}
    </div>
  );
};

export default Home;
