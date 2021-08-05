import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import './loadingScreen.css';

const LoadingScreen = () => {
   return (
      <div className="loadingScreen">
         <HashLoader color={"#24ff24"} loading={true} size={70} />
      </div>
   )
}

export default LoadingScreen