import { Layout } from "./components/Layout"
import Login from "./pages/auth/Login"

function App() {

  return (
    <Layout>

      <Login />
      {/* <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold underline">Hello World</h1>
        <Button>
        Click me
        </Button>
      </div> */}
    </Layout>
  )
}

export default App
