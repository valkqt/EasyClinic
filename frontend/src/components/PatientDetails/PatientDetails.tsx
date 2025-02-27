import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { getPatientExams } from "../../api/api";
import { Examination, Patient } from "../../resources/types";
import { parseParams } from "../../resources/functions/parseParams";
import css from "./PatientDetails.module.css";
import { PatientCard } from "../PatientCard/PatientCard";
import classNames from "classnames";
import ExamForm from "./ExamForm/ExamForm";
import { ExamsTable } from "./ExamsTable/ExamsTable";

export function PatientDetails() {
  const [patient, setPatient] = useState<Patient>();
  const [currentExam, setCurrentExam] = useState<Examination | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleCreate() {
    if (!patient) {
      return;
    }

    const alreadyExists: Examination | undefined = patient.examinations.find(
      (e) => e.id === 0
    );

    if (alreadyExists) {
      setCurrentExam(alreadyExists);
      return;
    }

    const newExam = {
      id: 0,
      anamnesis: "{}",
      category: 0,
      motivation: 0,
      dateTime: new Date().toISOString(),
    };

    setCurrentExam(newExam);

    setPatient({
      ...patient,
      examinations: [...patient.examinations, newExam],
    });
  }

  useEffect(() => {
    const patientId = parseParams(params.patientId);
    if (patientId < 0) {
      return;
    }
    getPatientExams(patientId).then((data) => {
      setPatient(data);
    });
  }, []);

  if (patient == null) {
    return;
  }

  return (
    <div className={classNames(css.container)}>
      <div className={classNames(css.examHeader, "defaultBorder")}>
        <PatientCard patient={patient} />
        <div
          className={classNames(css.backArrow, "defaultBorder")}
          onClick={() => {
            navigate("/");
          }}
        >
          &#129092;
        </div>
      </div>
      <div className={css.examContainer}>
        <div style={{ position: "relative" }}>
          <div className={classNames(css.tableContainer, "defaultBorder")}>
            <ExamsTable
              patient={patient}
              setExam={setCurrentExam}
              exam={currentExam}
            />
          </div>
          <button onClick={() => handleCreate()}>Nuova</button>
        </div>
        <ExamForm
          exam={currentExam}
          setExam={setCurrentExam}
          setPatient={setPatient}
          patient={patient}
        />
      </div>
    </div>
  );
}
