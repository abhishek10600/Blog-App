import { React, useState, useEffect } from 'react'
import Navbar from './Navbar';
import Post from './Post';

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/posts").then((response) => {
            response.json().then((posts) => {
                setPosts(posts);
            });
        });
    }, [])
    return (
        <>
            <Navbar />
            {posts.length > 0 && posts.map((post) => <Post {...post} />)}
        </>


    )
};

export default Home