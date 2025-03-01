import css from "./ExamsTable.module.css";
import classNames from "classnames";
import { motivationMap } from "../../../resources/globals";
import { Examination } from "../../../resources/types";
import { format } from "date-fns";

interface ExamsTableProps {
  patient: Examination[];
  exam: Examination;
  setExam: (exam: Examination) => void;
}

export function ExamsTable({ patient, setExam, exam }: ExamsTableProps) {
  function isSelected(examId: number): boolean {
    return exam.id === examId;
  }

  return (
    <table className={classNames(css.table)}>
      <thead>
        <tr className={css.tableHeader}>
          <th>Motivo</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {patient.map((e) => (
          <tr
            key={e.id}
            onClick={() => {
              setExam(e);
            }}
            className={classNames(
              isSelected(e.id) && css.selectedRow,
              "pointer",
              css.tableRow
            )}
          >
            <td>{motivationMap[e.motivation]}</td>
            <td>{format(e.dateTime, "dd/MM/yyyy")}</td>
          </tr>
        ))}
        {Array.from({ length: Math.max(14 - patient.length, 0) }, (_, i) => (
          <tr key={i} className={css.tableRow}>
            <td className={classNames(css.filler)}></td>
            <td className={classNames(css.filler)}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
