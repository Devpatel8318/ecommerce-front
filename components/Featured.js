import React, { useContext } from 'react'
import Center from './Center';
import styled from 'styled-components';
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { CartContext } from './CartContext';

const Bg = styled.div`
    background-color:#222;
    color:#fff;
    padding:50px 0;
`

const Title = styled.h1`
    margin:0;
    font-weight:normal;
    font-size:1.7rem;
    @media screen and (min-width: 768px) {
        font-size:3rem;
    }
`;

const Desc = styled.p`
    color:#aaa;
    font-size:0.8rem;
`;

const ColumnsWrapper = styled.div`
    display:grid;
    grid-template-columns: 1.1fr;
    gap:40px;
    img{
        max-width:100%;
        max-height:35vh;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1){
        order:2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1){
        order:0;
        img{
        max-width:100%;
        }
    }
    }
`;

const Column = styled.div`
    display:flex;
    align-items:center;
`;

const ButtonsWrapper = styled.div`
    display:flex;
    gap:10px;
    margin-top:25px;
`;


function Featured({ product }) {
    const { addProduct } = useContext(CartContext);

    function addFeaturedToCart() {
        addProduct(product._id);
    }

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>
                                {product.description}
                            </Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={"/product/" + product._id} white={1} outline={1}>Read More</ButtonLink>
                                <Button white onClick={addFeaturedToCart}>
                                    <CartIcon classes={"w-6 h-6"} />
                                    Add to Cart</Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1663348542/Croma%20Assets/Computers%20Peripherals/Laptop/Images/245233_0_l5bk1y.png/mxw_2736,f_auto" alt="image" />
                    </Column>
                </ColumnsWrapper>

            </Center>
        </Bg>
    )
}

export default Featured;