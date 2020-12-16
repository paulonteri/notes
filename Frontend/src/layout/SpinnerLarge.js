import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const SpinnerLarge = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <MoonLoader size={70} color={"#123abc"} />
    </div>
  );
};

export default SpinnerLarge;
