import React from 'react'
import { Container, Typography, TextField, Button, Stack } from '@mui/material'

function PostsPage() {
    function handleClick() {
        console.log("Button clicked")
    }
  return (
    <Container maxWidth="sm" sx={{mt:2}}>
        <Typography variant="h3">Posts Page</Typography>
        {/* MUI Field for creating new posts*/}
        <Stack spacing={2}>
            <TextField id="post_title" label="Title" sx={{mt:"20px"}} />
            <TextField id="post_content" label="Content" multiline minRows={4} sx={{mt:"20px"}} />
            <Button variant="contained" sx={{mt:"20px"}} onClick={handleClick}>Create Post</Button>
        </Stack>
    </Container>
  )
}

export default PostsPage