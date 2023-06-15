// 詳細ページ

import { client } from "../../lib/client";
import Image from "next/image";

type Eyecatch = {
  url: string,
  height: number,
  width: number
}

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

export default function BlogId({ blog }: { blog: Blog }) {
  const date = new Date(blog.publishedAt).toLocaleDateString()

  return (
    <main>
      {blog.eyecatch && <Image src={blog.eyecatch.url} alt="blog eyecatch" width={blog.eyecatch.width} height={blog.eyecatch.height} />}

      <h1>{blog.title}</h1>
      <p>{date}</p>
      <p>{blog.category && blog.category.name}</p>
      {blog.content && (
        <div>
          dangerouslySetInnerHTML={{ _html: `${blog.content}` }}
        </div>
      )}
    </main>
  )
}

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