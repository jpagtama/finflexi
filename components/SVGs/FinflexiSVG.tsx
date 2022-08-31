import {useEffect} from 'react'
import styles from '../../styles/landing/FinflexiSVG.module.css'

interface Props {
  introEndHandler: () => void
}

const FinflexiSVG = (props: Props) => {

  return (
    <svg className={styles.finflexiIntro} width="293" height="259" viewBox="0 0 293 259" fill="none" xmlns="http://www.w3.org/2000/svg" onAnimationEnd={props.introEndHandler}>
      <path id="finflexi" d="M2 146.5C4.5 151.5 12.7 156.5 23.5 156.5C37 156.5 86.5 2 43 2C-0.5 2 20.5 256.5 43 256.5C56 256.5 52.5 188.5 43 156.5C49.1667 156.167 64.9 157.2 70.5 154C76.1 150.8 83 127 79 127C75 127 78.3336 156.5 88 156.5C98.5 156.5 109 103 105.5 154C105.5 127 120 119.372 120 131C120 146.5 136.867 158.542 140.5 154C152.5 139 181 7.5 145.5 7.5C110 7.5 141.437 256.5 152.5 256.5C168 256.5 166.333 190.833 158.5 156.5C192 154 192 68.5 187 68.5C180 68.5 180.507 147.338 190.5 154C199.5 160 218.5 134 217 131C215.5 128 209 127 202.5 133.5C196 140 196.5 154.312 208.5 154C214.038 153.856 222.929 151.746 228.5 146.5C234.071 141.254 232.5 128.5 235 128.5C237.5 128.5 244 134 244 140C244 146 229.5 155.2 232.5 154C240 151 254.5 126.5 257 128.5C259.5 130.5 247 136 247 142.5C247 150 259 154 262.5 154C273 154 274 128.5 272 128.5C270 128.5 270.5 166.5 291 148.5" stroke="url(#paint0_linear_1_4)" strokeWidth="3.5" strokeLinecap="round"/>
      <defs>
      <linearGradient id="paint0_linear_1_4" x1="2" y1="146" x2="310" y2="144.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="#F900BF"/>
      <stop offset="1" stopColor="#00FFAB"/>
      </linearGradient>
      </defs>
    </svg>
  );
}

export default FinflexiSVG;