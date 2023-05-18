import React, { useContext } from 'react'
import styled from 'styled-components';
import Button from './Button';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { CartContext } from './CartContext';

const ProductWrapper = styled.div`


`;


const WhiteBox = styled(Link)`
    background-color:#fff;
    padding:20px;
    text-align:center;
    align-items:center;
    justify-content:center;
    display:flex;
    border-radius:10px;
    img{
        max-width:100%;
        max-height:130px;
    }
    height:120px;
    
`;

const Title = styled(Link)`
    font-weight:normal;
    font-size:0.9rem;
    margin:0;
    text-decoration:none;
    color:inherit;
`;

const ProductInfoBox = styled.div`
    margin-top:5px;
`;

const PriceRow = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:2px;
`;

const Price = styled.div`
    font-size:1.1rem;
    font-weight:bold;
`;

function ProductBox({ _id, title, description, price, images }) {
    const url = '/product/' + _id;

    const { addProduct } = useContext(CartContext);

    return (

        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={images[0]} alt='image' />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        ₹{price}
                    </Price>
                    <Button onClick={() => addProduct(_id)} white ><CartIcon /></Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}

export default ProductBox;