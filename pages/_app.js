import '../styles/globals.css'
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-out-cubic",
      once: true,
      offset: 500,
    });
  }, []);
  return <Component {...pageProps} />
}

export default MyApp
