import React from 'react';

import { Body, Container, Info } from './styles';
import Header from '~/components/Header';
import Input from '~/components/Input';
import { FlatList } from 'react-native';
import Task from '~/components/Task';
import TaskMetric from '~/components/TaskMetric';
import theme from '~/theme/theme';
import Divider from '~/components/Divider';
import { StatusBar } from 'expo-status-bar';

const tasks = [
  {
    id: 1,
    title: 'Estudar React Native ASDKAJDKJSDKAJSDKAJSDKASJDKAJSDKJASKDJASKDJAKSDJKASDJKASDJKASJDKASJDKASJDKASJDKASJDKAJSDKASJDKAJSDKAJSDKJASD',
    done: false,
  },
  {
    id: 2,
    title: 'Estudar ReactJS',
    done: false,
  },
  {
    id: 3,
    title: 'Estudar NodeJS',
    done: false,
  },
  {
    id: 4,
    title: 'Estudar TypeScript',
    done: false,
  },
  {
    id: 5,
    title: 'Estudar NextJS',
    done: false,
  }
]


const Home: React.FC = () => {
  return <Container>
    <StatusBar style='light' />
    <Header />
    <Body>
      <Input />
      <Info>
        <TaskMetric title='Criadas' badgeText='5' titleColor={theme.colors.blue}/>
        <TaskMetric title='Concluídas' badgeText='2' titleColor={theme.colors.purple}/>
      </Info>
      <Divider />
      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Task title={item.title} />)}
      />
    </Body>
    
  </Container>;
}

export default Home;