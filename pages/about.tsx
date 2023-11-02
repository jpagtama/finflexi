import Image from 'next/image'
import barChartIcon from '../public/barchart_icon_300x300.svg'
import cellPhoneIcon from '../public/cellphone_icon_300x300.svg'
import gearsIcon from '../public/gears_icon_300x300.svg'
import disclaimerIcon from '../public/disclaimer_icon_300x300.svg'
import styles from '@styles/about.module.css'

const about = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Us</h1>

            <div className={`${styles.section}`}>
                <div className={`${styles.secPt1}`}>
                    <h2>What is Finflexi?</h2>
                    <p>Finflexi is a research tool for tracking company data like stock-market prices, earnings, statistics, and more.</p>
                    <p>By removing all the distractions that typically come with fintech software, Finflexi makes it easier than ever to focus only on data that matters. Finflexi aims to educate and accelerate your knowledge on the companies you love.</p>
                </div>
                <div className={`${styles.secPt2}`}>
                    <Image src={barChartIcon} alt="bar chart icon" height="195" width="195" />
                </div>
            </div>

            <div className={`${styles.section}`}>
                <div className={`${styles.secPt1}`}>
                    <h2>Optimized User Experience</h2>
                    <p>Search your favorite companies from anywhere using the top search-bar. Save time and work more effectively when the information you need is just a search away.</p>
                </div>
                <div className={`${styles.secPt2} ${styles.orderBefore}`}>
                    <Image src={gearsIcon} alt="gears icon" height="195" width="195" />
                </div>
            </div>

            <div className={`${styles.section}`}>
                <div className={`${styles.secPt1}`}>
                    <h2>Everything in One Place</h2>
                    <p>Use the dashboard to track your favorite companies. The dashboard allows you to view price action at a glance and get the dates on upcoming earnings so you don&apos;t miss a beat. Tap the star icon to add a company to your favorites list so you can start tracking their data.</p>
                </div>
                <div className={`${styles.secPt2}`}>
                    <Image src={cellPhoneIcon} alt="cellphone icon" height="195" width="195" />
                </div>
            </div>

            <div className={`${styles.section}`}>
                <div className={`${styles.secPt1}`}>
                    <h2>Disclaimer</h2>
                    <p>All data provided on Finflexi is provided for informational purposes only, and is not intended for trading or investing purposes. Stock prices displayed in the ticker are from a subset of exchanges, this price does not represent the real-time price.</p>
                </div>
                <div className={`${styles.secPt2} ${styles.orderBefore}`}>
                    <Image src={disclaimerIcon} alt="disclaimer icon" height="195" width="195" />
                </div>
            </div>
        </div>
    )
}

export default about