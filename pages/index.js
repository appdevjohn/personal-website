import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import profilePic from '../public/profile_pic.jpeg'

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>John Champion</title>
                <meta name="description" content="John Champion's personal website." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <Image src={profilePic} width="200" height="200" alt="John Champion" className={styles.profilePic} />
                <h1 className={styles.title}>John Champion</h1>
                <p className={styles.description}>I’m into lots of things, but my primary skill is software development.</p>
                <div className={styles.links}>
                    <Link href="/posts"><a>Posts</a></Link>
                    <a href="https://www.github.com/appdevjohn">GitHub</a>
                </div>
            </header>
        </Layout>
    )
}
