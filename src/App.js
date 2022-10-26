import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./GlobalStyle.js"
import LoginPage from "./LoginPage"
import SignUpPage from "./SignUpPage"
import SubscriptionsPage from "./SubscriptionsPage"
import HomePage from "./HomePage"
import PlanPage from "./PlanPage"
import { useState } from "react"
import { AuthContext } from "./AuthContext.js"


export default function App() {
    const [user, setUser] = useState({
        "id": null,
        "name": "",
        "cpf": null,
        "email": "",
        "password": "",
        "membership": {
        },
        "token": ""
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/subscriptions/:id" element={<PlanPage />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}