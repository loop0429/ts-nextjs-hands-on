// _documentには、サーバーサイドのみで実行される共通処理を記述する
// NextDocumentContextには、request/responseが含まれている

import * as React from 'react'
import Document, { NextDocumentContext } from 'next/document'
// scoped cssはSSRで非対応なため、styled-componentsを導入
import { ServerStyleSheet } from 'styled-components'
import DefaultLayout from '../layouts/index'
// ______________________________________________________
//
export default class extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheet.collectStyles(<App {...props} />)
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [...(initialProps.styles as any), ...sheet.getStyleElement()]
    }
  }
  render() {
    return <DefaultLayout />
  }
}
