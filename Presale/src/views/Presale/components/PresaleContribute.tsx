import React, { useState, useEffect } from 'react'
import { useModal, Button, Heading, Card, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { IfoStatus } from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
// import { usePreSaleApprove } from 'hooks/useApprove'
// import { usePreSaleAllowance } from 'hooks/useAllowance'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import CardValue from 'views/Home/components/CardValue'
import Spacer from 'components/Spacer'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

const StyledPreSaleCard = styled(Card)`
  padding: 32px 16px 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
  border-radius: 16px;
  margin-top: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 32px 16px 16px;
    margin-left: auto;
    margin-right: auto;
    max-width: 437px;
    width: 100%;
    border-radius: 16px;
  }
`
const Row = styled.div`
  display: block;
  padding-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    padding-top: 24px;
  }
`
const RowItem = styled.div`
  display: flex;
  padding-top: 16px;
  
`

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  tokenAddress: string
  contract: Contract
  status?: IfoStatus
  raisingAmount?: BigNumber
  tokenDecimals: number
}

const PresaleContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  tokenAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [amount, setAmount] = useState(new BigNumber(0))
  const [isActive, setActive] = useState(true)
  const { account } = useWallet()
  const [total, setTotal] = useState(new BigNumber(0))
  const [ownToken, setOwnToken] = useState(new BigNumber(0))
  const [totalSoldToken, setTotalSoldToken] = useState(new BigNumber(0))
  const [leftToken, setLeftToken] = useState(new BigNumber(0))
  const [min, setMin] = useState(new BigNumber(0))
  const [max, setMax] = useState(new BigNumber(0))
  const [totalBNB, setTotalBNB] = useState(new BigNumber(0))
  const [tokenPrice, setTokenPrice] = useState(new BigNumber(0))
  const [hardcap, setHardcap] = useState(new BigNumber(0))
  const [rStep0, setRStep0] = useState(new BigNumber(0))
  const [rPercent0, setRPercent0] = useState(new BigNumber(0))
  const [rStep1, setRStep1] = useState(new BigNumber(0))
  const [rPercent1, setRPercent1] = useState(new BigNumber(0))
  const [rStep2, setRStep2] = useState(new BigNumber(0))
  const [rPercent2, setRPercent2] = useState(new BigNumber(0))
  
  const contractSellingToken = useERC20(tokenAddress)
  const [onPresentContributeModal] = useModal(
    <ContributeModal address={address} currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  const TranslateString = useI18n()
  useEffect(() => {
    const fetchV = async () => {
      const _total = new BigNumber(2).times(new BigNumber(10).pow(26))
      const _totalSoldToken = await contract.methods.tokenSold().call()
      const _leftToken = new BigNumber(_total).minus(new BigNumber(_totalSoldToken))
      const _active = await contract.methods.isPresaleOpen().call()
      const _totalBNB = await contract.methods.totalBNBAmount().call()
      const _min = await contract.methods.minEthLimit().call()
      const _max = await contract.methods.maxEthLimit().call()
      const _tokenRatePerEth = await contract.methods.tokenRatePerEth().call()
      const _tokenDecimal = await contract.methods.tokenDecimals().call()
      const _tokenPrice = ( new BigNumber(10).pow(Number(_tokenDecimal-18))).dividedBy(new BigNumber(_tokenRatePerEth))
      const _hardcap = await contract.methods.hardcap().call()
      const _rStep0 = await contract.methods.rStep(0).call()
      const _rPercent0 = await contract.methods.rPercent(0).call()
      const _rStep1 = await contract.methods.rStep(1).call()
      const _rPercent1 = await contract.methods.rPercent(1).call()
      const _rStep2 = await contract.methods.rStep(2).call()
      const _rPercent2 = await contract.methods.rPercent(2).call()
    
      setActive(_active)
      setLeftToken(_leftToken)
      setTotalSoldToken(_totalSoldToken)
      setTotal(_total)
      setTotalBNB(_totalBNB)
      setMin(_min)
      setMax(_max)
      setTokenPrice(_tokenPrice)
      setHardcap(_hardcap)
      setRStep0(_rStep0)
      setRPercent0(_rPercent0)
      setRStep1(_rStep1)
      setRPercent1(_rPercent1)
      setRStep2(_rStep2)
      setRPercent2(_rPercent2)
    }

    const fetch = async () => {
      // const balance = new BigNumber(await contract.methods.getTokensUnclaimed(account).call())
      const _amount = await contract.methods.usersInvestments(account).call()
      const _ownToken = await contractSellingToken.methods.balanceOf(account).call()    
      setOwnToken(_ownToken)
      setAmount(_amount)
    }

    if (account) {
      fetch()
    }
    fetchV()
  }, [account, contract.methods, contractSellingToken.methods, tokenDecimals, isActive, totalBNB, totalSoldToken, tokenPrice])

  return (
    <>
    {!isActive && <Heading size="lg" style={{textAlign:'center'}}>PreSale is not active</Heading>}
    <Row>
      
      <StyledPreSaleCard >
        <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584e9'}} >Buy </Heading>
      {!account && <UnlockButton fullWidth />}
        {account &&  (
        <LabelButton
          disabled={!(isActive)}
          buttonLabel='Contribute'
          label={`Your contribution (${currency})`}
          value={
            Number(getBalanceNumber(new BigNumber(amount)).toFixed(8)).toString()
          }
          onClick={onPresentContributeModal}
        />
        )}
        <RowItem>
          <Text mr='16px' color="textSubtle">Total Contributed: </Text>
          <Text mr='16px' color="text">{getBalanceNumber(totalBNB)} BNB</Text>
        </RowItem>
        <RowItem>
          <Text mr='16px' color="textSubtle">Hardcap: </Text>
          <Text mr='16px' color="text">{Number(hardcap)} BNB</Text>
        </RowItem>
       
      </StyledPreSaleCard>

      <StyledPreSaleCard >
        <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584e9'}}>Reward Steps </Heading>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle"> {'>'} Up To {Number(rStep0)}BNB - </Text>
          <Text fontSize='18px' mr='16px' color="text">bonus {Number(rPercent0) - 100}%</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle"> {'>'} Up To {Number(rStep1)}BNB - </Text>
          <Text fontSize='18px' mr='16px' color="text">bonus {Number(rPercent1) - 100}%</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle"> {'>'} Up To {Number(rStep2)}BNB - </Text>
          <Text fontSize='18px' mr='16px' color="text">bonus {Number(rPercent2) - 100}%</Text>
        </RowItem>
      </StyledPreSaleCard>
    </Row>

    <Row>
      <StyledPreSaleCard>
        <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584e9'}}>Info </Heading>
        <hr style={{borderColor:"#5178b3"}}/>
        <RowItem>
          <Text mr='16px' color="textSubtle">Owned SMOON: </Text>
          <CardValue value={getBalanceNumber(ownToken)} decimals={0} fontSize='16px' />
        </RowItem>
        <hr style={{borderColor:"#5178b3"}}/>
        <RowItem>
          <Text mr='16px' color="textSubtle">Total SMOON:</Text>
          <CardValue value={getBalanceNumber(total)} decimals={0} fontSize='16px' />
        </RowItem>
        <hr style={{borderColor:"#5178b3"}}/>
        <RowItem>
          <Text mr='16px' color="textSubtle">Total SMOON Sold:</Text>
          <CardValue value={getBalanceNumber(totalSoldToken)} decimals={0} fontSize='16px' />
        </RowItem>
        <hr style={{borderColor:"#5178b3"}}/>
        <RowItem>
          <Text mr='16px' color="textSubtle">SMOON Left:</Text>
          <CardValue value={getBalanceNumber(leftToken)} decimals={0} fontSize='18px' />
        </RowItem>
      </StyledPreSaleCard>
      <Spacer size='sm'/>

      <StyledPreSaleCard>
        <Heading size="lg" mb="0px" style={{textAlign:'center', color:'#7584e9'}}>PreSale  </Heading>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle">- SMOON Presale Price: </Text>
          <Text fontSize='18px' mr='16px' color="text">{Number(tokenPrice.toFixed(8))} BNB</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle">- SMOON Launch Price:  </Text>
          <Text fontSize='18px' mr='16px' color="text">0.000008 BNB</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle">- Unsold Supply will be burned!</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle">- Minimum Contribution - </Text>
          <Text fontSize='18px' mr='16px' color="text">{getBalanceNumber(min)} BNB</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px' color="textSubtle">- Maximum Contribution - </Text>
          <Text fontSize='18px' mr='16px' color="text">{getBalanceNumber(max)} BNB</Text>
        </RowItem>
      </StyledPreSaleCard>
    </Row>
    </>
  )
}

export default PresaleContribute
