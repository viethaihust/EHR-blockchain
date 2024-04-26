import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useEffect } from "react";
import { createGlobalState } from "react-use";
import { useAccount, useReadContract } from "wagmi";

const useGlobalUserStatus = createGlobalState<string>("");

export const useRoleInitial = () => {
  const [userStatus, setUserStatus] = useGlobalUserStatus();
  const { address } = useAccount();
  const { data: userStatus_ } = useReadContract({
    ...medicalRecordContract,
    functionName: "getRole",
    account: address,
  });

  useEffect(() => {
    if (userStatus !== userStatus_) {
      setUserStatus(userStatus_ ?? "");
    }
  }, [userStatus_]);
};

export const useRole = () => {
  const [userStatus] = useGlobalUserStatus();

  switch (userStatus) {
    case "admin":
      return { role: "admin" };
    case "unapproved":
      return { role: "doctor-unapproved" };
    case "approved":
      return { role: "doctor-approved" };
    default:
    case "unregistered":
      return { role: "public" };
  }
};
