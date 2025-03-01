import "./App.css";
import { Header } from "./components/Header/Header";
import { createBrowserRouter } from "react-router";
import { PatientDetails } from "./components/PatientDetails/PatientDetails";
import { PatientList } from "./components/PatientList/PatientList.tsx";
import { getPatientExams, getPatients } from "./api/api.ts";
import { RouterProvider } from "react-router/dom";
import { Suspense } from "react";
import { compareAsc } from "date-fns";

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
          const data = await getPatientExams(params.patientId);
          data.examinations.sort((a, b) => compareAsc(a.dateTime, b.dateTime));

          return data;
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
