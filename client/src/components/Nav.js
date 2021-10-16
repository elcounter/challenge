import React from 'react';

import styled from 'styled-components';

class Nav extends React.Component {
    render() {
        return (
          <Section>
            <List>
              <li><Puce href="/" Component="Home">accueil</Puce></li>
              <li><Puce href="/hostings" Component="Hostings">Hébergements</Puce></li>
              <li><Puce href="/login" Component="Login">Connexion</Puce></li>
            </List>
            <MenuBurger>
              <Line></Line>
              <Line></Line>
              <Line></Line>
            </MenuBurger>
          </Section>
        );
    }
}
  
export default Nav;

const Section = styled.nav`
  box-shadow: 0px 5px 15px 0px rgba(50, 50, 50, 0.4);
  background-color: #C30044;
  height: 80px;
  width: 100%;
  position: relative;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: auto;
  width: 50%;
  line-height: 80px;
  @media (max-width: 1280px) {
    width: 90%;
  }
  @media (max-width: 666px) {
    display: none;
  }
`;

const MenuBurger = styled.div`
  display: none;
  @media (max-width: 666px) {
    outline: none;
    display: block;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translate(-5%, -50%);
    z-index: 9;
  }
`;

const Line = styled.div`
  width: 30px;
  height: 3px;
  margin: 5px;
  background-color: snow;
  transition: all .3s ease-in-out;
`;

const Puce = styled.a`
  font-weight: 300;
  font-size: 28px;
  text-transform: uppercase;
  cursor: pointer;
  color: #ddd;
  transition: .5s;
  position: relative;
  text-decoration: none;
  :hover {
    color: snow;
  }
  ::after{
    content: '';
    background-color: #ddd;
    width: 0%;
    height: 2px;
    position: absolute;
    bottom: -4px;
    left: 0;
    transition: all .5s ease-in-out;
  }
  :hover::after{
    background-color: snow;
    width: 100%;
  }
`;