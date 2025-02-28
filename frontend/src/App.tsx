import "./App.css";
import { Header } from "./components/Header/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router";
import { PatientDetails } from "./components/PatientDetails/PatientDetails.tsx";
import { PatientList } from "./components/PatientList/PatientList.tsx";
import { getPatientExams, getPatients } from "./api/api.ts";
import { RouterProvider } from "react-router/dom";
import { Suspense } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PatientList />,
      loader: getPatients,
    },
    {
      path: "/patients/:patientId",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PatientDetails />
        </Suspense>
      ),
      loader: async ({ params }) => {
        if (params.patientId) {
          return getPatientExams(params.patientId);
        }
      },
    },
  ]);
  return (
    <div className="wrapper">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
