import { AppRoutes } from './routes/appRoutes'
import { AuthProvider } from './context/authProvider'
function App() {

  return (
    <>
      <AuthProvider>

      <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
