import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";

export default function SignUpPage() {
    const [form, setForm] = useState({ email: "", name: "", cpf: "", password: "" })
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    function signup(e) {
        e.preventDefault()
        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", form)
        .then(navigate("/"))
        .catch(res => alert(res.response))

    }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <Container>
            <form onSubmit={signup}>
                <input
                    placeholder="Nome"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange} />
                <input
                    placeholder="CPF"
                    type="number"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange} />
                <input
                    placeholder="E-mail"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange} />
                <input
                    placeholder="Senha"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange} />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/">
                <p>Já possui uma conta? Entre</p>
            </Link>
        </Container>
    )
}



const Container = styled.div`
display:flex;
flex-direction: column;
margin-top: 134px;
align-items: center;
margin-left: auto;

form{
    display:flex;
flex-direction: column;
align-items: center;
}
input{
    width: 299px;
height: 52px;
background: #FFFFFF;
border-radius: 8px;
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
    padding: 18px 122px;
gap: 10px;
margin-top: 8px;
margin-bottom: 24px;

width: 298px;
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

p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-decoration-line: underline;

color: #FFFFFF;
}
`