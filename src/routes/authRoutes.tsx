import React from 'react'
import { Route } from 'react-router-dom';
import { PrivateAppLayout } from '@/layout/privateAppLayout';

import { ClientHome } from '@/pages/auth/client/clientHome';
import { ClientHistory } from '@/pages/auth/client/clientHistory';
import { ClientSettings } from '@/pages/auth/client/clientSettings';

import { ProDashboard, ProBalance, ProProfile, ProHistory } from '@/pages/auth/pro';
function AuthRoutes() {
  return (
    <React.Fragment>
      <Route element={<PrivateAppLayout/>}>
        <Route path='/client/dashboard' element={<ClientHome/>}/>
        <Route path='/client/history' element={<ClientHistory/>}/>
        <Route path='/client/settings' element={<ClientSettings/>}/>
      </Route>

      <Route element={<PrivateAppLayout/>}>
        <Route path='/pro/dashboard' element={<ProDashboard/>}/>
        <Route path='/pro/balance' element={<ProBalance/>}/>
        <Route path='/pro/profile' element={<ProProfile/>}/>
        <Route path='/pro/history' element={<ProHistory/>}/>
      </Route>
    </React.Fragment>
  )
}

export { AuthRoutes };
