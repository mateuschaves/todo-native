import React from 'react';

import { Container, Image } from './styles';

const Header: React.FC = () => {
  return <Container>
    <Image source={require('../../assets/images/logo.png')} />
  </Container>;
}

export default Header;