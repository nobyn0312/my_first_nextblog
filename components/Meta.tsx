import Head from 'next/head'
<link rel="icon" href="/favicon.png"/>


// サイトに関する情報
import { siteMeta } from '../lib/constants';
import { link } from 'fs';
const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

export default function Meta({pageTitle,pageDesc}){
  const title =pageTitle ? `${pageTitle} | ${siteTitle}`:siteTitle
  const desc =pageDesc ?? siteDesc

  return(
    <Head>
      <title>{title}</title>
      {/* <Meta name="description" content={desc}/> */}
      {/* <Meta property="og:description" content={desc}/> */}
    </Head>
  )
}