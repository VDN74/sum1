import React from "react";
import RandomMath from "./components/randomMath/RandomMath";
import "./App.css";

const App = () => {
  return (
    <div>
      <h2 className="t1">Устный счет</h2>
      <div>
        <RandomMath></RandomMath>
      </div>
    </div>
  );
};

export default App;