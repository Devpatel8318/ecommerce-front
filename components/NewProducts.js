import React from 'react'
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

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

const Title = styled.h2`
  font-size:2rem;
  margin:30px 0 20px 0;
  font-weight:normal;
`;

function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
          {products?.length > 0 && products.map(product => (
            <ProductBox {...product} key={product._id}/>
          ))}
      </ProductsGrid>
    </Center>
  )
}

export default NewProducts;