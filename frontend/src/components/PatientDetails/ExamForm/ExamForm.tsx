import css from "./Examform.module.css";
import { Editor } from "../Editor/Editor";
import { categoryMap, motivationMap } from "../../../resources/globals";
import { useEffect, useState } from "react";
import { Examination, Patient } from "../../../resources/types";
import { useQuill } from "react-quilljs";
import classNames from "classnames";
import {
  createExamination,
  getPatientExams,
  updateExamination,
} from "../../../api/api";
import { FormGroup } from "./FormGroup/FormGroup";
import { Interweave } from "interweave";

interface ExamFormProps {
  exam: Examination | null;
  setExam: (exam: Examination | null) => void;
  setPatient: (patient: Patient) => void;
  patient: Patient;
}

export default function ExamForm({
  exam,
  setExam,
  setPatient,
  patient,
}: ExamFormProps) {
  const now = new Date();
  const [isEditing, setIsEditing] = useState(false);
  const { quill, quillRef } = useQuill();
  const [time, setTime] = useState(
    exam ? exam.dateTime.slice(11, 16) : now.toISOString().slice(11, 16)
  );
  const [category, setCategory] = useState(-1);
  const [motivation, setMotivation] = useState(-1);

  const [localDate, setLocalDate] = useState<string>();
  const defaultDate =
    exam != null ? exam.dateTime.slice(0, 10) : now.toISOString().slice(0, 10);
  const date = localDate ?? defaultDate;

  useEffect(() => {
    if (exam) {
      setIsEditing(false);
      setTime(exam.dateTime.slice(11, 16));
      setCategory(exam.category);
      setMotivation(exam.motivation);

      quill?.setContents(JSON.parse(exam.anamnesis));
    }
  }, [exam]);

  async function handleSubmit() {
    const editorContents: string = JSON.stringify(quill?.getContents());

    const newDate = new Date(date);
    const [hours, minutes] = time.split(":");
    newDate.setHours(Number(hours));
    newDate.setMinutes(Number(minutes));

    const newExam: Examination = {
      id: 0,
      dateTime: newDate.toISOString(),
      category: category,
      motivation: motivation,
      anamnesis: editorContents,
    };

    // 0 is a fake id, represents a new resource being created
    if (exam?.id === 0) {
      createExamination(newExam, patient.id);
    } else {
      if (exam) {
        updateExamination({ ...newExam, id: exam.id }, patient.id);
        setPatient({
          ...patient,
          examinations: [...patient.examinations],
        });
      }
    }

    // await getPatientExams(patient.id).then((data) => {
    //   setPatient(data);
    //   window.location.reload();
    // });
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit();
        e.preventDefault();
      }}
      className={css.form}
    >
      <div className={css.formDetails}>
        <div className={css.dateTime}>
          <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
            <label htmlFor="date">Data</label>
            <input
              type="date"
              disabled={!isEditing}
              onChange={(e) => {
                setLocalDate(e.target.value);
              }}
              value={date}
            />
          </FormGroup>
          <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
            <label htmlFor="time">Ora</label>
            <input
              type="time"
              disabled={!isEditing}
              value={time}
              onChange={(e) => {
                console.log(exam?.dateTime.slice(0, 10) + e.target.value);
                setTime(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
          <label htmlFor="Tipologia">Tipologia</label>
          <select
            disabled={!isEditing}
            value={category}
            onChange={(e) => {
              setCategory(parseInt(e.target.value));
            }}
          >
            {Object.entries(categoryMap).map((_, i) => (
              <option value={i} key={i}>
                {categoryMap[i]}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
          <label htmlFor="Motivo">Motivo</label>
          <select
            disabled={!isEditing}
            value={motivation}
            defaultValue={2}
            onChange={(e) => setMotivation(parseInt(e.target.value))}
          >
            {Object.entries(motivationMap).map((_, i) => (
              <option value={i} key={i}>
                {motivationMap[i]}
              </option>
            ))}
          </select>
        </FormGroup>
        <div
          className={classNames(css.extendedFormGroup, { pointer: !isEditing })}
          onClick={() => setIsEditing(true)}
        >
          <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
            <label htmlFor="Anamnesi">Anamnesi</label>
            <Editor quill={quill} quillRef={quillRef} isEditing={isEditing} />
            <Interweave
              content={quill?.root.innerHTML}
              className={classNames(
                { toggleDisplay: isEditing },
                css.displayText,
                "defaultBorder"
              )}
            />
            {isEditing && (
              <div className={css.formFooter}>
                <div></div>
                <button type="submit">Salva</button>
              </div>
            )}
          </FormGroup>
        </div>
      </div>
    </form>
  );
}
