import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'
import Layout from '../components/layout'
import styles from '../styles/Posts.module.css'

export default function Posts({ posts }) {
    return (
        <Layout>
            <Head>
                <title>Posts</title>
                <meta name="description" content="List of posts." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Posts</h1>
                <Link href="/"><a>Back to Home</a></Link>
            </header>
            <main className={styles.main}>
                <ul className={styles.list}>
                    {posts.map(p => {
                        return (
                            <li className={styles.post} key={p.path}>
                                <Link href={p.path}><a className={styles.link}>{p.title}</a></Link>
                                <div className={styles.description}>{p.snippet}</div>
                                <div className={styles.date}>{p.date}</div>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </Layout>
    )
}

export function getStaticProps() {
    // Get all markdown files. (post data)
    const postFiles = fs.readdirSync(path.join(process.cwd(), 'posts'));

    // Parse meta data for all posts.
    let posts = postFiles.map(f => {
        const postContent = fs.readFileSync(path.join(process.cwd(), 'posts', f), 'utf8');
        const postData = matter(postContent);

        return {
            title: postData.data.title,
            date: new Date(postData.data.date),
            snippet: postData.data.snippet,
            path: `/posts/${f.replace(/.md$/, '')}`
        }
    });

    // Sort posts by date.
    posts.sort((a, b) => b.date - a.date);

    // Transform dates to strings and filter out posts whose date is in the future.
    posts = posts
        .filter(p => p.date <= new Date())
        .map(p => {
            return {
                ...p,
                date: p.date.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })
            }
        });

    return {
        props: {
            posts: posts
        }
    }
}