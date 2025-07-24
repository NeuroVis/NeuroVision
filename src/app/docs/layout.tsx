import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { ReactNode } from "react";

export default async function RootLayout({ children }: {children: ReactNode}) {
  // @ts-ignore
  const files = (await getPageMap('/')).find(el => el.name === 'docs').children;

  console.log(files);

  return (
    <Layout
      // @ts-ignore
      pageMap={files}
    >
      {children}
    </Layout>
  )
}