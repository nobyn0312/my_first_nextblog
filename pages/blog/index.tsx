import Link from 'next/link'
import { client } from '../../lib/client'
import Container from '../../components/container'
import Meta from '../../components/Meta'
import Hero from '../../components/Hero'
import styles from '../../styles/blog.module.css'
import Image from 'next/image'
import eyecatch from 'images/blog.jpg'

type Blog = {
  id: string
  title: string
}

const Home = ({ blog }: { blog: Blog[] }) => {
  return (
    <Container>
          <div>
          <Meta
        pageTitle="ブログ"
        pageDesc="About development activities"
        // pageImg={eyecatch.src}
        // pageImgW={eyecatch.width}
        // pageImgH={eyecatch.height}
      />
            <Hero title="Blog" subtitle="Blog development activities" />
            <Image
          src={eyecatch}
          alt=""
          layout="responsive"
          sizes="(min-width:1152px) 1152px,100vw"
          priority
          placeholder="blur"
        />
        <ul className={styles.blogContainer}>
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>  
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
