import Navbar from "./Components/Navbar"
import Content from "./Components/Content"

function App() {
  console.log("In app")
  return (
    <div className="w-screen h-screen flex">
      <Navbar/>
      <Content/>
    </div>
  )
}

export default App
