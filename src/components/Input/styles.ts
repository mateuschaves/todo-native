import styled from 'styled-components/native';
import theme from '~/theme/theme';

export const Container = styled.View`
    justify-content: center;
    align-items: center;

    flex-direction: row;

    transform: translateY(-25px);

    width: 100%;
`;


export const InputText = styled.TextInput`
    flex: 1;

    background-color: ${theme.colors.gray500};
    color: ${theme.colors.gray100};

    height: 54px;

    border-radius: 8px;

    margin-right: 8px;
    padding: 0 10px;

    font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${theme.colors.blueDark};

    width: 52px;
    height: 52px;

    border-radius: 8px;

    justify-content: center;
    align-items: center;
`