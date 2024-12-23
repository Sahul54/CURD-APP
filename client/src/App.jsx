import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import User from './components/getUser/User'

function App() {
  // const [count, setCount] = useState(0)
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User/>
    },
    {
      path: "/add",
      element: "user add page",
    },
    {
      path: "/edit",
      element: "update user page"
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router = {route}>

      </RouterProvider>
    </div>
  )
}

export default App
