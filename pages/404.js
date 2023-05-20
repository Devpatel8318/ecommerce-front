import Center from '@/components/Center'
import Header from '@/components/Header'
import Head from 'next/head';
import React from 'react'
import styled from 'styled-components';

const Title = styled.h1`
    margin:0;
    font-weight:normal;
    font-size:1.7rem;
    @media screen and (min-width: 768px) {
        font-size:3rem;
    }
`;
const PageCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
`;
function ErrorPage() {
  return (
    <>
    <Head>
        <title>Dev Cart</title>
    </Head>
    <Header/>
    <PageCenter>
       <Title>Work in Progress..</Title>
    </PageCenter>
    </>
  )
}

export default ErrorPage