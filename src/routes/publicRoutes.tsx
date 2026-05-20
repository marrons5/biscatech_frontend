import { Route } from 'react-router-dom';

import { Home, Login, Register, ForgotPassword } from '@/pages/public';
import { ServicesCatalog } from '@/pages/public/servicesCatalog';

function PublicRoutes() {
  return (
    <>
        <Route path='/home' element={<Home/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/services-catalog' element={<ServicesCatalog/>}/>
    </>
  )
}

export { PublicRoutes };
