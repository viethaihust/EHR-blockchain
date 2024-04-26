import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useReadContract } from "wagmi";

const useGetPatients = ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number; // from 1
}) => {
  const { data: patientLength } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatientsLength",
  });

  const total = isFinite(Number(patientLength)) ? Number(patientLength) : 0;

  const from = pageSize * (pageNumber - 1);
  const to = pageSize * pageNumber - 1;

  const { data: patients_ } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatients",
    args: [BigInt(Math.max(0, from)), BigInt(Math.min(to, total - 1))],
  });

  const patients: {
    patientId: string;
    name: string;
    weight: string;
    height: string;
    bloodGroup: string;
    bloodPressure: string;
    covidVaccinated: boolean;
  }[] = [];

  if (patients_) {
    const length = patients_[1].length;

    for (let i = 0; i < length; i++) {
      const patient = {
        patientId: patients_[1][i],
        name: patients_[2][i],
        weight: patients_[3][i].toString(),
        height: patients_[4][i].toString(),
        bloodGroup: patients_[5][i],
        bloodPressure: patients_[6][i].toString(),
        covidVaccinated: patients_[7][i],
      };
      patients.push(patient);
    }
  }

  return { patients, total };
};

export default useGetPatients;
