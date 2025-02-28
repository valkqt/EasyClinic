import { SinglePatient } from "./SinglePatient/SinglePatient";
import css from "./PatientList.module.css";
import { useEffect, useState } from "react";
import { getPatients } from "../../api/api";
import { Patient } from "../../resources/types";
import { PatientCard } from "../PatientCard/PatientCard";
import classNames from "classnames";

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    getPatients().then((data) => {
      setPatients(data);
    });
  }, []);
  return (
    <div className={css.container}>
      {patients.map((p) => (
        <div className={classNames("pointer", css.cardWrapper)} key={p.id}>
          <PatientCard patient={p} />
        </div>
      ))}
    </div>
  );
}
