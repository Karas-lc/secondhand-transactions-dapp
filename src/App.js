import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import PublishPage from "./pages/PublishPage";

function App() {
  return <div>
    <Routes>
      <Route path="/details" element={<DetailPage />} />
      <Route path="/publish" element={<PublishPage /> } />
      <Route exact path="/" element={<HomePage />} />
    </Routes>
  </div>
}

export default App;
