import back from "./img/arrow-back-outline.svg"
import styled from "styled-components"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Link } from "react-router-dom"

export default function UserPage(){
    const {user} = useContext(AuthContext)
    console.log(user)
    return(
        <Container>
            <Link to="/home">
            <img src={back}/>
            </Link>
            <InputsContainer>
            <input
            placeholder={user.name}
            disabled/>
            <input
            placeholder={user.cpf}
            disabled/>
            <input
            placeholder={user.email}
            disabled/>
            <Link to={`/users/${user.id}/update`}>
            <button>ATUALIZAR</button>
            </Link>
            </InputsContainer>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
img{
    width: 28px;
height: 32px;
margin-bottom: 154px;
margin-top: 24px;
margin-left: 22px;
}

input{
    background: #EBEBEB;
border-radius: 8px;
width: 299px;
height: 52px;
margin-bottom: 16px;
}

input::placeholder{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;

color: #7E7E7E;
}

button{
    width: 299px;
height: 52px;
background: #FF4791;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;

}
`

const InputsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`