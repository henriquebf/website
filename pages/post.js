import Layout from '../components/layouts/Application.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
        <h1>{props.post.Title}</h1>
        <p>{props.post.Description}</p>
    </Layout>
)

Post.getInitialProps = async function (context) {
    const { id } = context.query
    const res = await fetch(`http://localhost:3000/api/post/${id}`)
    const post = await res.json()

    console.log(`Fetched post: ${post.Title}`)

    return { post }
}

export default Post
