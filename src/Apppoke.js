import React, { Suspense } from 'react';
import Main from './Components/Main';
import './Components/style.css';
import { useTranslation } from "react-i18next";
import usa from "./imgs/usa.png";
import mex from "./imgs/mex.png";


function Welcome() {
  const { t, i18n } = useTranslation(['welcome']);
  function changeToEnglish() {
    i18n.changeLanguage("en");
  }

  function changeToSpanish() {
    i18n.changeLanguage("es");
  }

  const welcomes = t("title");
  const info = t("info");

  return (
    <div className="language">
      <br></br>
      <h1 languagewell>{welcomes}</h1>
      <h1>{info}</h1>
      <button onClick={changeToEnglish}><img  className="banderas" src={usa}/></button>
      <button onClick={changeToSpanish}><img className="banderas" src={mex}/></button>
    </div>
  );
}

function Apppoke() {
  return (
    <>
    <Suspense>
      <Welcome/>
    </Suspense>
      <Main/>
    </>
  );
}

export default Apppoke;