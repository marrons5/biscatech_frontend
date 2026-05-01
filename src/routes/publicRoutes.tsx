import { Route } from 'react-router-dom';

import { Home, Login, Register, ForgotPassword } from '@/pages/public';

function PublicRoutes() {
  return (
    <>
        <Route path='/login' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
    </>
  )
}

export { PublicRoutes };
