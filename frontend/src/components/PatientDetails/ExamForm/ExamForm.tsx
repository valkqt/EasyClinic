import css from "./Examform.module.css";
import { Editor } from "../Editor/Editor";
import { categoryMap, motivationMap } from "../../../resources/globals";
import { useState } from "react";
import { Examination, Patient } from "../../../resources/types";
import classNames from "classnames";
import { createExamination, updateExamination } from "../../../api/api";
import { FormGroup } from "./FormGroup/FormGroup";
import { Interweave } from "interweave";

interface ExamFormProps {
  exam: Examination;
  setExam: (exam: Examination) => void;
  patient: Patient;
  onSubmit: (state: Examination) => void;
}

export default function ExamForm({ exam, onSubmit, patient }: ExamFormProps) {
  const now = new Date();
  const [isEditing, setIsEditing] = useState(false);
  const [time, setTime] = useState(
    exam ? exam.dateTime.slice(11, 16) : now.toISOString().slice(11, 16)
  );
  const [category, setCategory] = useState(exam.category);
  const [motivation, setMotivation] = useState(exam.motivation);
  const [localDate, setLocalDate] = useState<string>(
    exam.dateTime.slice(0, 10)
  );
  const [details, setDetails] = useState<string>(exam.anamnesis);

  const defaultDate =
    exam != null ? exam.dateTime.slice(0, 10) : now.toISOString().slice(0, 10);
  const date = localDate ?? defaultDate;
  console.log(localDate);

  async function handleSubmit() {
    const newDate = new Date(date);
    const [hours, minutes] = time.split(":");
    newDate.setHours(Number(hours));
    newDate.setMinutes(Number(minutes));

    const newExam: Examination = {
      id: 0,
      dateTime: newDate.toISOString(),
      category: category,
      motivation: motivation,
      anamnesis: details,
    };

    // 0 is a fake id, represents a new resource being created
    if (exam.id === 0) {
      createExamination(newExam, patient.id);
    } else {
      updateExamination({ ...newExam, id: exam.id }, patient.id);
      onSubmit({ ...newExam, id: exam.id });
    }
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
              value={localDate}
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
          className={classNames(css.editorContainer, { pointer: !isEditing })}
          onClick={() => setIsEditing(true)}
        >
          <label htmlFor="Anamnesi">Anamnesi</label>
          <Editor
            details={details}
            setDetails={setDetails}
            isEditing={isEditing}
          />
          <Interweave
            content={details}
            className={classNames(
              { toggleDisplay: isEditing },
              css.displayText,
              "defaultBorder"
            )}
          />
          <div
            className={classNames(css.formFooter, {
              invisible: !isEditing,
            })}
          >
            <div></div>
            <button type="submit">Salva</button>
          </div>
        </div>
      </div>
    </form>
  );
}
