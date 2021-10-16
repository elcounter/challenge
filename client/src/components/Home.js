import React from 'react';

import styled from 'styled-components';

class Home extends React.Component {
    render() {
        return (
          <Section>
            <Title>Challenge JS</Title>

            <SubTitle>Objectif :</SubTitle>
            <Para>Créer un outil de gestion des hébergements</Para>

            <SubTitle>Description :</SubTitle>
            <Para>L’équipe Simplon.Prod gère de nombreux hébergements et la multiplication des dates, des
            hébergeurs et des outils génèrent des oublis dans les re-souscriptions des différents
            hébergements.</Para>

            <SubTitle>Le système doit permettre :</SubTitle>
            <List>
              <Puce><Green>☑</Green> D’ajouter un nouveau projet (avec id, nom client, nom projet, domaine, tarif hébergement
              mensuel, date de début hébergement, date de fin hébergement)</Puce>
              <Puce><Green>☑</Green> De supprimer l’ensemble des informations</Puce>
              <Puce><Red>☑</Red> De modifier l’ensemble des informations</Puce>
              <Puce><Green>☑</Green> D’accéder à une liste de tous les hébergements</Puce>
              <Puce><Red>☑</Red> De pouvoir opérer des filtres / tris sur l’ensemble des colonnes</Puce>
              <Puce><Red>☑</Red> D’alerter via un mail de rappel à prod@simplon.co 1 mois avant la fin de l’hébergement
              (en rappelant les infos liées au projet), de faire un autre rappel la veille de la fin de
              l’hébergement</Puce>
              <Puce><Red>☑</Red><Green>☑</Green> Le système doit être accessible en consultation via un mot de passe admin</Puce>
              <Puce><Red>☑</Red><Green>☑</Green> Le système doit être accessible en consultation / edition via un mot de passe super
              admin</Puce>
            </List>

            <SubTitle>Le design :</SubTitle>
            <Para>Est libre mais nous serons attentifs à la clarté et à l’esthétique (ex couleurs en
            fonction du temps restant etc)</Para>

            <SubTitle>Modalités :</SubTitle>
            <Para>Open bar, vous avez le choix des technos, il faudra juste expliciter vos choix.</Para>

            <SubTitle>Livrable :</SubTitle>
            <List>
              <Puce>↓ Lien vers le code source versionné dans GitHub</Puce>
              <Puce><Link target="new" href="https://github.com/PierreBerthelemy/challenge-js">GitHub Repository</Link></Puce>
              <Puce>↓ Document explicitant les différents choix techniques</Puce>
              <Puce><Link target="new" href="https://github.com/PierreBerthelemy/challenge-js/blob/master/README.md">README</Link></Puce>
            </List>
          </Section>
        );
    }
}
  
export default Home;

const Section = styled.section`
  width: 60%;
  margin: 2rem auto;
  animation: apparition 2s;
  -webkit-animation: apparition 2s;
  -moz-animation: apparition 2s;
  -o-animation: apparition 2s;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Para = styled.p`
  margin-bottom: 15px;
`;

const List = styled.ul`
  margin-bottom: 15px;
`;

const Puce = styled.li`
  list-style: circle;
  margin-left: 25px;
`;

const Red = styled.span`
  color: red;
  font-size: 24px
`;

const Green = styled.span`
  color: green;
  font-size: 24px
`;

const Link = styled.a`
  color: blue;
  text-decoration: none;
  font-size: 20px
`;