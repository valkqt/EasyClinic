import { useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { Examination, Patient } from "../../resources/types";
import css from "./PatientDetails.module.css";
import { PatientCard } from "../PatientCard/PatientCard";
import classNames from "classnames";
import ExamForm from "./ExamForm/ExamForm";
import { ExamsTable } from "./ExamsTable/ExamsTable";
import { compareAsc } from "date-fns";

export function PatientDetails() {
  const data = useLoaderData<Patient>();
  data.examinations.sort((a, b) =>
    compareAsc(new Date(a.dateTime), new Date(b.dateTime))
  );
  const last = data.examinations[data.examinations.length - 1];

  const [patient, setPatient] = useState<Patient>(data);
  const [currentExam, setCurrentExam] = useState<Examination>(last);

  console.log(currentExam);
  const navigate = useNavigate();

  function handleCreate() {
    const alreadyExists: Examination | undefined = patient.examinations.find(
      (e) => e.id === 0
    );

    if (alreadyExists) {
      setCurrentExam(alreadyExists);
      return;
    }

    const newExam = {
      id: 0,
      anamnesis: "",
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

  function handleFormSubmit(exam: Examination) {
    const exams = patient.examinations;

    setPatient({
      ...patient,
      examinations: exams.toSpliced(
        exams.findIndex((e) => e.id === exam.id),
        1,
        exam
      ),
    });
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
        <div className={css.leftContainer}>
          <div className={classNames(css.tableContainer, "defaultBorder")}>
            <ExamsTable
              patient={patient.examinations}
              setExam={setCurrentExam}
              exam={currentExam}
            />
          </div>
          <button onClick={() => handleCreate()}>Nuova</button>
        </div>
        <ExamForm
          key={currentExam.id}
          exam={currentExam}
          setExam={setCurrentExam}
          onSubmit={handleFormSubmit}
          patient={patient}
        />
      </div>
    </div>
  );
}
