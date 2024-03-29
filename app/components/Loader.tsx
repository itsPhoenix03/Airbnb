"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[50vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="#F43F5E" />
    </div>
  );
};

export default Loader;
