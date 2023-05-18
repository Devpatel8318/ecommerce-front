import React, { useState } from 'react'
import styled from 'styled-components';

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const BigImage = styled.img`
    max-width:100%;
    max-height:200px;
`

const ImageButtons = styled.div`
    display:flex;
    gap:10px;
    flex-grow:0;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const ImageButton = styled.div`
    border: 0.1px solid lightGray;
    height:50px;
    padding:6px;
    cursor: pointer;
    border-radius:5px;
    ${props => props.active 
    ? `border-color:black` 
    : `background-color:transparent;opacity:0.5`}
`;

const BigImageWrapper = styled.div`
    text-align: center;
    min-height: 210px;
`;

function ProductImages({ images }) {

    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} alt="image" />
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton active={image === activeImage}
                        onClick={() => setActiveImage(image)}
                        key={image}>
                        <Image src={image} alt='image' />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}

export default ProductImages;