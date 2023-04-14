import React from 'react';

import theme from '~/theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Button, Container, InputText } from './styles';



const Input: React.FC = () => {
  return <Container>
    <InputText placeholder='Adicione uma nova tarefa' placeholderTextColor={theme.colors.gray300} />
    <Button>
      <Ionicons name='add-circle-outline' size={22} color={theme.colors.gray200} />
    </Button>
  </Container>;
}


export default Input;