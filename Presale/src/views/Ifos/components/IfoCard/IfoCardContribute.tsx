import React, { useState, useEffect } from 'react'
import { useModal, Button, Text, Modal, Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import Web3 from 'web3';
import BalanceInput from 'components/Input/BalanceInput'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'


export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount?: BigNumber
  tokenDecimals: number
}

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)

  const [value, setValue] = useState('')

  const { account } = useWallet()
  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)

  if (allowance === null) {
    return null
  }

  if (allowance <= 0) {
    return (
      <Button
        fullWidth
        disabled={pendingTx}
        onClick={async () => {
          try {
            setPendingTx(true)
            await onApprove()
            setPendingTx(false)
          } catch (e) {
            setPendingTx(false)
            console.error(e)
          }
        }}
      >
        Approve
      </Button>
    )
  }

  const buyFunction = async () =>{
    if (parseFloat(value) > 0) {
      setPendingTx(true);

      const rateDecimals = await contract.methods.rateDecimals().call();
      const tokenRatePerEth = await contract.methods.tokenRatePerEth().call();
      const amount = new BigNumber(value).times(new BigNumber(10).pow(rateDecimals)).dividedBy(new BigNumber(tokenRatePerEth)).toString();

      const web3 = new Web3(Web3.givenProvider);
      await web3.eth.sendTransaction({
        from:account, 
        to:'0xD634f7Ec43b0e6F0d03406eF1cAfEafd59E4b75C', 
        value:web3.utils.toWei(amount, "ether")} , function(error, hash){
          setPendingTx(false)
      });
      // await contract.methods
      //   .receive({from: account , value: new BigNumber(value).times(new BigNumber(10).pow(18)).toString()})
      setPendingTx(false)
    }
  }

  return (
    <>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={buyFunction}
        >
          BUY BANA
        </Button>
    </>
  )
}

export default IfoCardContribute
