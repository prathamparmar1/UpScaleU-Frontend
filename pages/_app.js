import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
const router = useRouter();
   const noNavbarRoutes = ["/login", "/register"]; 
  return (
    <>
      {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </>);
}
