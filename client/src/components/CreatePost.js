import React, { useState } from 'react'
import Navbar from './Navbar'

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState("");
    const postSubmit = async (ev) => {
        const data = new FormData();
        data.set("title", title);
        data.set("description", description);
        data.set("file", files[0]);
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/createPost", {
            method: "POST",
            body: data,
            credentials: "include",
        });
        if (response.status === 200) {
            alert(`Post submitted successfully`)
        } else {
            alert(`Post not submitted`);
        }
    }
    return (
        <>
            <Navbar />
            <h1>Welcome to create post</h1>
            <form name="postForm" onSubmit={postSubmit}>
                <input type="text" placeholder="enter title" value={title} onChange={(ev) => {
                    return setTitle(ev.target.value);
                }} />
                <input type="text" placeholder="enter description" value={description} onChange={(ev) => {
                    return setDescription(ev.target.value);
                }} />
                <input type="file" onChange={(ev) => {
                    return setFiles(ev.target.files);
                }} />
                <button>Submit</button>
            </form>
        </>

    )
}

export default CreatePost