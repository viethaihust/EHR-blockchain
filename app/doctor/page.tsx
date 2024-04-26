"use client";
import { wagmiConfig } from "@/config/wagmi";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { Select } from "antd";
import { debounce } from "lodash-es";
import { useCallback, useState } from "react";
import { readContract } from "wagmi/actions";

export default function DoctorPage() {
  const [options, setOptions] = useState<{
    value: string;
    label: string;
    isCreated: boolean;
  }>();
  const [value, setValue] = useState<string>();

  const onSearch = useCallback(
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
      // mở trang đăng ký khám
    } else {
      // mở trang tạo bệnh nhân
    }
  };

  return (
    <div className="m-40 p-16">
      <div>
        <div className="flex justify-between">
          <Select
            showSearch
            value={value}
            placeholder="Tìm kiếm bệnh nhân"
            defaultActiveFirstOption={false}
            suffixIcon={null}
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
