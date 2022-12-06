import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import Main from '@components/layouts/Main'
import Loading from '@components/UI/Loading'
import '@styles/globals.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const handleStart = (url: string) => setLoading(true)
    const handleComplete = (url: string) => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store} >
        {loading && <div className='loadingContainer' ><Loading /></div>}
        <DndProvider backend={HTML5Backend}>
          <Main >
            <Component {...pageProps} />
          </Main>
        </DndProvider>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
