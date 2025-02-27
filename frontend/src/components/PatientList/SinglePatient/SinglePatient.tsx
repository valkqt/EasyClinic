import { patient } from "../../../resources/globals";
import { PatientCard } from "../../PatientCard/PatientCard";

export function SinglePatient() {
  return <PatientCard patient={patient} />;
}
