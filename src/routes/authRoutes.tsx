import React from 'react'
import { Route } from 'react-router-dom';
import { PrivateAppLayout } from '@/layout/privateAppLayout';

//import { ClientDashboard, ClientCatalog, ClientEvaluations, ClientRequests, ClientHistory } from '@/pages/auth/client';
import { ProDashboard, ProBalance, ProHistory } from '@/pages/auth/pro';
import { RequireAuth } from '@/components/custom/requireAuth';
import { AppShell } from '@/components/custom/appShell';
import { Rate } from '@/pages/auth/client/rate';
import { RequestCreate } from '@/pages/auth/client/requestCreate';
import { RequestStatus } from '@/pages/auth/client/requestStatus';
import { Avaliacoes } from '@/pages/auth/client/avaliacoes';
import { ClientHistory } from '@/pages/auth/client/clientHistory';
import { ClientSettings } from '@/pages/auth/client/clientSettings';
import { ClientHome } from '@/pages/auth/client/clientHome';
import { ProSettings } from '@/pages/auth/pro/proSettings';
function AuthRoutes() {
  return (
    <React.Fragment>
      <Route element={<PrivateAppLayout />}>
        {/*<Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/catalog" element={<ClientCatalog />} />
        <Route path="/client/requests" element={<ClientRequests />} />
        <Route path="/client/evaluations" element={<ClientEvaluations />} />
        <Route path="/client/history" element={<ClientHistory />} /> 
        <Route
          path="/app"
          element={
            <RequireAuth role="client">
              <AppShell>
                <ClientDashboard />
              </AppShell>
            </RequireAuth>
          }
        />
        */}
        <Route path="/client/history" element={<ClientHistory/>}/>
        <Route path="/client/settings" element={<ClientSettings/>}/>
        <Route path="/client/dashboard" element={<ClientHome/>}/>

        <Route
          path="/app/avaliacoes"
          element={
            <RequireAuth role="client">
              <AppShell>
                <Avaliacoes />
              </AppShell>
            </RequireAuth>
          }
        />
        <Route
          path="/app/request/create"
          element={
            <RequireAuth role="client">
              <AppShell>
                <RequestCreate />
              </AppShell>
            </RequireAuth>
          }
        />
        <Route
          path="/app/request/:id"
          element={
            <RequireAuth role="client">
              <AppShell>
                <RequestStatus />
              </AppShell>
            </RequireAuth>
          }
        />
        <Route
          path="/app/rate/:id"
          element={
            <RequireAuth role="client">
              <AppShell>
                <Rate />
              </AppShell>
            </RequireAuth>
          }
        />
      </Route>

      <Route element={<PrivateAppLayout />}>
        <Route path="/pro/dashboard" element={<ProDashboard />} />
        <Route path="/pro/balance" element={<ProBalance />} />
        <Route path="/pro/history" element={<ProHistory />} />
        <Route path="/pro/settings" element={<ProSettings />} />
      </Route>
    </React.Fragment>
  );
}

export { AuthRoutes };
