import React from 'react'
import { useState } from 'react';

function AddBook() {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/book", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": name,
            "author": author,
            "pages": pages
        })
        })
    };
  return (<>
        <h1>books</h1>

        <form onSubmit={handleSubmit}>
            <input type="string" id="name" onChange={(e) => setName(e.target.value)}/>
            <input type="string" id="author" onChange={(e) => setAuthor(e.target.value)}/>
            <input type="number" id="pages" onChange={(e) => setPages(e.target.value)}/>
            <input type="submit" id="submit" />
        </form>
    </>
  )
}

export default AddBook