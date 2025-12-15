import Hero from "./components/Hero/Hero.jsx";
import AOS from 'aos'
import react, {useEffect} from "react";
import 'aos/dist/aos.css';
import CountDate from "./components/CountDate/CountDate.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import Ceremony from "./components/Ceremony/Ceremony.jsx";
import Banquet from "./components/Banquet/Banquet.jsx";
import Information from "./components/Information/Information.jsx";
import Form from "./components/Form/Form.jsx";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
     < Hero/>
     < CountDate targetDate="2026-08-15T16:00:00"/>
     < Welcome/>
     < Ceremony/>
     < Banquet/>
     < Information/>
     < Form/>
    </>
  )
}

export default App
