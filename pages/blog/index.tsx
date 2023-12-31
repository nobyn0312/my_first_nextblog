import Link from 'next/link'
import { client } from '../../lib/client'
import Container from '../../components/container'
import Meta from '../../components/Meta'
import Hero from '../../components/Hero'
import styles from '../../styles/blog.module.css'
import Image from 'next/image'
import eyecatch from 'images/blog.png'
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from '../../components/two-column'
import PostBody from '../../components/post-body'
import Contact from '../../components/contact'


// 取得した記事のアイキャッチ
type Eyecatch = {
  url: string,
  height: number,
  width: number
}

type Blog = {
  id: string
  title: string,
    eyecatch: Eyecatch
}

const Home = ({ blog }: { blog: Blog[] }) => {
  return (
    <Container>

      <Meta
        pageTitle="ブログ"
        pageDesc="About development activities"
      />

      <Hero title="Blog" subtitle="Blog development activities" />
      <Image
              src={eyecatch}
              alt=""
              layout="responsive"
              sizes="(min-width:480) 480,100vw"
              priority
              placeholder="blur"
            />

      <TwoColumn>
        <TwoColumnMain>
          <PostBody>

            <ul className={styles.blogContainer}>
              {blog.map((blog) => (
                <li  key={blog.id}>
                  
                  <Link href={`blog/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </PostBody>
        </TwoColumnMain>

        <TwoColumnSidebar>
          <Contact />
        </TwoColumnSidebar>
      </TwoColumn>

    </Container>

  )
}

export default Home

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' })

  return {
    props: {
      blog: data.contents,
    },
  }
}
