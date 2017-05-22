import Layout from '../components/layouts/Application.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
    <Layout>
        <h1>Batman Movies</h1>
        <ul>
            {props.posts.map((post) => (
                <li key={post.id}>
                    <Link as={`/p/${post.id}`} href={`/post?id=${post.id}`}>
                        <a>{post.Title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('http://localhost:3000/api/posts')
    const data = await res.json()

    console.log(`Movie data fetched. Count: ${data.Results.length}`)

    return {
        posts: data.Results
    }
}

export default Index
