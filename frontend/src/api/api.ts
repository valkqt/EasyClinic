import { api } from "../resources/axios";
import { Examination, Patient } from "../resources/types";

export async function getPatientExams(patientId: string): Promise<Patient> {
  const patient: Promise<Patient> = await api
    .get(`/Patients/${patientId}`)
    .then((res) => res.data);

  return patient;
}

export async function createExamination(
  exam: Examination,
  patientId: number
): Promise<void> {
  api.post(`/Examinations`, { ...exam, patientId: patientId });
}

export async function getPatients(): Promise<Patient[]> {
  const patients = api.get(`/Patients`).then((res) => res.data);

  return patients;
}

export async function updateExamination(
  exam: Examination,
  patientId: number
): Promise<void> {
  console.log({ ...exam, patientId: patientId });
  api
    .put(`/Examinations/${exam.id}`, { ...exam, patientId: patientId })
    .then((res) => console.log(res.data));
}
