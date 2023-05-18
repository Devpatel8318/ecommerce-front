import React from 'react'
import styled from 'styled-components';

const StyledTable = styled.table`
    width:100%;
    text-align: center;
    th{
        text-align: center;
        text-transform: uppercase;
        color: #aaa;
        font-weight: 600;
        font-size: 0.8rem;
    }
    td{
    border-top:1px solid rgba(0,0,0,0.1);
    }
`;


function Table(props) {
    return (
        <StyledTable {...props} />
    )
}

export default Table;        