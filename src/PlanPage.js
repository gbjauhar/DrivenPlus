import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import back from "./img/arrow-back-outline.svg"
import money from "./img/fa-solid_money-bill-wave.svg"
import list from "./img/fluent_clipboard-task-list-rtl-20-regular.svg"

export default function PlanPage() {
    const { id } = useParams()
    const { user, setUser } = useContext(AuthContext)
    const config = { headers: { "Authorization": `Bearer ${user.token}` } }
    const [plans, setPlans] = useState({})
    const [perks, setPerks] = useState([])
    const [form, setForm] = useState({
        membershipId:1,
        cardName: "",
        cardNumber: "",
        securityNumber: "",
        expirationDate: ""
    })

   
           

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, config)
            .then(res => {
                setPlans(res.data)
                setPerks(res.data.perks)})
    })

    function post(e){
        e.preventDefault()
       axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", form, config)
        .then(res => setUser(res.data))
        console.log(user)
    }

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <Container>
           {/*  <Link to="/subscriptions">
            <img src={back}/>
            </Link> */}
            <LogoContainer>
            <img src={plans.image}/>
            <h1>{plans.name}</h1>
            </LogoContainer>
            <Text>
                <Title>
                <img src={list}/>
            <h2>Benefícios:</h2>
            </Title>
            {perks.map((p) =>
            <p>{p.title}</p>)}
            <Title>
            <img src={money}/>
            <h2>Preço:</h2>
            </Title>
            <p>R$ {plans.price} cobrados mensalmente</p>
            </Text>
            <form onSubmit={post}>
                <input
                placeholder="Nome impresso no cartão"
                type="text"
                name="cardName"
                value={form.cardName}
                onChange={handleChange}/>
                <input
                placeholder="Dígitos do cartão"
                type="number"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}/>
                <BuyerData>
                <input
                placeholder="Código de segurança"
                type="number"
                name="securityNumber"
                value={form.securityNumber}
                onChange={handleChange}/>
                <input
                placeholder="Validade"
                name="expirationDate"
                value={form.expirationDate}
                onChange={handleChange}/>
                </BuyerData>
                <button type="submit">ASSINAR</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction:column;
margin-top: 87px;
form{
    display: flex;
    flex-direction: column;
    align-items: initial;
margin-left: 40px;
margin-top:35px;
}
input{
    background: #FFFFFF;
border-radius: 8px;
width: 299px;
height: 52px;
margin-bottom:8px;
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
    padding: 18px 122px;

width: 299px;
height: 52px;

background: #FF4791;
border-radius: 8px;
}

img{
    width: 28px;
height: 32px;
}
`
const BuyerData = styled.div`
display: flex;
input{
    width: 145px;
height: 52px;
}
`
const LogoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 10px;
img{
    width: 140px;
    height: 95px;
}
h1{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
/* identical to box height */


color: #FFFFFF;
}
`

const Text = styled.div`
display: flex;
flex-direction: column;
align-items: initial;
margin-left: 40px;
h2{
    margin-top: 12px;

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;

color: #FFFFFF;
}

p{

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
}

img{
    width: 18px;
height: 18px;
}
`

const Title = styled.div`
display:flex;
`