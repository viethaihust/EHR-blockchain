"use client";
import { wagmiConfig } from "@/config/wagmi";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { Select } from "antd";
import { debounce } from "lodash-es";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { readContract } from "wagmi/actions";
import {
  SearchOutlined
} from "@ant-design/icons";

export default function DoctorPage() {
  const router = useRouter();
  const [options, setOptions] = useState<{
    value: string;
    label: string;
    isCreated: boolean;
  }>();
  const [value, setValue] = useState<string>();

  const onSearch = useMemo(
    () =>
      debounce(async (patientId_: string) => {
        const patient = await readContract(wagmiConfig, {
          ...medicalRecordContract,
          functionName: "getPatient",
          args: [patientId_],
        });

        if (patient.id === "") {
          setOptions({
            value: patientId_,
            label: `Tạo mới bệnh có id ${patientId_}`,
            isCreated: false,
          });
        } else {
          setOptions({
            value: patient.id,
            label: `${patient.id} - ${patient.name}`,
            isCreated: true,
          });
        }
      }, 200),
    [],
  );

  const onChange = (patientId_: string) => {
    setValue(patientId_);
    if (!options || options.value !== patientId_) return;
    if (options.isCreated) {
      router.push(`dashboard/patient/details/${patientId_}`);
    } else {
      router.push(`dashboard/patient/create?patientId=${patientId_}`);
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex justify-between">
          <Select
            showSearch
            value={value}
            placeholder="Tìm kiếm bệnh nhân"
            defaultActiveFirstOption={false}
            suffixIcon={<SearchOutlined />}
            filterOption={false}
            onSearch={onSearch}
            onChange={onChange}
            notFoundContent={null}
            options={options ? [options] : []}
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
}
