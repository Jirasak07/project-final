import { useState, useEffect } from "react";
import { BrowserRouter} from 'react-router-dom'
import "./App.css";
import Router from "./Route/Router";

function App() {
  useEffect(()=>{
    const pathname = window.location.pathname
    console.log(pathname)
    },)
    
  return (
    <div className="bg">
    <BrowserRouter>
      {/* <Router /> */}
    </BrowserRouter>
     
    </div>
  );
}

export default App;
