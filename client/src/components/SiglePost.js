import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Stack, TextField, Alert } from '@mui/material'
import { Container } from '@mui/system'


function SiglePost() {
    const [post, setPost] = useState([])
    const [commentList, setCommentList] = useState([])
    const [update, setUpdate] = useState(false)
    const [alert, setAlert] = useState(false)

    const params = useParams()

    console.log(params.id)

    useEffect(() => {
        fetch('/posts/getonepost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post_id: params.id})
        }).then(res => res.json()).then(data => setPost(data))

    }, [])

    function postComment() {
        // Send a POST request to the server to create a new post in database
        fetch('/posts/createcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({post_id: params.id, body: document.getElementById('post_content').value})
        }).then(data => {if(data.status === 403) {setAlert(true)}})
        setUpdate(!update)
    }
    
    useEffect(() => {
        fetch('/posts/listcomments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post_id: params.id})
        }).then(res => res.json()).then(data => setCommentList(data))
    }, [update])
    
  return (
    <Container>
        {post.map((post) => <Post key={post._id} post_item={post} />)}

        <Stack spacing={2}>
            <TextField id="post_content" label="Your Comment..." multiline minRows={4} sx={{mt:"20px"}} />
            <Button variant="contained" sx={{mt:"20px"}} onClick={postComment}>Comment</Button>
            {alert? 
            <Alert severity="error">
                You are not logged in!
                You can <Link to="/login">login</Link> here!
            </Alert>: <></>
            }
        </Stack>
        <Stack spacing={2}>
            {commentList.map((comment) => <Comment key={comment._id} comment_item={comment} />)}
        </Stack>

    </Container>
  )
}

function Comment({comment_item}) {
    return(
        <Card variant='outlined'>
          <CardContent>
            <Typography variant="h6" color="text.secondary">User {comment_item.email} commented</Typography>
            <Typography variant="body1">{comment_item.body}</Typography>
          </CardContent>    
        </Card>
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
      </Card>
    )
  }

export default SiglePost