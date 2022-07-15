import { Suspense } from "react";
import Captura from "./imgs/Captura.PNG";
import { useTranslation } from "react-i18next";
import usa from "./imgs/usa.png";
import mex from "./imgs/mex.png";
import utags from "./imgs/utags.png";

const Appprofile = () => {

    return (
        <div className="form">
            <Suspense fallback="Cargando traducciones...">
                <Welcome />
            </Suspense>
            <div className="data">
            <img className="profile" src={Captura} />
            <h3>Marcos Eduardo Mora Avalos | 170628</h3>
            <h3>Tecnologias de la Informacion y la Comunicacion</h3>  
            <h3>IDGS 9° A</h3> 
            <h3>Desarrollo Web Integral</h3>
            <img className="utags" src={utags}/>       
            </div>
        </div>
    );
};


function Welcome() {
    const { t, i18n } = useTranslation(['welcome']);
    function changeToEnglish() {
        i18n.changeLanguage("en");
    }

    function changeToSpanish() {
        i18n.changeLanguage("es");
    }

    const welcomes = t("title");
    const profile = t("profile");

    return (
        <div className="language">
            <button onClick={changeToEnglish}><img className="banderas" src={usa} /></button>
            <button onClick={changeToSpanish}><img className="banderas" src={mex} /></button>
            <br></br>
            <h1 languagewell>{welcomes}</h1>
            <h1>{profile}</h1>
        </div>
    );
}




export default Appprofile;
