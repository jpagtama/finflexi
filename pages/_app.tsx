import type { AppProps } from 'next/app'
import Main from '../components/layouts/Main'
import {Provider} from 'react-redux'
import store from 'store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} >
      <Main >
        <Component {...pageProps} />
      </Main>
    </Provider>
  )
}

export default MyApp
