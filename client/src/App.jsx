import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import User from './components/getUser/User'
import Add from './components/addUser/Add';
import Edit from './components/updateUser/Edit';

function App() {
  // const [count, setCount] = useState(0)
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User/>
    },
    {
      path: "/add",
      element: <Add  />,
    },
    {
      path: "/edit",
      element: <Edit />
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
