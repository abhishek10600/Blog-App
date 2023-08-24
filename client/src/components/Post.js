import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, description, coverImage, created_at, author }) => {
    return (
        <>
            <Link to={`/post/${_id}`}>
                <img src={"http://localhost:4000/" + coverImage} />
            </Link>
            <Link to={`/post/${_id}`}>
                <h1>{title}</h1>
            </Link>
            <p>{description}</p>
            <h4>{author.email}</h4>
        </>
    )
}

export default Post