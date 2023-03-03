import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Typography, TextField, Button, Stack, Card, CardActions, CardContent, Alert } from '@mui/material'
import { useTranslation } from 'react-i18next';

/**
 * This function creates a page with all posts and a form for creating new posts
 * 
 * @returns Main page
 */
function PostsPage() {
  const { t } = useTranslation();
  const [update, setUpdate] = useState(false)
  const [alert, setAlert] = useState(false)
  
  function handleClick() {

    // Send a POST request to the backend to create a new post in database
    fetch('/posts/createpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({title: document.getElementById('post_title').value, body: document.getElementById('post_content').value})
        
        // While creating a post the alert will pop up if user is not logged in
      }).then(data => {if(data.status === 403) {setAlert(true)}})
      
    // Changing the "update" variable to trigger the useEffect
    setUpdate(!update)
  }

  const [postList, setPostList] = useState([])

  // Loading the posts from the database
  // If new post is created, the useEffect will be triggered again with help of "update" variable
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
        <Typography variant="h4">{t ('Create Post')}</Typography>

        {/* A form for creating new posts */}
        <Stack spacing={2}>
            <TextField id="post_title" label={t ('Title')} sx={{mt:"20px"}} />
            <TextField id="post_content" label={t ('Content')} multiline minRows={4} sx={{mt:"20px"}} />
            <Button variant="contained" sx={{mt:"20px"}} onClick={handleClick}>{t ('Create Post')}</Button>
        </Stack>

        {/* If user is not logged in, the alert pops up*/}
        {alert? 
        <Alert severity="error">
            {t ('You are not logged in!')}
            {t ('You can')} <Link to="/login">{t ('login')}</Link> {t ('here!')}
        </Alert>: <></>
        }
        </Container>
        <Typography variant="h5" sx={{mt:2}}>{t ('Recent Posts')}</Typography>

        {/* Showing all existing posts */}
        <Stack spacing={2}>
          {postList.map((post) => <Post key={post._id} post_item={post} />)}
        </Stack>
    </Container>
  )
}
/**
 * This function is used to create a post card
 * 
 * @returns Post card
 */
function Post({post_item}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // If the user clicks the "View Comments" button, the user is navigated to the single post page
  function clickComments(){
    navigate('/post/' + post_item._id)
  }
  return(
    <Card variant='outlined'>
      <CardContent>
        <Typography variant="h6" color="text.secondary">{t ('User ')}{post_item.email} {t ('posted')}</Typography>
        <Typography variant="h5">{post_item.title}</Typography>
        <Typography variant="body1">{post_item.body}</Typography>
      </CardContent>    
      <CardActions>
        <Button size="small" onClick={clickComments}>{t ('View Comments')}</Button>
      </CardActions>
    </Card>
  )
}

export default PostsPage