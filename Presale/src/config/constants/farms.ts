import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 0,
    lpSymbol: 'BANA-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xc3DB4881Cf04E47d54ED7804fAF84eF39Fe233d7',
    },
    tokenSymbol: 'BANA',
    tokenAddresses: {
      97: '',
      56: '0x9e69aace82083a2ffacce9947a587c36cdbccb31',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
