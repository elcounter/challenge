import React, { Component } from 'react'

import styled from 'styled-components';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            confpassword: "",
            isSuperAdmin: 0,
            inputType: "password",
            eyeType: "fas fa-eye-slash"
      };
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.post_data = this.post_data.bind(this)
      this.hiddenPassword = this.hiddenPassword.bind(this)
    }

    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value,
        })
    }
    
    handleSubmit (event) {
        event.preventDefault()
        if (!this.state.name || !this.state.email || !this.state.password || !this.state.confpassword) {
          window.alert("Merci de remplir tous les champs")
        } else if (this.state.password !== this.state.confpassword) {
          window.alert("Veuillez saisir les mots de passe identiques")
        } else {
          this.post_data()
          window.alert('Utilisateur correctement enregistré')
          window.location.href = "http://localhost:1234/login";
        }
    }
    
    post_data () {
        const post_data = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          isSuperAdmin: this.state.isSuperAdmin   
        };
        fetch("http://localhost:4000/api/create_new_user", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(post_data)
        })
        .then(res => {
          return res.join
        })
          .catch(function(error) {
            console.log("Request failure : ", error);
          });
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

    render() {
        return (
          <Section>
            <Form>
            <Block>
                <Label>Nom</Label>
                <Input type="text" placeholder="Nom" value={this.state.name} onChange={this.handleInputChange} name="name" required></Input>
              </Block>
              <Block>
                <Label>Email</Label>
                <Input type="text" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} name="email" required></Input>
              </Block>
              <Block>
                <Label>Mot de passe</Label>
                <Input type={this.state.inputType} placeholder="Mot de passe" value={this.state.password} onChange={this.handleInputChange} required name="password"></Input>
                <Eye className={this.state.eyeType} onClick={this.hiddenPassword}></Eye>
              </Block>
              <Block>
                <Label>Confirmation</Label>
                <Input type={this.state.inputType} placeholder="Confirmation mot de passe" value={this.state.confpassword} onChange={this.handleInputChange} required name="confpassword"></Input>
              </Block>
              <Block>
                <Button type="submit" onClick={this.handleSubmit}>Création</Button>
              </Block>
            </Form>
          </Section>
        );
    }
}

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
  margin: 6rem auto;
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