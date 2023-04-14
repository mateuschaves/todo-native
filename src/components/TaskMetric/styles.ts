import styled from 'styled-components/native';
import theme from '~/theme/theme';

export const Container = styled.View`
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.Text<{titleColor: string}>`
    color: ${props => props.titleColor || theme.colors.blue};
    font-size: 14px;
    font-weight: bold;
`;

export const Badge = styled.View`
    background-color: ${theme.colors.gray400};

    justify-content: center;
    align-items: center;

    width: 24px;
    height: 19px;

    border-radius: 30px;

    margin-left: 8px;
`;

export const BadgeText = styled.Text`
    color: ${theme.colors.gray200};

    font-size: 12px;
    font-weight: bold;
`;
