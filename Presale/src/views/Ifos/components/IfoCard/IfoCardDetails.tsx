import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

export interface IfoCardDetailsProps {
  minConstribution: string
  maxConstribution: string
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
  margin-top: 32px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  minConstribution,
  maxConstribution,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{TranslateString(999, 'Min')}</Display>
          <Text>{minConstribution}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'Max')}</Display>
          <Text>{maxConstribution}</Text>
        </Item>
      </StyledIfoCardDetails>
    </>
  )
}

export default IfoCardDetails
