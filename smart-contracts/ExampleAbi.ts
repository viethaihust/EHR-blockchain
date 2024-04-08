export const patientListContract = {
  address: "0x9eAf61B96816B2A789C54f0c1c768230464Eff1e",
  abi: [
    {
      inputs: [
        { internalType: "address", name: "id", type: "address" },
        { internalType: "uint256", name: "weight", type: "uint256" },
        { internalType: "uint256", name: "height", type: "uint256" },
        { internalType: "string", name: "bloodGroup", type: "string" },
        { internalType: "string", name: "diseaseName", type: "string" },
        { internalType: "string", name: "diseaseDescription", type: "string" },
        { internalType: "string", name: "diseaseStartedOn", type: "string" },
      ],
      name: "addUpdatePatientMedicalData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "id", type: "address" }],
      name: "getPatientMedicalList",
      outputs: [
        {
          components: [
            { internalType: "address", name: "id", type: "address" },
            { internalType: "uint256", name: "weight", type: "uint256" },
            { internalType: "uint256", name: "height", type: "uint256" },
            { internalType: "string", name: "bloodGroup", type: "string" },
            { internalType: "string", name: "diseaseName", type: "string" },
            {
              internalType: "string",
              name: "diseaseDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "diseaseStartedOn",
              type: "string",
            },
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
      inputs: [],
      name: "patientCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "patients",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewMedical",
      outputs: [
        { internalType: "uint256", name: "weight", type: "uint256" },
        { internalType: "uint256", name: "height", type: "uint256" },
        { internalType: "string", name: "bloodGroup", type: "string" },
        { internalType: "string", name: "diseaseName", type: "string" },
        { internalType: "string", name: "diseaseDescription", type: "string" },
        { internalType: "string", name: "diseaseStartedOn", type: "string" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
} as const;
