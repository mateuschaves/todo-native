import styled from 'styled-components/native';
import theme from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray600};
`;

export const Cards = styled.View``

export const Info = styled.View`
  flex-direction: row;

  justify-content: space-between;

  margin-bottom: 16px;
`

export const Body = styled.View`
  flex: 1;
  
  align-self: center;

  width: 90%;
`