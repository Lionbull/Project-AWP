import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, TextField, Button, Stack, Card, CardActions, CardContent, Alert } from '@mui/material'


function PostsPage() {
  const [update, setUpdate] = useState(false)
  const [alert, setAlert] = useState(false)
  
  function handleClick() {
    // Send a POST request to the server to create a new post in database
    fetch('/posts/createpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({title: document.getElementById('post_title').value, body: document.getElementById('post_content').value})
    }).then(data => {if(data.status === 403) {setAlert(true)}})
    setUpdate(!update)
  }

  const [postList, setPostList] = useState([])
  useEffect(() => {
    fetch('/posts/listposts', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(data => {setPostList(data)})
  }, [update])

  return (
    <Container maxWidth="lg" sx={{mt:2}}>
      <Container maxWidth="md">
        <Typography variant="h4">Create Post</Typography>
        {/* MUI Field for creating new posts*/}
        <Stack spacing={2}>
            <TextField id="post_title" label="Title" sx={{mt:"20px"}} />
            <TextField id="post_content" label="Content" multiline minRows={4} sx={{mt:"20px"}} />
            <Button variant="contained" sx={{mt:"20px"}} onClick={handleClick}>Create Post</Button>
        </Stack>
        {alert? 
        <Alert severity="error">
            You are not logged in!
            You can <Link to="/login">login</Link> here!
        </Alert>: <></>
        }
        </Container>
        <Typography variant="h5" sx={{mt:2}}>Recent Posts</Typography>
        {/* MUI Field for creating new posts*/}
        <Stack spacing={2}>
          {postList.map((post) => <Post key={post._id} post_item={post} />)}
        </Stack>
    </Container>
  )
}

function Post({post_item}) {
  return(
    <Card variant='outlined'>
      <CardContent>
        <Typography variant="h6" color="text.secondary">User {post_item.email} posted</Typography>
        <Typography variant="h5">{post_item.title}</Typography>
        <Typography variant="body1">{post_item.body}</Typography>
      </CardContent>    
      <CardActions>
        <Button size="small">View Comments</Button>
      </CardActions>
    </Card>
  )
}

export default PostsPage