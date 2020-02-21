// すべてのページコンポーネントで共通する処理を実行できる
// reduxのProviderを設け、Store初期データの注入など

import * as React from 'react'
import App, { Container, NextAppContext } from 'next/app'
// ______________________________________________________
//
export default class extends App {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
