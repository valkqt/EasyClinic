import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router";
import { PatientDetails } from "./components/PatientDetails/PatientDetails.tsx";
import { PatientList } from "./components/PatientList/PatientList.tsx";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patients/:patientId" element={<PatientDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
