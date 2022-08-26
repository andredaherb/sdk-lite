export type AbiType = 'function' | 'constructor' | 'event' | 'fallback'
export type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable'

export const TRANSFER_METHOD_ABI = [
  {
    constant: false,
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function' as AbiType,
  },
]
