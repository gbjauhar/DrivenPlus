import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import userPic from "./img/fa-solid_user-circle.svg"

export default function HomePage() {
    const { user, setUser } = useContext(AuthContext)
    const { id } = useParams()
    const config = { headers: { "Authorization": `Bearer ${user.token}` } }
    const [plan, setPlan] = useState({})
    const [perks, setPerks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/1`, config)
            .then(res => {
                setPlan(res.data)
                setPerks(res.data.perks)
            })
    })

    return (
        <Container>
            <User src={userPic} />
            <img src={plan.image} />
            <h1>Olá, fulano</h1>
            <Perks>
                {perks.map((p)=>
                <button>{p.title}</button>)}


            </Perks>
            <Footer>
                <Link to="/subscriptions">
                    <Change>Mudar plano</Change>
                </Link>
                <Cancel onClick={() => {
                    axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config)
                        .then(navigate("/subscriptions"))
                }}>Cancelar</Cancel>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top:23px;
h1{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
margin-bottom:53px;
color: #FFFFFF;

}
img{
    
}
`

const User = styled.img`
display: flex;
justify-content: flex-end;
align-items: flex-end;
`

const Perks = styled.div`
display: flex;
flex-direction: column;
align-items: center;
button{
    width: 299px;
height: 52px;
background: #FF4791;
padding: 18px 122px;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
margin-bottom:8px;
}
`

const Change = styled.button`
width: 299px;
height: 52px;
padding: 18px 122px;
background: #FF4791;
border-radius: 8px;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
`

const Cancel = styled.button`
width: 299px;
height: 52px;
padding: 18px 122px;
background: #FF4747;
border-radius: 8px;
margin-top:8px;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;

`

const Footer = styled.div`
display: flex;
flex-direction: column;
margin-bottom:12px;
`