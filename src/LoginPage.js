import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import logo from "./img/logo.svg"

export default function LoginPage() {
    const { user, setUser } = useContext(AuthContext)
    const [form, setForm] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    console.log(user)



    useEffect(() => {
        if (user) {
            user.membership === null ? navigate("/subscriptions") : navigate("/home")
        }
    }, [user])
    function post(e) {
        e.preventDefault()
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", form)
        promise.then(processSucess)
        promise.catch(res => alert(res.response.data))
    }
    function processSucess(res) {
        /*  const newUser = res.data
         newUser.token = res.data.token
         newUser.image = res.data.image
         localStorage.setItem("token", res.data.token)
         localStorage.setItem("image", res.data.image)
         setUser(newUser) */
        setUser(res.data)
        if (res.data.membership === null) {
            navigate("/subscriptions")
        } else {
            navigate("/home")
        }

    }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <Container>
            <img src={logo} />
            <form onSubmit={post}>
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
                <button type="submit">ENTRAR</button>
            </form>
            <Link to="/sign-up">
                <p>Não possui uma conta? Cadastre-se</p>
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

img{
    margin-bottom: 100px;
    width: 299px;
height: 49px;
}
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