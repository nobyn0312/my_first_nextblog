// 詳細ページ

import Container from "../../components/container";
import { client } from "../../lib/client";
import Image from "next/image";

import styles from './post.module.css'
import Meta from "../../components/Meta";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "../../components/two-column";
import PostBody from "../../components/post-body";
import Contact from "../../components/contact";

// 取得した記事のアイキャッチ
type Eyecatch = {
  url: string,
  height: number,
  width: number
}

// 取得した記事のスキーマ？情報
type Blog = {
  id: string,
  title: string,
  publishedAt: string,
  content: string,
  category: {
    name: string
  }
  eyecatch: Eyecatch
}



// 動的ページを設定するには必須
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' })


  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'blog', contentId: id })

  //console.log(data) // ここで取得したデータをログ出力
  return {
    props: {
      blog: data,
    },
  }
}


export default function BlogId({ blog}: { blog: Blog }) {
  const date = new Date(blog.publishedAt).toLocaleDateString()

  return (
    <Container>
      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
              {blog.eyecatch && <Image src={blog.eyecatch.url} alt="blog eyecatch" width={blog.eyecatch.width} height={blog.eyecatch.height} />}
              <h1 className={styles.title}>{blog.title}</h1>
              <p className={styles.date}><span style={{fontWeight:'bold'}}>Date:</span>&nbsp;{date}</p> 
              <div className={styles.post}
                dangerouslySetInnerHTML={{
                  __html: `${blog.body}`,
                }}
              /> 
          </PostBody>
        </TwoColumnMain>
        <TwoColumnSidebar>
          <Contact/>
        </TwoColumnSidebar>
      </TwoColumn>

    </Container>

  )
}