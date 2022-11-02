import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'

interface Props {
  children: React.ReactNode
}

const Main = (props: Props) => {
  return (
    <main id="main">
      <Header />
      {props.children}
      <Footer />
    </main>
  )
}

export default Main