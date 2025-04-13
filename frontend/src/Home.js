import DisplayPolls from "./DisplayPolls";
import useFetch from "./UseFetch";

const Home = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { data, err, isPending } = useFetch(`${baseUrl}/polls/`);

  return (
    <div>
      {!err && isPending && <div>Loading...</div>}
      {data && <DisplayPolls polls={data} />}
      {err && <div>{err}</div>}{" "}
    </div>
  );
};

export default Home;
