import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '~/theme/theme';

import { Circle, Container, Title, TitleDone } from './styles';

interface TaskProps {
    title: string;
    done: boolean;
    onRemove: () => void;
    onPress: () => void;
}

const Task = ({ title, done, onRemove, onPress }: TaskProps) => {
  return <Container onPress={onPress}>
    {done ? <Ionicons name='checkmark-circle' size={22} color={theme.colors.purpleDark} /> : <Circle />}
    {done ? <TitleDone>{title}</TitleDone> : <Title>{title}</Title>}
    <Ionicons name='trash-outline' size={22} color={theme.colors.gray300} onPress={onRemove} />
  </Container>;
}

export default Task;