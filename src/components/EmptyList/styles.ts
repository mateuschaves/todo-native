import styled from 'styled-components/native';
import theme from '~/theme/theme';

export const Container = styled.View`
    justify-content: center;
    align-items: center;

    margin-top: 58px;
`;


export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;

    margin-top: 16px;

    color: ${theme.colors.gray300};
`

export const Subtitle = styled.Text`
    font-size: 14px;
    font-weight: normal;

    color: ${theme.colors.gray300};
`