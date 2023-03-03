import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Stack, TextField, Alert } from '@mui/material'
import { Container } from '@mui/system'
import { useTranslation } from 'react-i18next';

/**
 * This function is used to create a single post and it is used in App.js
 * 
 * @returns Page with single post and comments
 */
function SiglePost() {
    const { t } = useTranslation();
    const [post, setPost] = useState([])
    const [commentList, setCommentList] = useState([])
    const [update, setUpdate] = useState(false)
    const [alert, setAlert] = useState(false)

    // Used to get the id of the post from the url
    const params = useParams()

    // Get the post from the database with the id from the url
    useEffect(() => {
        fetch('/posts/getonepost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            // Requesting the post with the id from the url to get only one post
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

            // Sending the id of the post and the content of the comment to backend
            body: JSON.stringify({post_id: params.id, body: document.getElementById('post_content').value})

            // This is for showing alert if user is not logged in
        }).then(data => {if(data.status === 403) {setAlert(true)}})

        // Notifying the useEffect to update the comment list
        setUpdate(!update)
    }
    
    // Loading the comments from the database
    // If new post is created, the useEffect will be triggered again with help of "update" variable
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
    <Container sx={{mt:2}} maxWidth="md">

        {/* Only one post will be loaded */}
        {post.map((post) => <Post key={post._id} post_item={post} />)}

        <Container maxWidth="sm" sx={{mb:2}}>
            <Stack spacing={2}>
                <TextField id="post_content" label={t ('Your Comment...')} multiline minRows={4} sx={{mt:"20px"}}/>
                <Button variant="contained" sx={{mt:"20px"}} onClick={postComment}>{t ('Comment')}</Button>

                {/* If user is not logged in, the alert pops up*/}
                {alert? 
                <Alert severity="error">
                    {t ('You are not logged in!')}
                    {t ('You can')} <Link to="/login">{t ('login')}</Link> {t ('here!')}
                </Alert>: <></>
                }
            </Stack>
        </Container>

        <Stack spacing={2} sx={{mt:"20px"}}>

            {/* Loading the comments */}
            {commentList.map((comment) => <Comment key={comment._id} comment_item={comment} />)}
        </Stack>
        

    </Container>
  )
}

/**
 * This function is for showing a single comment
 * Takes the comment as a prop to show the content
 * Expected to be used many times to show all the comments
 * 
 * @returns Comment component
 */
function Comment({comment_item}) {
    const { t } = useTranslation();
    return(
        <Card variant='outlined'>
          <CardContent>
            <Typography variant="h6" color="text.secondary">{t ('User')} {comment_item.email} {t ('commented')}</Typography>
            <Typography variant="body1">{comment_item.body}</Typography>
          </CardContent>    
        </Card>
      )
}

/**
 * Modyfied copy of Post component from PostsPage.js
 * Expected to be used one time to show only one post
 * 
 * @returns Post component
 */
function Post({post_item}) {
    const { t } = useTranslation();
    return(
      <Card variant='outlined'>
        <CardContent>
          <Typography variant="h6" color="text.secondary">{t ('User')} {post_item.email} {t ('posted')}</Typography>
          <Typography variant="h5">{post_item.title}</Typography>
          <Typography variant="body1">{post_item.body}</Typography>
        </CardContent>    
      </Card>
    )
  }

export default SiglePost