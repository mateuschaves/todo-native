import React from "react";
import { Image } from "react-native";

import { Container, Subtitle, Title } from "./styles";

const EmptyList: React.FC = () => {
  return (
    <Container>
      <Image source={require("~/assets/images/clipboard.png")} />
      <Title>Você ainda não tem tarefas cadastradas</Title>
      <Subtitle>Crie tarefas e organize seus itens a fazer/Subtitle</Subtitle>
    </Container>
  );
};

export default EmptyList;
