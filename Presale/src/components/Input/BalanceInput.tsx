import React from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Input, { InputProps } from './Input'

interface Props extends InputProps {
  max?: number | string
  symbol?: string
  onSelectMax?: () => void
}

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledDiv = styled.div`
  margin-bottom: 20px;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.card};
  font-weight: 700;
`

const BalanceInput: React.FC<Props> = ({ max, symbol, onChange, onSelectMax, value }) => {
  const TranslateString = useI18n()

  return (
    <StyledDiv>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledDiv>
  )
}

export default BalanceInput
