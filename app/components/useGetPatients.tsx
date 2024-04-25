import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useReadContract } from "wagmi";

const useGetPatients = () => {
  const { data: patientLength } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatientsLength",
  });

  const { data: patients } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatients",
    args: [BigInt(0), patientLength ? patientLength - BigInt(1) : BigInt(0)],
  });

  const transformedArray = [];
  if (patients) {
    const length = patients[1].length;

    for (let i = 0; i < length; i++) {
      const newObj = {
        patientId: patients[1][i],
        name: patients[2][i],
        weight: patients[3][i].toString(),
        height: patients[4][i].toString(),
        bloodGroup: patients[5][i],
        bloodPressure: patients[6][i].toString(),
        covidVaccinated: patients[7][i],
      };
      transformedArray.push(newObj);
    }

    return transformedArray;
  }
};

export default useGetPatients;
