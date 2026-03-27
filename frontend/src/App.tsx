import { Layout } from "./components/Layout"
import Login from "./pages/auth/Login"
import Registrar from "./pages/auth/Registrar"
import Dashboard from "./pages/dashboard"

function App() {

  return (
    <Layout>

      {/* <Login /> */}
      {/* <Registrar /> */}
      <Dashboard />
    </Layout>
  )
}

export default App
