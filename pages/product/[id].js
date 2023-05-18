import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useContext } from 'react'
import styled from 'styled-components';
import Product from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import CartIcon from '@/components/icons/CartIcon';
import { CartContext } from '@/components/CartContext';

const Title = styled.h1`
    font-size:1.7rem;
`;

const ColWrapper = styled.div`
    display:grid;
    grid-template-columns:1fr;
    gap:40px;
    margin-top:40px;
    @media screen and (min-width: 768px) {
        grid-template-columns:0.8fr 1.2fr;
    }
    @media screen and (min-width: 1200px) {
        grid-template-columns:1fr 1fr;
    }
`;
const WhiteBox = styled.div`
  background-color:#fff;
  border-radius:10px;
  padding:30px; 

`;

const PriceRow = styled.div`
    gap:20px;
    display:flex;
    align-items: center;
`;


function ProductPage({ product }) {

    const { addProduct } = useContext(CartContext);

    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product?.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product?.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <Title>
                                ₹{product.price}
                            </Title>
                            <div>
                                <Button size={'l'} onClick={() => addProduct(product._id)} style={{ padding: '10px 22px' }} black>
                                    <CartIcon />
                                    Add to Cart
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    )
}

export default ProductPage;

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}