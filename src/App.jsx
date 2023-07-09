import DrumsApp from "./projects/drums";
import Pomodoro from "./projects/pomodoro_clock";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App(){
  return <Router>
    <Routes>
      <Route path="/drums" element={<DrumsApp />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
    </Routes>
  </Router>
}

export default App