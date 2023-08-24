import { React, useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import { UserContext } from '../Contexts/UserContext';


const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            });
        })
    }, []);
    if (!postInfo) {
        return (
            <>
                <Navbar />
                no id
            </>
        )
    }
    return (
        <>
            <Navbar />
            <h1>This is post page {id}</h1>
            <img src={`http://localhost:4000/${postInfo.coverImage}`} />
            {userInfo.id === postInfo.author._id && (
                <Link to={`/editPost/${postInfo._id}`}> Edit Post</Link>
            )
            };
            <p dangerouslySetInnerHTML={{ __html: postInfo.title }}></p>
            <p dangerouslySetInnerHTML={{ __html: postInfo.description }}></p>
        </>
    )
}

export default PostPage