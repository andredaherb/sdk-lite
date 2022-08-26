import BigNumber from 'bignumber.js'

export const toWei = (eth: string, decimals = 18) =>
  new BigNumber(eth).times(`1e${decimals}`).toString()
