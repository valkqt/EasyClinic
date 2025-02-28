import css from "./ExamsTable.module.css";
import classNames from "classnames";
import { getDatePortion } from "../../../resources/functions/getDatePortion";
import { motivationMap } from "../../../resources/globals";
import { Examination, Patient } from "../../../resources/types";

interface ExamsTableProps {
  patient: Patient;
  exam: Examination | null;
  setExam: (exam: Examination) => void;
}

export function ExamsTable({ patient, setExam, exam }: ExamsTableProps) {
  function isSelected(date: string): boolean {
    return exam?.dateTime === date;
  }

  return (
    <>
      <table className={classNames(css.table)}>
        <thead>
          <tr className={css.tableHeader}>
            <th>Motivo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody className={css.bro}>
          {patient.examinations
            .sort((a, b) => {
              if (new Date(a.dateTime) > new Date(b.dateTime)) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((e) => (
              <tr
                key={e.id}
                onClick={() => {
                  setExam(e);
                }}
                className={classNames(
                  { [css.selectedRow]: isSelected(e.dateTime) },
                  "pointer",
                  css.tableRow
                )}
              >
                <td>{motivationMap[e.motivation]}</td>
                <td>{getDatePortion(e.dateTime)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
