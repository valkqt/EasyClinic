import { Patient } from "../../../../resources/types";
import { PatientCard } from "../../../PatientCard/PatientCard";

interface CardWrapperProps {
  patient: Patient;
  setShow: (state: boolean) => void;
}

export function CardWrapper({ patient }: CardWrapperProps) {
  return (
    <div>
      <PatientCard patient={patient} />
    </div>
  );
}
