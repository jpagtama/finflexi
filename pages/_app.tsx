import {useState, useEffect} from 'react'
import type { AppProps } from 'next/app'
import {Provider} from 'react-redux'
import store from 'store'
import { useRouter } from 'next/router'
import Main from '@components/layouts/Main'
import Loading from '@components/UI/Loading'
import '@styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {

  //   console.log('router.asPath :>> ', router.asPath);
  //   console.log('is loading? :>> ', loading);
    // if (router.asPath !== '/') {
      const handleStart = (url: string) => setLoading(true) 
      const handleComplete = (url: string) => setLoading(false)

      router.events.on('routeChangeStart', handleStart)
      // console.log('route is changing')
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)
      // console.log('route is complete')

      return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
      }
    // }
    // console.log('loading? :>>', loading)
  }, [router])

  return (
    <Provider store={store} >
      {loading && <Loading />}
      <Main >
        <Component {...pageProps} />
      </Main>
    </Provider>
  )
}

export default MyApp
