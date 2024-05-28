import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useReadContract } from "wagmi";

const useGetDoctors = ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number; // from 1
}) => {
  const { data: doctorLength } = useReadContract({
    ...medicalRecordContract,
    functionName: "getDoctorsLength",
  });

  const total = isFinite(Number(doctorLength)) ? Number(doctorLength) : 0;

  const from = pageSize * (pageNumber - 1);
  const to = pageSize * pageNumber - 1;

  const { data: doctors_ } = useReadContract({
    ...medicalRecordContract,
    functionName: "getDoctors",
    args: [BigInt(Math.max(0, from)), BigInt(Math.min(to, total - 1))],
  });

  const doctors: {
    etherAddress: `0x${string}`;
    name: string;
    specialty: string;
    isApproved: boolean;
  }[] = [];

  if (doctors_) {
    const length = doctors_[1].length;

    for (let i = 0; i < length; i++) {
      const doctor = {
        etherAddress: doctors_[1][i],
        specialty: doctors_[2][i],
        name: doctors_[3][i],
        isApproved: doctors_[4][i],
      };
      doctors.push(doctor);
    }
  }

  return { doctors, total };
};

export default useGetDoctors;
