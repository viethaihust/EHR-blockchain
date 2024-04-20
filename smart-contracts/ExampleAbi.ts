export const patientListContract = {
  address: "0x2253ff4851E890E85b9FdFb9c986C2Ff34a87807",
  abi: [
    {
      inputs: [
        { internalType: "address", name: "etherAddress", type: "address" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "specialty", type: "string" },
      ],
      name: "addEditDoctorData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "etherAddress", type: "address" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "uint256", name: "weight", type: "uint256" },
        { internalType: "uint256", name: "height", type: "uint256" },
        { internalType: "string", name: "bloodGroup", type: "string" },
        { internalType: "uint256", name: "bloodPressure", type: "uint256" },
        { internalType: "bool", name: "covidVaccine", type: "bool" },
      ],
      name: "addEditPatientMedicalData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "patientAddress", type: "address" },
        { internalType: "address", name: "doctorAddress", type: "address" },
        { internalType: "string", name: "date", type: "string" },
        { internalType: "string", name: "diagnosis", type: "string" },
        { internalType: "string", name: "prescription", type: "string" },
      ],
      name: "addVisitHistory",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "doctorCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "doctorAddress", type: "address" },
        { internalType: "address", name: "patientAddress", type: "address" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "uint256", name: "weight", type: "uint256" },
        { internalType: "uint256", name: "height", type: "uint256" },
        { internalType: "string", name: "bloodGroup", type: "string" },
        { internalType: "uint256", name: "bloodPressure", type: "uint256" },
        { internalType: "bool", name: "covidVaccine", type: "bool" },
      ],
      name: "editPatientMedicalDataByDoctor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "etherAddress", type: "address" },
      ],
      name: "getPatientMedicalList",
      outputs: [
        {
          components: [
            { internalType: "address", name: "etherAddress", type: "address" },
            { internalType: "string", name: "name", type: "string" },
            { internalType: "uint256", name: "weight", type: "uint256" },
            { internalType: "uint256", name: "height", type: "uint256" },
            { internalType: "string", name: "bloodGroup", type: "string" },
            { internalType: "uint256", name: "bloodPressure", type: "uint256" },
            { internalType: "bool", name: "covidVaccine", type: "bool" },
          ],
          internalType: "struct Example.PatientMedicalData",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "patientAddress", type: "address" },
      ],
      name: "getVisitHistoryList",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "patientAddress",
              type: "address",
            },
            { internalType: "address", name: "doctorAddress", type: "address" },
            { internalType: "string", name: "date", type: "string" },
            { internalType: "string", name: "diagnosis", type: "string" },
            { internalType: "string", name: "prescription", type: "string" },
          ],
          internalType: "struct Example.VisitHistoryData[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "patientAddress", type: "address" },
        { internalType: "address", name: "doctorAddress", type: "address" },
      ],
      name: "givePermission",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "patientCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "patientAddress", type: "address" },
        { internalType: "address", name: "doctorAddress", type: "address" },
      ],
      name: "revokePermission",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;
