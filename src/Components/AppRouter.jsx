import React from 'react';
import {Route, Routes} from "react-router-dom";
import publicRoutes from "../Router/publicRoutes";

const AppRouter = () => {

    return (
        <Routes>
            {publicRoutes.map((route, index) =>
                <Route path={route.path} element={route.component} key={index}/>
            )}
        </Routes>
    );
};

export default AppRouter;