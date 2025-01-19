import React from 'react';
import './Styles/App.css';
import Header from "./Components/UI/Header/header";
import Footer from "./Components/UI/Footer/footer";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import Loader from "./Components/Loader";

function App() {
    const [isLoaded, setIsLoaded] = React.useState(true);
    setTimeout(() =>  { setIsLoaded(false) }, 1500);

    return (
    <BrowserRouter>
        <Header/>
        <main>
            {isLoaded ? (
                <Loader/>
            ) : (
                <AppRouter/>
            )}
        </main>
        <Footer/>
    </BrowserRouter>
    );
}

export default App;
