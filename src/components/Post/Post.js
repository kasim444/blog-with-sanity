import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Divider, Header, Image } from 'semantic-ui-react'
import sanityClient from '../../client'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function Post() {
  const [postData, setPostData] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[slug.current == $slug] {
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          "name": author->name,
          "authorImage": author->image
        }
      `,
        { slug }
      )
      .then((data) => {
        setPostData(data[0])
      })
      .catch(console.error)
  }, [slug])

  if (!postData) return <p>Loading ...</p>

  return (
    <Container text style={{ marginTop: '3em' }}>
      <Header size='huge'>{postData.title}</Header>
      <div>
        <Image
          src={urlFor(postData.authorImage).width(100).url()}
          alt='Author avatar'
          avatar
        />
        <span>{postData.name}</span>
      </div>
      <Divider />
      <Image
        src={urlFor(postData.mainImage)}
        alt={postData.title}
        size='large'
        centered
      />

      <BlockContent
        blocks={postData.body}
        projectId={sanityClient.clientConfig.projectId}
        dataset={sanityClient.clientConfig.dataset}
      />
    </Container>
  )
}
