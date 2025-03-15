import React from "react";
import useGetUsers from "../hooks/useGetUsers";

const Home = () => {
    const { data, loading, error } = useGetUsers();
    console.log(data)
   
  return <div>mmea</div>;
};

export default Home;
