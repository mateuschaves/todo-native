import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '~/theme/theme';

import { Circle, Container, Title } from './styles';

interface TaskProps {
    title: string;
}

const Task = ({ title }: TaskProps) => {
  return <Container>
    <Circle />
    <Title numberOfLines={3} ellipsizeMode='tail'>{title}</Title>
    <Ionicons name='trash-outline' size={22} color={theme.colors.gray300} />
  </Container>;
}

export default Task;