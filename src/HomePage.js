import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import userPic from "./img/fa-solid_user-circle.svg"
import Loading from "./Loading";

export default function HomePage() {
    const { user, setUser } = useContext(AuthContext)
    const [pageLoading, setPageLoading] = useState(true)
    const [plan, setPlan] = useState({})
    const [perks, setPerks] = useState([])
    const navigate = useNavigate()

     useEffect(() => {
        if(!user){
            return
        }
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${user.membership.id}`, config)
            .then(res => {
                setPlan(res.data)
                setPerks(res.data.perks)
                setPageLoading(false)
            })
            .catch(res => alert(res.response.data.message))
    }, [user]) 

if(pageLoading === true){
    return <Loading/>
}

    function cancelPlan(){
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config)
        .then(res => {
            setUser({...user, membership: null})
            console.log(res.data)
            navigate("/subscriptions")
        })
        .catch(res => 
            alert(res.response.data.message))
    }
    return (
        <Container>
            <Link to={`/users/${user.id}`}>
            <User src={userPic} />
            </Link>
            <PlanImage src={plan.image} />
            <h1>Olá, {user.name}</h1>
            <Perks>
                {perks.map((p)=>
                <a href={p.link} key={p.id}>
                <button>
                    {p.title}</button></a>
                )}


            </Perks>
            <Footer>
                <Link to="/subscriptions">
                    <Change>Mudar plano</Change>
                </Link>
                <Cancel onClick={cancelPlan}>Cancelar plano</Cancel>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
margin-top:23px;
h1{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
margin-bottom:53px;
color: #FFFFFF;
margin-top: 95px;

}

`

const User = styled.img`
display: flex;
justify-content: flex-end;
align-items: flex-end;
width: 34px;
height: 34px;
position: absolute;
right: 22px;
top: 22px;
`
const PlanImage = styled.img`
width:70px;
    height:50px;
    position: absolute;
    top: 32px;
    left: 38px;
`
const Perks = styled.div`
display: flex;
flex-direction: column;
align-items: center;
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
text-align: center;
color: #FFFFFF;
margin-bottom:8px;
}
a{
    text-decoration: none;
    color: #FFFFFF;

}
`

const Change = styled.button`
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
`

const Cancel = styled.button`
width: 299px;
height: 52px;
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
position: absolute;
display: flex;
flex-direction: column;
bottom:12px;
`