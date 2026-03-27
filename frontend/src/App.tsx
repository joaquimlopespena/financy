import { Layout } from "./components/Layout"
import { Button } from "./components/ui/button"

function App() {

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold underline">Hello World</h1>
        <Button>
        Click me
        </Button>
      </div>
    </Layout>
  )
}

export default App
