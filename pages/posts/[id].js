import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '../../components/layout'
import styles from '../../styles/Post.module.css'

export default function Post({ title, date, updated, snippet, content }) {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
                <meta name="description" content={snippet} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h2 className={styles.title}>{title}</h2>
                <time dateTime={new Date()} className={styles.date}>{date}</time>
                {updated ? <time dateTime={new Date()} className={styles.updated}>Updated {updated}</time> : null}
                <div className={styles.body} dangerouslySetInnerHTML={{ __html: content }}></div>
            </main>
            <footer className={styles.footer}>
                <Link href="/posts"><a>Back to Posts</a></Link>
            </footer>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    // Get raw file contents from markdown file.
    const fileContents = fs.readFileSync(path.join(process.cwd(), 'posts', `${params.id}.md`), 'utf8');

    // Parse data from markdown file.
    const fileData = matter(fileContents);

    // Convert content to HTML.
    const parsedData = marked.parse(fileData.content);

    const dateFormat = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };

    return {
        props: {
            content: parsedData,
            title: fileData.data.title,
            date: new Date(fileData.data.date).toLocaleDateString('en-US', dateFormat),
            updated: fileData.data.updated ? new Date(fileData.data.updated).toLocaleDateString('en-US', dateFormat) : null,
            snippet: fileData.data.snippet
        }
    }
}

export async function getStaticPaths() {
    // Get all filenames of each post.
    const filenames = fs.readdirSync(path.join(process.cwd(), 'posts'));

    // Convert filenames to possible URL paths.
    const paths = filenames.map(f => {
        return {
            params: { id: f.replace(/.md$/, '') }
        }
    });

    return {
        paths: paths,
        fallback: false
    }
}