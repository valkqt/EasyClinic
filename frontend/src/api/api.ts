import { api } from "../resources/axios";
import { Examination, Patient } from "../resources/types";

export function getPatientExams(patientId: string): Promise<Patient> {
  return api.get(`/Patients/${patientId}`).then((res) => res.data);
}

export function createExamination(
  exam: Examination,
  patientId: number
): Promise<number> {
  return api
    .post(`/Examinations`, { ...exam, patientId: patientId })
    .then((res) => res.data);
}

export function getPatients(): Promise<Patient[]> {
  return api.get(`/Patients`).then((res) => res.data);
}

export function updateExamination(
  exam: Examination,
  patientId: number
): Promise<void> {
  return api.put(`/Examinations/${exam.id}`, { ...exam, patientId: patientId });
}
