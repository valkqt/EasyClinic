import css from "./Examform.module.css";
import { Editor } from "../Editor/Editor";
import {
  categoryMap,
  Motivation,
  motivationMap,
} from "../../../resources/globals";
import { FormEvent, useState } from "react";
import { Examination, Patient } from "../../../resources/types";
import classNames from "classnames";
import { createExamination, updateExamination } from "../../../api/api";
import { FormGroup } from "./FormGroup/FormGroup";
import { Interweave } from "interweave";
import { format } from "date-fns";

interface ExamFormProps {
  exam: Examination;
  setExam: (exam: Examination) => void;
  patient: Patient;
  onSubmit: (state: Examination) => void;
}

export default function ExamForm({ exam, onSubmit, patient }: ExamFormProps) {
  const now = new Date();
  const [isEditing, setIsEditing] = useState(false);
  const [time, setTime] = useState(format(exam.dateTime || now, "HH:mm"));
  const [category, setCategory] = useState(exam.category);
  const [motivation, setMotivation] = useState(exam.motivation);
  const [date, setDate] = useState(format(exam.dateTime || now, "yyyy-MM-dd"));
  const [details, setDetails] = useState(exam.anamnesis);

  async function handleSubmit(e: FormEvent) {
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
      const resourceId = await createExamination(newExam, patient.id);
      onSubmit({ ...newExam, id: resourceId });
    } else {
      await updateExamination({ ...newExam, id: exam.id }, patient.id);
      onSubmit({ ...newExam, id: exam.id });
    }

    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formDetails}>
        <div className={css.dateTime}>
          <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
            <label>Data</label>
            <input
              type="date"
              disabled={!isEditing}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
            />
          </FormGroup>
          <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
            <label>Ora</label>
            <input
              type="time"
              disabled={!isEditing}
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
          <label>Tipologia</label>
          <select
            disabled={!isEditing}
            value={category}
            onChange={(e) => {
              setCategory(parseInt(e.target.value));
            }}
          >
            {Object.entries(categoryMap).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup setEditing={setIsEditing} isEditing={isEditing}>
          <label>Motivo</label>
          <select
            disabled={!isEditing}
            value={motivation}
            defaultValue={Motivation.Controllo}
            onChange={(e) => setMotivation(parseInt(e.target.value))}
          >
            {Object.entries(motivationMap).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </FormGroup>
        <div
          className={classNames(css.editorContainer, { pointer: !isEditing })}
          onClick={() => setIsEditing(true)}
        >
          <label>Anamnesi</label>
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
            <button type="submit">Salva</button>
          </div>
        </div>
      </div>
    </form>
  );
}
