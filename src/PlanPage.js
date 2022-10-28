import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import back from "./img/arrow-back-outline.svg"
import money from "./img/fa-solid_money-bill-wave.svg"
import list from "./img/fluent_clipboard-task-list-rtl-20-regular.svg"
import ReactModal from "react-modal";
import Loading from "./Loading.js"
import close from "./img/fa-solid_window-close.svg"

export default function PlanPage() {
    const { id } = useParams()
    const { user, setUser } = useContext(AuthContext)
    const [plans, setPlans] = useState({})
    const [perks, setPerks] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        membershipId: `${id}`,
        cardName: "",
        cardNumber: "",
        securityNumber: "",
        expirationDate: ""
    })




    useEffect(() => {
        if (!user) {
            return
        }
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, config)
            .then(res => {
                setPlans(res.data)
                setPerks(res.data.perks)
                setLoadingPage(false)
            })
            .catch(res => alert(res.response.data.message))
    }, [])

    function post() {
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", form, config)
            .then(res => {
                setUser({ ...user, membership: res.data.membership })
                console.log(user)
                navigate("/home")
            })
            .catch(res => alert(res.response.data))
    }

    function handleKeyUp(e) {
        e.target.maxLength = 5
        let value = e.target.value
        value = value.replace(/^(\d{2})(\d)/, "$1/$2")
        e.target.value = value

    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    if (loadingPage === true) {
        return (
            <Loading />
        )
    }
    return (
        <Container>
            <Link to="/subscriptions">
                <Arrow src={back} />
            </Link>
            <LogoContainer>
                <img src={plans.image} onClick={() => setModalIsOpen(true)
                } />
                <h1>{plans.name}</h1>
            </LogoContainer>
            <Text>
                <Title>
                    <img src={list} />
                    <h2>Benefícios:</h2>
                </Title>
                {perks.map((p, indx) =>
                    <p key={indx}>{indx + 1}. {p.title}</p>)}
                <Title>
                    <img src={money} />
                    <h2>Preço:</h2>
                </Title>
                <p>R$ {plans.price} cobrados mensalmente</p>
            </Text>
            <form onSubmit={(e) => {
                e.preventDefault()
                setModalIsOpen(true)
            }}>
                <input
                    placeholder="Nome impresso no cartão"
                    type="text"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange} />
                <input
                    placeholder="Dígitos do cartão"
                    type="number"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange} />
                <BuyerData>
                    <input
                        placeholder="Código de segurança"
                        type="number"
                        name="securityNumber"
                        value={form.securityNumber}
                        onChange={handleChange} />
                    <input
                        placeholder="Validade"
                        onKeyUp={handleKeyUp}
                        name="expirationDate"
                        value={form.expirationDate}
                        onChange={handleChange} />
                </BuyerData>
                <button>ASSINAR</button>
            </form>
            <ReactModal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={
                    {
                        overlay: {
                            background: "",

                        }, content: {
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            border: "",
                            position: "relative"
                        }
                    }}>
                <ImageClose src={close} onClick={() => setModalIsOpen(false)} />
                <ModalContainer>
                    <h1>Tem certeza que deseja assinar o plano {plans.name} (R$ {plans.price})?</h1>
                    <ButtonContainer>
                        <ModalNo onClick={() => setModalIsOpen(false)}>Não</ModalNo>
                        <ModalYes onClick={post}>SIM</ModalYes>
                    </ButtonContainer>
                </ModalContainer>
            </ReactModal>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction:column;
margin-top: 24px;
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
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;

}
`

const Arrow = styled.img`
    width: 28px;
height: 32px;
margin-left: 22px;
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
margin-top: 35px;
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


p{

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
}


`

const Title = styled.div`
display:flex;
align-items: flex-end;
h2{
    margin-top: 12px;

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;

color: #FFFFFF;
}

img{
    width: 18px;
height: 18px;
}
`

const ModalNo = styled.button`
width: 95px;
height: 52px;
background: #CECECE;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
margin-right: 14px;
color: #FFFFFF;

`

const ModalYes = styled.button`
width: 95px;
height: 52px;
background: #FF4791;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;

`

const ButtonContainer = styled.div`
display:flex;
margin-top: 47px;
align-items: center;
justify-content: center;
`




const ModalContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 230px;
margin-left: 40px;
height: 190px;
background: #FFFFFF;
border-radius: 12px;
margin-top: 210px;
font-family: 'Roboto';
                            font-style: "normal";
                            font-weight: 700;
                            font-size: 20px;
                            line-height: 21px;
                            text-align: center;
                            color: #000000;
                            padding-top: 28px;
                            padding-left: 22px;
                            padding-right: 22px;
`

const ImageClose = styled.img`
width: 28px;
height: 28px;
display: flex;
position: absolute;
right: 55px;
`