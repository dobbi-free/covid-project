import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainView} from './modules/main-view';
import {Country} from './modules/country';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainView/>}/>
                <Route path={'countries/:country'} element={<Country/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
