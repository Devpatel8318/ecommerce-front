import React from 'react'
import styled, { css } from 'styled-components';
import { primary } from '@/lib/colors';

export const ButtonStyle = css`
border:0;
padding: 5px 15px;
border-radius:5px;
cursor:pointer;
display: inline-flex;
align-items:center;
text-decoration: none;
font-family:"Poppins",sans-serif;
font-weight:500;
svg{
  height:20px;
  margin-right:5px;
}

${props => props.block && css`
display: block;
width: 100%;
`}

${props => props.white && !props.outline && css`
background-color:#fff;
color:#000;
`}


${props => props.white && props.outline && css`
background-color:transparent;
color:#fff;
border:1px solid white;
`}

${props => props.black && !props.outline && css`
background-color:black;
color:white;
`}

${props => props.black && props.outline && css`
background-color:transparent;
color:black;
border:1px solid black;
`}


${props => props.primary && !props.outline && css`
background-color:${primary};
border:1px solid ${primary};
color:#fff;
`}

${props => props.primary && props.outline && css`
background-color:transparent;
border:1px solid ${primary};
color:${primary};
`}


${props => props.size === 'l' && css`
font-size:1.2rem;
padding:10px 20px;     
svg{
  height:20px;
}
`}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest} >{children}</StyledButton>
  )
}

export default Button;