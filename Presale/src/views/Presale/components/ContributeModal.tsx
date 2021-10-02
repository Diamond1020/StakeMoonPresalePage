import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import Web3 from 'web3';

interface Props {
  address: string
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ address, currency, contract, currencyAddress, onDismiss }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const balance = getFullDisplayBalance(useTokenBalance(currencyAddress), 18)

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            const web3 = new Web3(Web3.givenProvider);
            await web3.eth.sendTransaction({
              from:account, 
              to: address, 
              value:web3.utils.toWei(value, "ether")} , function(error, hash){
                setPendingTx(false)
            });
              
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </Button>
      </Flex>
      {/* <LinkExternal
        href="https://pancakeswap.finance/swap?outputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal> */}
    </Modal>
  )
}

export default ContributeModal
