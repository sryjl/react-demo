import { useState, useEffect } from "react";
import Axios from "axios";

const useFetch = (url, meth) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const axioser = (url) => Axios.get(url).then((res) => res.data);

  const [state, setState] = useState({ data: null, isloading: false });
  useEffect(() => {
    const fn = async () => {
      setState({ data: null, isloading: true });
      let data;
      if (meth === "fetcher") {
        data = await fetcher(url);
      } else if (meth === "axioser") {
        data = await axioser(url);
      }
      setState({ data, isloading: false });
      console.log(data);
    };
    fn();
  }, [url, meth]);
  return state;
};

export default useFetch;
