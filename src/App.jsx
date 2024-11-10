import Navbar from "./Components/Navbar"
import Content from "./Components/Content"
import Login from "./Pages/Login"
import { Route,Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Sentiment from "./Pages/Sentiment"
import News from "./Pages/News"
import Home from "../src/Home"

function App() {
  console.log("In app")
  return (
    <div className="w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Dashboard" element={<Content/>}/>
        <Route path="/Sentiment" element = {<Sentiment/>}/>
        <Route path="/News" element = {<News/>}/>
      </Routes>
    </div>
  )
}

export default App
