import React from 'react';
import { View } from 'react-native';

import { Container, Title, Badge, BadgeText } from './styles';

interface TaskMetricProps {
    title: string;
    badgeText: string;
    titleColor: string;
}

const TaskMetric = ({title, badgeText, titleColor}: TaskMetricProps) => {
  return <Container>
    <Title titleColor={titleColor}>{title}</Title>
    <Badge>
        <BadgeText>{badgeText}</BadgeText>
    </Badge>
  </Container>;
}

export default TaskMetric;