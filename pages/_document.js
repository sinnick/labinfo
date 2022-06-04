import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Lab Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='bg-gray-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}