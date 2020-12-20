import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useForm = (inintialValue) => {
  const [form, setForm] = useState(inintialValue);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return [form, handleChange];
};

const Tool = () => {
  useEffect(() => {
    //componentDidMount
    const focusOnUsername = (e) => {
      if (e.keyCode === 191) {
        document.querySelector('input[name="username"]').focus();
      }
    };
    window.addEventListener("keyup", focusOnUsername);
    //componentWillUnmount
    return () => {
      window.removeEventListener("keyup", focusOnUsername);
    };
  }, []);
  //dependency arry  只有当数组内的事物发生变化时会调用该函数
  return <h1>工具人</h1>;
};

function App() {
  const [form, handleChange] = useForm({ username: "yangyu", password: "123" });
  const [showTool, setShowTool] = useState(false);

  const [number, setNumber] = useState(1);

  const { data: pokemon, isloading } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${number}/`,
    "fetcher"
  );

  return (
    <>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <div>
        <button onClick={() => setShowTool(!showTool)}>召唤工具人</button>
      </div>
      <div>
        <button onClick={() => setNumber(number + 1)}>召唤新宝可梦</button>
      </div>
      {showTool && <Tool />}
      {!isloading ? (
        <>
          <h1>{pokemon?.name}</h1>
          <img src={pokemon?.sprites?.front_default} alt=""></img>
        </>
      ) : (
        <h1>我是谁</h1>
      )}
    </>
  );
}

export default App;
