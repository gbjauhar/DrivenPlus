import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import back from "./img/arrow-back-outline.svg"

export default function UserUpdatePage() {
    const { user } = useContext(AuthContext)
    const [form, setForm] = useState({ name: user.name, cpf: user.cpf, email: user.email, currentPassword: user.password, newPassword: "" })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(form)
    }

    function post(e) {
        e.preventDefault()
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.put("https://mock-api.driven.com.br/api/v4/driven-plus/users/", form, config)
    }

    return (
        <Container>
            <Link to={`/users/${user.id}`}>
                <img src={back} />
            </Link>
            <InputsContainer onSubmit={post}>
                <input
                    placeholder={user.name}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    placeholder={user.cpf}
                    disabled />
                <input
                    placeholder={user.email}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Senha atual"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                />
                <input
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

const InputsContainer = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`