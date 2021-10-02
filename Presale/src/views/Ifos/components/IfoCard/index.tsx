import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Card, CardBody, CardRibbon } from '@pancakeswap-libs/uikit'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { usePresaleContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardTime from './IfoCardTime'
import IfoCardContribute from './IfoCardContribute'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.png')`};
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`
// 'coming_soon', 'live', 'finished'
const getStatus = "live"

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const {
    id,
    address,
    name,
    subTitle,
    description,
    minConstribution,
    maxConstribution,
    currency,
    currencyAddress,
    tokenDecimals,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    progress: 0,
  })
  const { account } = useWallet()
  const contract = usePresaleContract(address)

  const currentBlock = useBlock()
  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent(state.status, TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      // const startBlockNum = parseInt(startBlock, 10)
      // const endBlockNum = parseInt(endBlock, 10)

      const status = "live"
      // const totalBlocks = endBlockNum - startBlockNum
      // const blocksRemaining = endBlockNum - currentBlock

      // Calculate the total progress until finished or until start
      const progress = 0

      setState({
        isLoading: false,        
        status,
        progress,        
      })
    }

    fetchProgress()
  }, [currentBlock, contract, setState])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={isActive}>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} description={description} />
        {!account && <UnlockButton fullWidth />}
        <IfoCardContribute
          address={address}
          currency={currency}
          currencyAddress={currencyAddress}
          contract={contract}
          status={state.status}
          tokenDecimals={tokenDecimals}
        />
        <IfoCardDetails
          minConstribution={minConstribution}
          maxConstribution={maxConstribution}
        />
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
