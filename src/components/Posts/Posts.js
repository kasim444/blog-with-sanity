import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react'
import sanityClient from '../../client'

export default function Posts() {
  const [allPostsData, setAllPostsData] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'post'] {
        title,
        slug,
        mainImage {
          asset->{
            _id,
            url
          }
        }
      }`
      )
      .then((data) => setAllPostsData(data))
      .catch(console.error)
  }, [])

  return (
    <Container>
      <Header as='h2' icon inverted textAlign='center'>
        <Icon name='grid layout' color='black' />
        Welcome to my blog
        <Header.Subheader>
          <a
            target='_blank'
            href='https://github.com/kasim444/blog-with-sanity'>
            Source Code
          </a>
        </Header.Subheader>
      </Header>
      <Divider />

      <Grid divided='vertically'>
        <Grid.Row columns={3}>
          {allPostsData &&
            allPostsData.map((post, i) => (
              <Grid.Column key={post.slug.current}>
                <Link to={`/${post.slug.current}`}>
                  <Card>
                    <Image
                      src={post.mainImage.asset.url}
                      title='Contemplative Reptile'
                    />
                    <Card.Content>
                      <Card.Header>{post.title}</Card.Header>
                    </Card.Content>
                  </Card>
                </Link>
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
    </Container>
  )
}
