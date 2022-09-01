import FinflexiSVG from '../SVGs/FinflexiSVG'
import styles from '../../styles/landing/AppIntro.module.css'

interface Props {
    introDoneHandler: () => void,
    endIntroHandler: () => void
}

const AppIntro = (props: Props) => {

    return (
        <section className={styles.introSection} onClick={props.endIntroHandler}>
            <FinflexiSVG introEndHandler={props.introDoneHandler} />
        </section>
    )
}

export default AppIntro