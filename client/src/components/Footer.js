import React from 'react';

import styled from 'styled-components';

class Footer extends React.Component {
    render() {
        return (
          <Section>
              <Copyright>Copyright 2019 © Pierre Berthélemy</Copyright>
          </Section>
        );
    }
}
  
export default Footer;

const Section = styled.nav`
  background-color: #777;
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Copyright = styled.p`
    text-align: center;
    line-height: 50px;
    color: snow;
`;
