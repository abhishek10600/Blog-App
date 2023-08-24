import { React, useState, useEffect } from 'react'
import Navbar from './Navbar';
import { useParams, Navigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setDescription(postInfo.description);
                setCoverImage(postInfo.coverImage);
            })
        })
    }, [])

    const editPostSubmit = async (ev) => {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch(`http://localhost:4000/editPost`, {
            method: "PUT",
            body: data,
            credentials: "include",
        });
        if (response.ok) {
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={`/post/` + id} />
    }
    return (
        <>
            <Navbar />
            <h1>Welcome to edit post</h1>
            <form name="editForm" onSubmit={editPostSubmit}>
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

export default EditPost