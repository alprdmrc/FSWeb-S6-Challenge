import React, { useEffect, useState } from "react";
import axios from "axios";
import Karakter from "./components/Karakter";
import Pagination from "@mui/material/Pagination";

const App = () => {
  const [charactersData, setCharactersData] = useState([]);

  const [page, setPage] = useState(1);
  const charPerPage = 2;
  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/`)
      .then((res) => res.data)
      .catch((err) => console.log("Hata ile karsilasildi >", err))
      .then((data) => {
        console.log("data cekildi >", data);
        setCharactersData(data);
      });
  }, []);

  const handleChange = (evt, val) => {
    setPage(val);
  };

  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  // console.log(charactersData.slice(0, 2));
  // console.log(charactersData.slice(2, 4));
  // console.log(charactersData.slice(4, 6));
  return (
    <div className="App">
      {charactersData &&
        charactersData
          .slice(charPerPage * (page - 1), charPerPage * page)
          .map((char, index) => {
            return <Karakter key={"C" + index} char={char} />;
          })}
      <Pagination
        count={Math.ceil(charactersData.length / charPerPage)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
