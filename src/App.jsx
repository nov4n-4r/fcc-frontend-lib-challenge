import DrumsApp from "./projects/drums";
import Pomodoro from "./projects/pomodoro_clock";
import { Routes, Route, BrowserRouter as Router, Link, useLocation } from "react-router-dom";

function Home(){
  return <section
    className="bg-stone-800 fixed flex items-center p-6 justify-center flex-col gap-4"
    style={{
        width : "800px",
        top : "50%",
        left : "50%",
        minHeight : "400px",
        transform : "translate(-50%, -50%)"
    }}
  >
    <Link to="/drums"><button className="p-2 text-white">DRUMS CHALLENGE</button></Link>
    <Link to="/pomodoro"><button className="p-2 text-white">25 + 5 CLOCK CHALLENGE</button></Link>
  </section>
}

function App(){
  return <Router>
    <AppRouter />
  </Router>
}

function AppRouter(){
  const location = useLocation()

  return <Routes location={location}>
    <Route path="/" element={<Home />} />
    <Route path="/drums" element={<DrumsApp />} />
    <Route path="/pomodoro" element={<Pomodoro />} />
  </Routes>
}

export default App