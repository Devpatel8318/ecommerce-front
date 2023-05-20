import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import Center from './Center';
import { CartContext } from './CartContext';

const StyleHeader = styled.header`
    background-color:#222;
`;

const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
    position: relative;
    z-index:15;
`;

const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;  
    padding: 20px 0;
    align-items: center;
`
const StyledNav = styled.nav`
    ${props => props.mobileNavActive ? `
        display:block;
        ` : `
        display:none;
    `}
    gap: 15px;
    position: fixed;
    top:0px;
    bottom:0;
    right:0;
    left:0;
    padding:90px 20px 20px;
    background-color:#222;
    z-index:14;

    @media screen and (min-width: 768px) {
        display: flex;
        position:static;
        padding: 0;
    }
`

const NavLink = styled(Link)`
    color:#aaa;
    text-decoration:none;
    display: block;
    padding:10px 0px;
    font-size: 1.3em;

    margin-top: 10px;
    @media screen and (min-width: 768px) {
        margin-top: 0%;
        font-size:1em;
        padding: 0px;
    }
`
const NavButton = styled.button`
    background-color: transparent;
    width:40px;
    height:40px;
    border:0;
    color:white;
    cursor:pointer;
    @media screen and (min-width: 768px) {
        display: none;
    }
    position: relative;
    z-index:15;
    
`;

function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
   
    return (
        <StyleHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>DevCart</Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts?.length > 0 ? cartProducts?.length : 0})</NavLink>
                    </StyledNav>
                    <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </NavButton>
                </Wrapper>
            </Center>
        </StyleHeader>
    )
}

export default Header;