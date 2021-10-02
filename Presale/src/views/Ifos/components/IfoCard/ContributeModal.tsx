import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import BalanceInput from 'components/Input/BalanceInput'
import { getEthBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const [balance, setBalance] = useState(new BigNumber(0));

  useEffect(() => {
    async function initialize() {
      const _balance = await getEthBalance(account);
      setBalance(new BigNumber(_balance));
    }

    initialize();

  }, [account])

  const confirmFunction = async () =>{
    setPendingTx(true)
    await contract.methods
      .receive({from: account , value: new BigNumber(value).times(new BigNumber(10).pow(18)).toString()})
    setPendingTx(false)
    onDismiss()
  }
  
  const _balance = getFullDisplayBalance(new BigNumber(balance))
  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={_balance.toString()}
        onSelectMax={() => setValue(_balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={confirmFunction}
        >
          Confirm
        </Button>
      </Flex>
      <LinkExternal
        href="https://exchange.banaswap.net/#/swap"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal>
    </Modal>
  )
}

export default ContributeModal
