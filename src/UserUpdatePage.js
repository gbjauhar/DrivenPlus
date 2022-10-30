import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import back from "./img/arrow-back-outline.svg"
import React from 'react'

export default function UserUpdatePage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { user, setUser } = useContext(AuthContext)
    const [form, setForm] = useState({ name: "", cpf: user.cpf, email: "", currentPassword: ""})
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function post(e) {
     e.preventDefault()
     

       const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.put("https://mock-api.driven.com.br/api/v4/driven-plus/users/", form, config)
            .then(res => {
                setUser({ ...user, name: res.data.name, email: res.data.email, password: res.data.password })
                navigate(`/users/${id}`)
            })
            .catch(res => {
                console.log(res.response.data)
                alert(res.response.data.message)})
    }

    return (
        <Container>
            <Link to={`/users/${user.id}`}>
                <img src={back} alt="Back"/>
            </Link>
            <InputsContainer onSubmit={post}>
                <input
                    type="text"
                    placeholder={user.name}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    placeholder={user.cpf}
                    disabled
                />
                <input
                    type="email"
                    placeholder={user.email}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Senha atual"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Nova senha"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                />
                <button type="submit">SALVAR</button>
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
margin-bottom: 86px;
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

const InputsContainer = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`