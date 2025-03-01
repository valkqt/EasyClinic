import css from "./PatientList.module.css";
import { Patient } from "../../resources/types";
import { PatientCard } from "../PatientCard/PatientCard";
import classNames from "classnames";
import { useLoaderData } from "react-router";

export function PatientList() {
  const data = useLoaderData<Patient[]>();

  return (
    <div className={css.container}>
      {data.map((p) => (
        <div className={classNames("pointer", css.cardWrapper)} key={p.id}>
          <PatientCard patient={p} />
        </div>
      ))}
    </div>
  );
}
