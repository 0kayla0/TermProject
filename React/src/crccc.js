import web3 from "./web3"

const address = "***TO BE COMPLETED***"

const abi = [
  {
    constant: false,
    inputs: [
      { name: "name", type: "string"}
    ],
    name: "registerNewStudent",
    outputs: [{ name: "", type: "bool"}],
    payable: false,
    stateMutability: "nonpayable", // ???
    type: "function"
  },
  {
      constant: false,
      inputs: [
        { name: "vendorID", type: "string"}
      ],
      name: "spawnNewRegister",
      outputs: [{ name: "", type: "bool"}],
      payable: true,
      stateMutability: "payable",
      type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "vendorID", type: "string"},
      { name: "itemName", type: "string"}
    ],
    name: "purchaseItem",
    outputs: [{ name: "", type: "bool"}],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  { //FIXME just for debugging
    constant: false,
    inputs: [
      { name: "vendorID", type: "string"},
      { name: "price", type: "uint256"}
    ],
    name: "purchaseItem",
    outputs: [{ name: "", type: "bool"}],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "vendorID", type: "string"}
    ],
    name: "closeRegister",
    outputs: [{ name: "", type: "bool"}],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
]
