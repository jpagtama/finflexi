import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
}

const Main = (props: Props) => {
  const router = useRouter()

  return (
    <main id="main">
      {router.asPath !== '/verify-request' && <Header />}
      {props.children}
      <Footer />
    </main>
  )
}

export default Main