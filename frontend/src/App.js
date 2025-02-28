import Navbar from "./Navbar";
import Create from "./Create";
import PollPage from "./PollPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new-poll" element={<Create />}></Route>
          <Route path="/poll/:id" element={<PollPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
