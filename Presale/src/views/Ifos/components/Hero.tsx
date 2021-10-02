import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: #fcdde0;
  // margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
// background-image: linear-gradient(180deg, #b35b04 0%,#e8c70a 100%);
  padding-bottom: 30px;
  padding-top: 60px;
  text-align: center;
  // margin-bottom: 32px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <Container>
        <Title>P r e s a l e</Title>
      </Container>
    </StyledHero>
  )
}

export default Hero
