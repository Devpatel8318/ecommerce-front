import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import Header from '@/components/Header'
import Input from '@/components/Input';
import Table from '@/components/Table';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';

const ColumnsWrapper = styled.div`
  display:grid;
  grid-template-columns:1fr;
  gap:40px;
  margin-top:40px;
  @media screen and (min-width: 800px) {
    grid-template-columns:1.2fr 0.8fr;
    }
`;

const Box = styled.div`
  border-radius:10px;
  padding:30px; 
`;

const ProductInfoCell = styled.td`
  padding:10px 0px;
`;

const ProductImageBox = styled.div`
  width:100px;
  height:100px;
  padding:2px;
  display: flex;
  margin: 0px auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width:80px;
    max-height:80px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`;

const QuantityLabel = styled.span`
  padding:2px 13px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
  padding:0px 15px;

  }
`;

const CityHolder = styled.div`
    display:flex;
    gap:5px;
`;







function cartPage() {

  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then(response => {
        setProducts(response.data);
      })
    } else {
      setProducts([]);
    }
  }, [cartProducts])

  useEffect(() => {
    if (window && window.location.href.includes('success')) {
      console.log("I am called");
      setSuccess(true);
      clearCart();
    }
  }, []);



  function moreOfThisProduct(productId) {
    addProduct(productId);
  };
  function lessOfThisProduct(productId) {
    removeProduct(productId);
  };

  let total = 0;
  if (cartProducts?.length > 0) {
    for (const productId of cartProducts) {
      const price = products.find(p => p._id === productId)?.price || 0;
      total += price;
    }
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, city, address, postalCode, cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (success) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks For your Order!</h1>
              <p>We will Email you when your order will be Sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }



  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1 style={{textAlign:"center"}}>Cart</h1>

            {!cartProducts?.length && (
              <div>Your Cart is Empty</div>
            )}

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="image" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts?.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ₹{cartProducts?.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>₹{total}</td>

                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <div style={{backgroundColor:"#fff",padding:"30px",borderRadius:"20px"}}>

                <h2>Order Information</h2>

                <Input type="text"
                  value={name}
                  name='name'
                  onChange={ev => setName(ev.target.value)}
                  placeholder='Name' />
                <Input type="email"
                  value={email}
                  name='email'
                  onChange={ev => setEmail(ev.target.value)}
                  placeholder='Email' />
                <Input type="text"
                  value={address}
                  name='address'
                  onChange={ev => setAddress(ev.target.value)}
                  placeholder='Address' />
                <CityHolder>
                  <Input type="text"
                    value={city}
                    name='city'
                    onChange={ev => setCity(ev.target.value)}
                    placeholder='City' />
                  <Input type="text"
                    value={postalCode}
                    name='postalCode'
                    onChange={ev => setPostalCode(ev.target.value)}
                    placeholder='Postal Code' />
                </CityHolder>
                <Button onClick={goToPayment} block black size={'l'}>Continue to payment</Button>
              </div>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}

export default cartPage;