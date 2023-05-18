import Center from '@/components/Center';
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose';
import React from 'react';
import styled from 'styled-components';
import Product from '@/models/Product';
import ProductBox from '@/components/ProductBox';
import Footer from '@/components/Footer';

const Title = styled.h1`
font-size:1.5em;
`;
const ProductsGrid = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  gap:30px;

`;
const WholeScreen = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
`;
const Main = styled.div`
flex-grow: 1;
`;


export default function ProductsPage({ newProducts }) {
  return (
    <WholeScreen>
      <Main>
        <Header />
        <Center>
          <Title>All Products</Title>
          <ProductsGrid>
            {newProducts?.length > 0 && newProducts.map(product => (
              <ProductBox {...product} key={product._id} />
            ))}
          </ProductsGrid>
        </Center>
      </Main>
      <Footer />
    </WholeScreen>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 } });
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}