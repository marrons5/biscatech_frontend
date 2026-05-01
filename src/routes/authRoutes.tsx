import React from 'react'
import { Route } from 'react-router-dom';
import { PrivateAppLayout } from '@/layout/privateAppLayout';

import { ClientDashboard, ClientCatalog, ClientEvaluations, ClientRequests, ClientHistory } from '@/pages/auth/client';
import { ProDashboard, ProBalance, ProEvaluations, ProProfile, ProHistory } from '@/pages/auth/pro';
function AuthRoutes() {
  return (
    <React.Fragment>
      <Route element={<PrivateAppLayout/>}>
        <Route path='/client/dashboard' element={<ClientDashboard/>}/>
        <Route path='/client/catalog' element={<ClientCatalog/>}/>
        <Route path='/client/requests' element={<ClientRequests/>}/>
        <Route path='/client/evaluations' element={<ClientEvaluations/>}/>
        <Route path='/client/history' element={<ClientHistory/>}/>
      </Route>

      <Route element={<PrivateAppLayout/>}>
        <Route path='/pro/dashboard' element={<ProDashboard/>}/>
        <Route path='/pro/balance' element={<ProBalance/>}/>
        <Route path='/pro/evaluations' element={<ProEvaluations/>}/>
        <Route path='/pro/profile' element={<ProProfile/>}/>
        <Route path='/pro/history' element={<ProHistory/>}/>
      </Route>
    </React.Fragment>
  )
}

export { AuthRoutes };
