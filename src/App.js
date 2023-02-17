import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Product from './components/Product';
import Delete from './components/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/add" element={<ProductDetails />} />
          <Route path="/product/edit/:productId" element={<ProductDetails />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/product/delete/:productId" element={<Delete />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}