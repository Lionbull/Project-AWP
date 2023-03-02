import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function ShowBook() {
    const [data, setData] = useState("Not working");
    const { name } = useParams();

    useEffect(() => {
        let mount = true;

        async function fetchData() {
            const response = await fetch(`/book/${name}`);
            const json = await response.json();
            console.log(json);
            if(mount) setData(json);
        }

        fetchData();
        return () => mount = false;

    }, [])

    if(data === "Not working") {
        return (<>
        <h1>Books</h1>
        <h1>404: This is not the webpage you are looking for</h1>
    </>)}

    return (
        <div>
            <h1>Books</h1>
            <p>{data.name}</p>
            <p>{data.author}</p>
            <p>{data.pages}</p>
        </div>
    )
}

export default ShowBook