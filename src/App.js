import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./GlobalStyle.js"
import LoginPage from "./LoginPage"
import SignUpPage from "./SignUpPage"
import SubscriptionsPage from "./SubscriptionsPage"
import HomePage from "./HomePage"
import PlanPage from "./PlanPage"
import { AuthContext } from "./AuthContext.js"
import UserPage from "./UserPage.js"
import UserUpdatePage from "./UserUpdatePage.js"
import { useLocalStorage } from "./useLocalStorage.js"


export default function App() {

    const [user, setUser] = useLocalStorage("user", null)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/subscriptions/:id" element={<PlanPage />} />
                   <Route path="/users/:id" element={<UserPage/>}/>
                    <Route path="/users/:id/update" element={<UserUpdatePage/>}/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}