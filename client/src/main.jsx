
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import GenerateRecipe from './GenerateRecipe';
import RecipeDetail from './RecipeDetail';
import FavouriteRecipes from './FavouriteRecipes';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/generate" element={<GenerateRecipe />} />
        <Route path="/favourites" element={<FavouriteRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
