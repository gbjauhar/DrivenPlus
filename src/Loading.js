import styled from "styled-components";
import { ProgressBar } from "react-loader-spinner"

export default function Loading() {
    return (
        <ContainerPage>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
            />
        </ContainerPage>
    )
}

const ContainerPage = styled.div`
display:flex;
align-items: center;
justify-content: center;
height: 100%;
width: 100%;
`