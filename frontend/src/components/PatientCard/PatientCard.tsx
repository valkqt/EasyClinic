import { Patient } from "../../resources/types";
import css from "./PatientCard.module.css";
import { useNavigate } from "react-router";
import classNames from "classnames";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className={classNames(css.container)}
      onClick={() => navigate(`/patients/${patient.id}`)}
    >
      <div className={css.imageContainer}>
        <img
          src={patient.photo || "/images/generic_person.jpg"}
          alt="avatar"
          className={classNames(css.image, "defaultBorder")}
        />
      </div>
      <div className={css.info}>
        <h4>
          {patient.firstName} {patient.lastName}
        </h4>
        <div>12-12-12</div>
        <div>{patient.fiscalCode}</div>
      </div>
    </div>
  );
}
