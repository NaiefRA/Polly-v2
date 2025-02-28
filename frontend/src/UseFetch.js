import { useEffect, useState } from "react";

const useFetch = (link) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    fetch(link)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setData(result);
        setIsPending(false);
        setErr(null);
      })
      .catch((err) => {
        setErr(err.message);
        console.log(err);
      });
  }, []);

  return { data, err, isPending };
};

export default useFetch;
