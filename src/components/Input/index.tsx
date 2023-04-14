import React, { Ref } from "react";

import theme from "~/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Button, Container, InputText } from "./styles";
import { TextInput } from "react-native";

interface InputProps {
  onPress: () => void;
  inputRef: Ref<TextInput>;
  value: string;
  setValue: (value: string) => void;
}

const Input = ({ onPress, inputRef, value, setValue }: InputProps) => {
  return (
    <Container>
      <InputText
        placeholder="Adicione uma nova tarefa"
        placeholderTextColor={theme.colors.gray300}
        ref={inputRef}
        value={value}
        onChangeText={setValue}
      />
      <Button onPress={onPress}>
        <Ionicons
          name="add-circle-outline"
          size={22}
          color={theme.colors.gray200}
        />
      </Button>
    </Container>
  );
};

export default Input;
