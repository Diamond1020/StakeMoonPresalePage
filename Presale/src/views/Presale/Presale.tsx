import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import { usePresaleContract } from 'hooks/useContract'
import Hero from './components/Hero'
import PresaleContribute from './components/PresaleContribute'
import Divider from './components/Divider'


const Presale = () => {
  const { account } = useWallet()
  // presale contract address
  const presaleContract = "0xB0bf08Cd1e45cF16c214F88d1C79a89B13082a0e"
  // token address
  const currencyAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  const tokenAddress = "0x9e69aace82083a2ffacce9947a587c36cdbccb31"
  const contract = usePresaleContract(presaleContract)
  return(
    <>
      <Page>
      <Hero />
      <Divider />
      <PresaleContribute
        address = {presaleContract}
        currency = "BNB"
        currencyAddress = {currencyAddress}
        tokenAddress = {tokenAddress}
        tokenDecimals = {18}
        contract = {contract}
      />
      </Page>
    </>
  )
}

export default Presale
