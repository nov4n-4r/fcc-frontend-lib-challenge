import DrumsApp from "./projects/drums";
import Pomodoro from "./projects/pomodoro_clock";
import QuotesGenerator from "./projects/quotes_generator";
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
    <Link to="/quotes"><button className="p-2 text-white">QUOTES GENERATOR CHALLENGE</button></Link>
  </section>
}

function App(){
  return <Router>
    <AppRouter />
  </Router>
}

function AppRouter(){
  const location = useLocation()
  return <Routes location={location.pathname}>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/drums" element={<DrumsApp />} />
    <Route exact path="/pomodoro" element={<Pomodoro />} />
    <Route exact path="/quotes" element={<QuotesGenerator />} />
  </Routes>
}

export default App