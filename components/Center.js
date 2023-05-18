import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    max-width:800px;
    margin: 0 auto;
    padding: 0 20px;

    @media screen and (min-width: 890px) {
      max-width:1000px;
      padding-left:50px;
      padding-right:50px;
    }
    @media screen and (min-width: 1000px) {
      max-width:1500px;
      padding-left:50px;
      padding-right:50px;


    }
`;

function Center({ children }) {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

export default Center   