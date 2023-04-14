import styled from 'styled-components/native';
import theme from '~/theme/theme';

export const Container = styled.TouchableOpacity`
    background-color: ${theme.colors.gray500};
    border-radius: 8px;

    flex-direction: row;
    align-items: center;

    justify-content: space-around;

    height: 64px;

    margin-top: 12px;

    padding: 8px 12px;
`;

export const Title = styled.Text`
    flex: 1;

    color: ${theme.colors.gray100};
    text-align: left;

    font-size: 14px;
    font-weight: 700;

    margin-right: 16px;
    margin-left: 8px;
`

export const TitleDone = styled(Title)`
    text-decoration: line-through;
    color: ${theme.colors.gray300};

    text-decoration-color: ${theme.colors.gray300};
`

export const Circle = styled.View`
    width: 22px;
    height: 22px;

    border-radius: 20px;

    border-color: ${theme.colors.blue};
    border-width: 1px;
`