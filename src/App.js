import React, { Suspense } from "react";
import "./Styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navegacion/Navbar";
import inicio from "./Components/paginas/inicio";
import pokemon from "./Components/paginas/pokemon";
import items from "./Components/paginas/item";
import Appsearch from "./appsearch";
import Appprofile from "./Appprofile";
import Apppoke  from "./Apppoke";

export default function App() {

  return (
    
      <div>  
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/inicio" element={<Appsearch/>}/>
          <Route path="/pokemon" element={<Apppoke/>}/>
          <Route path="/items" element={<Appprofile/>}/>
        </Routes>
        </BrowserRouter>
        
      </div>
  );

  }