import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
// import { PublicRoutes } from './publicRoutes';
// import { PublicRoutes } from './publicRoutes';

function AppRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {/* {PublicRoutes()} */}
          {AuthRoutes()}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export { AppRoutes };
