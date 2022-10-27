import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import Loading from "./Loading.js"

export default function SubscriptionsPage() {
    const { user } = useContext(AuthContext)
    const [memberships, setMemberships] = useState([{ image: "", price: "" }])
    const [loadingPage, setLoadingPage] = useState(true)
    
    useEffect(() => {
        if(!user){
            return
        }
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config)
            .then(res => {
                setMemberships(res.data)
                setLoadingPage(false)
            })
    }, [user])
console.log(user)

if(loadingPage === true){
    return(
        <Loading/>
    )
}
    return (
        <Container>
            <h1>Escolha seu Plano</h1>
            {memberships.map((m) =>
                <Link to={`/subscriptions/${m.id}`}>
                    <PlanContainer>
                        <img src={m.image} />
                        <p>R$ {m.price}</p>
                    </PlanContainer>
                </Link>)}

        </Container>
    )
}


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 29px;
h1{

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
/* identical to box height */


color: #FFFFFF;
margin-bottom:24px;
}
`

const PlanContainer = styled.div`
display: flex;
width: 290px;
height: 170px;
border: 3px solid #7E7E7E;
border-radius: 12px;
margin-bottom: 10px;
justify-content: space-around;
align-items: center;
img{
    width: 140px;
height: 96px;
}
p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #FFFFFF;
text-decoration: none;

}
`