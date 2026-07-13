import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import { PublicRoutes } from './publicRoutes';
import { NotFound } from "@/pages/errors";

function AppRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {PublicRoutes()}
          {AuthRoutes()}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export { AppRoutes };
