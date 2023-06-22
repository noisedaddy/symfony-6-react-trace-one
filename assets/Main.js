import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./pages/ArticleList"
import ArticleCreate from "./pages/ArticleCreate"
import ArticleShow from "./pages/ArticleShow"

function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<ArticleList/>} />
                <Route path="/create"  element={<ArticleCreate/>} />
                <Route path="/show/:id"  element={<ArticleShow/>} />
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('app')) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <Main />
        </StrictMode>
    );
}