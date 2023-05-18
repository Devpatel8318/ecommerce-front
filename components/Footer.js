import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';



const FooterContainer = styled.footer`
  background-color: #222;
  padding: 10px 20px 20px 20px;
  text-align: center;
  margin-top:5vh;
`;

const FooterText = styled.p`
  color: #888;
  font-size: 1.2em;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const FooterLink = styled.a`
  color: #888;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 10px;
  }
`;

const SocialLink = styled.a`
  color: #888;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Footer = () => {
  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/b0211034c9.js" crossorigin="anonymous"></script>
      </Head>
      <FooterContainer>
        <FooterText>
          © {new Date().getFullYear()} DevCart
        </FooterText>
        <div>
          <SocialLink href="https://github.com/Devpatel8318" target='_blank'>
            <i className="fab fa-2x fa-github"></i>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/devpatel8318" target='_blank'>
            <i className="fab fa-2x fa-linkedin"></i>
          </SocialLink>
          <SocialLink href="https://www.instagram.com/___devpatell/" target='_blank'>
            <i className="fab fa-2x fa-instagram" ></i>
          </SocialLink>
        </div>
      </FooterContainer>
    </>
  );
};

export default Footer;
