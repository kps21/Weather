// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Home';
import WeatherSearch from './components/WeatherSearch';
import "./App.css"
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>    
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<WeatherSearch />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;