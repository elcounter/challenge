import React from 'react';

import styled from 'styled-components';
import axios from 'axios';

class Hostings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostings: [],
            modal: false,
            clientName: "",
            projectName: "",
            domainName: "",
            price: 0,
            startDate: "",
            endDate: "",
            filterValue: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.post_data = this.post_data.bind(this)
        this.filterByValue = this.filterByValue.bind(this)
      }

    getAllHosting() {
        const url= `http://localhost:4000/api/hostings`;
          axios.get(url)
          .then(res => {
             this.setState({hostings: res.data})
          })
          .catch(err => {
              console.log(err);
          })
    }

    deleteHostings(hostingId) {
      const url= `http://localhost:4000/api/hostings`;
      if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
        axios.delete(url, { 
          data : { id: hostingId }
        })
        .then(() => {
          this.getAllHosting();
          alert("Utilisateur correctement supprimé")
        })
        .catch(err =>{
          console.log(err);
        })
      }
    }

    updateHostings(){
      console.log('to do');
    }

    componentDidMount() {
        this.getAllHosting();
    }

    handleInputChange (event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      })
    }

    openModal(){
      this.setState({
        modal: true
      })
    }

    closeModal(){
      this.setState({
        modal: false
      })
    }

    handleSubmit (event) {
      event.preventDefault()
      if (!this.state.clientName || !this.state.projectName || !this.state.domainName || !this.state.price || !this.state.startDate || !this.state.endDate) {
        window.alert("Merci de remplir tous les champs")
      } else {
        this.post_data()
        window.alert('Hébergement correctement enregistré')
        this.closeModal();
      }
    }
  
    post_data () {
      const post_data = {
        clientName: this.state.clientName,
        projectName: this.state.projectName,
        domain: this.state.domainName,
        hostingPrice: this.state.price,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      fetch("http://localhost:4000/api/hostings", {
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

    filterByValue() {
      let filterValue = this.state.filterValue;
      console.log(filterValue);
      // .filter( hosting => hosting.clientName === filterValue);
    }

    render() {
        let mapOnHostings = this.state.hostings.map((hosting, i) => {
          return (
            <Row key={i} index={i}>
              <Cellule>{hosting.clientName}</Cellule>
              <Cellule>{hosting.projectName}</Cellule>
              <Cellule>{hosting.domain}</Cellule>
              <Cellule>{hosting.hostingPrice} €/mois</Cellule>
              <Cellule>{hosting.startDate}</Cellule>
              <Cellule>{hosting.endDate}</Cellule>
              <Cellule><Icone className="far fa-2x fa-edit" onClick={ () => this.updateHostings(hosting.id)}></Icone></Cellule>
              <Cellule><Icone className="far fa-2x fa-trash-alt" onClick={ () => this.deleteHostings(hosting.id)}></Icone></Cellule>
            </Row>
          )
        })
        return (
          <Section>
            <Head>
              <Title>Hébergements</Title>
              <Plus className="far fa-4x fa-plus-square" onClick={this.openModal}></Plus>
            </Head>
            {this.state.modal && <Modal>
              <PlusModal className="fas fa-2x fa-times" onClick={this.closeModal}></PlusModal>
              <Form>
                <Block>
                  <Label>Client</Label>
                  <Input type="text" placeholder="Nom du client" value={this.state.clientName} onChange={this.handleInputChange} name="clientName" required></Input>
                </Block>
                <Block>
                  <Label>Projet</Label>
                  <Input type="text" placeholder="Nom du projet" value={this.state.projectName} onChange={this.handleInputChange} name="projectName" required></Input>
                </Block>
                <Block>
                  <Label>Domaine</Label>
                  <Input type="text" placeholder="Nom du domaine" value={this.state.domainName} onChange={this.handleInputChange} name="domainName" required></Input>
                </Block>
                <Block>
                  <Label>Prix/mois</Label>
                  <Input type="number" placeholder="Prix mensuel" value={this.state.price} onChange={this.handleInputChange} name="price" required></Input>
                </Block>
                <Block>
                  <Label>Date de début</Label>
                  <Input type="date" placeholder="Date de début" value={this.state.startDate} onChange={this.handleInputChange} name="startDate" required></Input>
                </Block>
                <Block>
                  <Label>Date de fin</Label>
                  <Input type="date" placeholder="Date de fin" value={this.state.endDate} onChange={this.handleInputChange} name="endDate" required></Input>
                </Block>
                <Block>
                  <Button type="submit" onClick={this.handleSubmit}>Création</Button>
                </Block>
              </Form>
            </Modal>}

            <Filtre>
              <FilterButton onClick={this.filterByValue}>filtrer</FilterButton>
              <Search type="text" placeholder="Filtre" value={this.state.filterValue} onChange={this.handleInputChange} name="filterValue"></Search>
            </Filtre>

            <Table>
              <thead>
                <Row>
                    <THead>Client</THead>
                    <THead>Projet</THead>
                    <THead>Domaine</THead>
                    <THead>Prix</THead>
                    <THead>Date de début</THead>
                    <THead>Date de fin</THead>
                    <THead>Modifier</THead>
                    <THead>Supprimer</THead>
                </Row>
              </thead>
              <tbody>
                {mapOnHostings}
              </tbody>
            </Table>
          </Section>
        );
    }
}
  
export default Hostings;

const Section = styled.section`
  margin: 1rem auto;
  position: relative;
  width: 70%;
  animation: apparition 2s;
  -webkit-animation: apparition 2s;
  -moz-animation: apparition 2s;
  -o-animation: apparition 2s;
`;

const Head = styled.div`
  display: flex;
  width: 100;
  justify-content: space-between;
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  margin: 1rem auto;
  width: 100%;
  height: auto;
  background-color: snow;
  animation: apparition 2s;
  -webkit-animation: apparition .5s ease-in-out;
  -moz-animation: apparition .5s ease-in-out;
  -o-animation: apparition .5s ease-in-out;
  box-shadow: 0px 5px 15px 0px rgba(50, 50, 50, 0.4);
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 300;
  margin: 2rem 0;
`;

const Plus = styled.i`
  cursor: pointer;
  transition: .5s;
  margin: 1rem 0;
  :hover{
    color: #C30044;
  }
`;

const PlusModal = styled.i`
  cursor: pointer;
  transition: .5s;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  :hover{
    color: #C30044;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const THead = styled.th`
  border: 1px solid #ddd;
  font-size: 24px;
  padding: 8px;
  background-color: #444;
  color: snow;
  font-weight: 300
`;

const Cellule = styled.td`
  border: 1px solid #ddd;
  padding: 1rem;
`;

const Icone = styled.i`
  display: flex;
  justify-content: center;
  color: grey;
  transition: .5s;
  cursor: pointer;
  :hover {
    color: #C30044;
  }
`;

const Row = styled.tr`
  :nth-child(even){
    background-color: #f2f2f2;
  }
  :hover {
    background-color: #ddd;
  }
`;

const Form = styled.form`
  width: 100%;
  margin: 5rem auto
`;

const Block = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: center;
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

const Button = styled.button`
  box-shadow: 0px 5px 15px 0px rgba(50, 50, 50, 0.4);
  width: 50%;
  font-size: 28px;
  background-color: transparent;
  border: 1px solid grey;
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

const Filtre = styled.div`
  width: 100%;
  margin: 2rem auto;
`;

const Search = styled.input`
  width: 150px;
  height: 30px;
  border: none;
  border-bottom: 1px solid grey;
  padding-left: 15px;
  outline: none;
`;

const FilterButton = styled.button`
  margin-right: 15px;
  outline: none;
  cursor: pointer;
  padding: 1rem;
  font-size: 22px;
  text-transform: uppercase;
  background-color: #C30044;
  color: snow;
  border-radius: 5px;
  border: none;
`;

