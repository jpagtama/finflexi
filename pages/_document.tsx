import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Inter" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document