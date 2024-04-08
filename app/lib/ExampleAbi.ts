export const WagmiContractConfig = {
  address: "0xa9A1a77750A62FF2b450424D2816f64d1eB46675",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_id",
          type: "address",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_birthDate",
          type: "string",
        },
        {
          internalType: "string",
          name: "_phoneNumber",
          type: "string",
        },
        {
          internalType: "string",
          name: "_specialty",
          type: "string",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
      ],
      name: "createDoctor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_birthDate",
          type: "string",
        },
        {
          internalType: "string",
          name: "_phoneNumber",
          type: "string",
        },
        {
          internalType: "string",
          name: "_houseAddress",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_weight",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_height",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_bloodGroup",
          type: "string",
        },
        {
          internalType: "string",
          name: "_diseaseName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_diseaseDescription",
          type: "string",
        },
      ],
      name: "createPatient",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "data",
      outputs: [
        {
          internalType: "string",
          name: "encryptedData",
          type: "string",
        },
        {
          internalType: "address",
          name: "_id",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "doctorCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "doctorList",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_birthDate",
          type: "string",
        },
        {
          internalType: "string",
          name: "_phoneNumber",
          type: "string",
        },
        {
          internalType: "string",
          name: "_houseAddress",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_weight",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_height",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_bloodGroup",
          type: "string",
        },
        {
          internalType: "string",
          name: "_diseaseName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_diseaseDescription",
          type: "string",
        },
      ],
      name: "editPatient",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_id",
          type: "address",
        },
      ],
      name: "getData",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "encryptedData",
              type: "string",
            },
            {
              internalType: "address",
              name: "_id",
              type: "address",
            },
          ],
          internalType: "struct Example.Data",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_id",
          type: "address",
        },
      ],
      name: "givePermission",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "patientCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "patientList",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "encryptedData",
          type: "string",
        },
      ],
      name: "saveData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;
