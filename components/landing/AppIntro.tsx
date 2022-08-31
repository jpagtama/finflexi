import FinflexiSVG from '../SVGs/FinflexiSVG'

interface Props {
    introEndHandler: () => void,
    endIntroHandler: () => void
}

const AppIntro = (props: Props) => {
    
    const introStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        zIndex: "10",
        position: "absolute",
        top: 0,
        backgroundColor: "#121212"
    } as React.CSSProperties

    return (
        <section style={introStyles} onClick={props.endIntroHandler}>
            <FinflexiSVG introEndHandler={props.introEndHandler} />
        </section>
    )
}

export default AppIntro