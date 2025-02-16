import { BrowserRouter ,Route,Routes,Navigate} from "react-router-dom"
import NavBar from "./pages/NavBar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/SignUp"
import DetailInfo from "./pages/DetailInfo"
import Post from "./pages/Post"
import AppState from "./context/AppState"
import UserPost from "./pages/UserPost"

function App() {

  return (
    <AppState>
    <BrowserRouter>
    <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate to='/home'/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/signUp" element={<Signup/>}/>
          <Route path="/detailInfo" element={<DetailInfo/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path='/userPost' element={<UserPost/>}/>
        </Routes>
    </BrowserRouter>
    </AppState>
  )
}

export default App
