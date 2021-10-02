import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/egg/2a.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const ethereum  = window

  // const addFabToken = function(){
  //   const tokenAddress = '0x2b7e9fdb348c58c7c67283fbfbd10128322bf8f9';
  //   const tokenSymbol = 'FAB';
  //   const tokenDecimals = 9;
  //   const tokenImage = 'http://placekitten.com/200/300';

  //   try {
  //     // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  //     const wasAdded = await ethereum.request({
  //       method: 'wallet_watchAsset',
  //       params: {
  //         type: 'ERC20', // Initially only supports ERC20, but eventually more!
  //         options: {
  //           address: tokenAddress, // The address that the token is at.
  //           symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
  //           decimals: tokenDecimals, // The number of decimals in the token
  //           image: tokenImage, // A string url of the token logo
  //         },
  //       },
  //     });

  //     if (wasAdded) {
  //       console.log('Thanks for your interest!');
  //     } else {
  //       console.log('Your loss!');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <CardImage src="/images/egg/2.png" alt="cake logo" width={64} height={64} />
        <Block>
          <Label>{TranslateString(544, 'BANA to Harvest')}</Label>
          <CakeHarvestBalance earningsSum={earningsSum}/>
          <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(546, 'BANA in Wallet')}</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              // onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting BANA')
                : TranslateString(999, `Add BANA to MetaMask `)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
