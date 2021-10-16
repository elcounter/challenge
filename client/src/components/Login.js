import React, { Component } from 'react'
import axios from 'axios';

import styled from 'styled-components';

class Login extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        name: "",
        email: "",
        password: "",
        inputType: "password",
        eyeType: "fas fa-eye-slash",
        users: [],
        response: true
    };
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.passwordValid = this.passwordValid.bind(this)
      this.hiddenPassword = this.hiddenPassword.bind(this)
    }

    componentDidMount(){
      this.getUsers()
    }

    handleInputChange(event) {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({
        [name]: value,
      })
    }
    
    handleSubmit (event) {
      event.preventDefault()
      this.passwordValid()
    }
    
    passwordValid () {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      fetch(`http://localhost:4000/api/check_password?email=${data.email}&password=${data.password}`, {
        headers: { "content-type": "application/json" },
      })
      .then(response => {
        console.log(response)
        if (response.status === 500 || !response) {
          this.setState({
            response: false
          })
        }
       return response.json();
      })
      .then(results => {
        console.log(results)
        if (!results) {    
          this.setState({
            response: false
          })
        } else {
          sessionStorage.setItem('user', JSON.stringify(results))
        }
      })
      .catch(function(error) {
        console.log(error)
      })  
    }

    hiddenPassword () {
      if(this.state.inputType === "password") {
        this.setState({
          inputType: "text",
          eyeType: "far fa-eye"
        })
      } else {
        this.setState({
          inputType: "password",
          eyeType: "fas fa-eye-slash"
        })
      }
    };

    getUsers() {
      const url= `http://localhost:4000/api/users`;
        axios.get(url)
        .then(res => {
           this.setState({users: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
      let wrongPassword 

      if (!this.state.response) {
        wrongPassword = <Alerte>⚠️ Identifiant ou mot de passe incorrect</Alerte> 
      } 
        return (
          <Section>
            <Form>
              <Block>
                <Label>Email</Label>
                <Input type="text" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} name="email" required ></Input>
              </Block>
              <Block>
                <Label>Mot de passe</Label>
                <Input type={this.state.inputType} placeholder="Mot de passe" value={this.state.password} onChange={this.handleInputChange} name="password" required ></Input>
                <Eye className={this.state.eyeType} onClick={this.hiddenPassword}></Eye>
              </Block>
              {wrongPassword}
              <Block>
                <Button type="submit" onClick={this.handleSubmit}>Connexion</Button>
              </Block>
            </Form>
            <Span>Enregistrez-vous <Link href="/register">ici</Link> </Span>
            <br/>
            <Span>Nos utilisateurs enregistrés :</Span>
            {this.state.users.map((user, i) => {
              return (
                <List key={i} index={i}>
                  <Puce>{user.name} - {user.email}</Puce>
                </List>
              )
            })}
          </Section>
        );
    }
}
  
export default Login;

const Section = styled.section`
  margin: 1rem auto;
  width: 50%;
  animation: apparition 2s;
  -webkit-animation: apparition 2s;
  -moz-animation: apparition 2s;
  -o-animation: apparition 2s;
`;

const Form = styled.form`
  width: 100%;
  margin: 5rem auto
`;

const Alerte = styled.span`
  display: block;
  margin: auto;
  font-size: 24px;
  color: red;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Label = styled.label`
  width: 50%;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 50%;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  font-size: 22px;
  font-weight: 300;
`;

const Eye = styled.i`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: .5s;
  :hover{
    color: #C30044;
  }
`;

const Button = styled.button`
  box-shadow: 0px 5px 15px 0px rgba(50, 50, 50, 0.4);
  width: 50%;
  font-size: 28px;
  background-color: transparent;
  border: none;
  font-weight: 300;
  margin: 1rem auto;
  padding: 1rem;
  cursor: pointer;
  outline: none;
  color: #C30044;
  z-index: 5;
  position: relative;
  :hover {
    color: snow;
    border: none;
  }
  ::after{
    content: '';
    background-color: #C30044;
    width: 100%;
    height: 0%;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .3s ease-in-out;
  }
  :hover::after{
    height: 100%;
    z-index: -1;
  }
`;

const Span = styled.p`
  width: 50%;
  font-size: 24px;
  margin-bottom: 15px;
`;

const Link = styled.a`
  color: #C30044;
  text-decoration: none;
`;

const List = styled.ul`
  list-style: circle;
  margin-left: 25px;
`;

const Puce = styled.li`
  margin-bottom: 10px;
`;