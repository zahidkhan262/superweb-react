import React from "react"
import './App.css'

const App = () => {
  

  const style = {
    color: 'green'
  }

  const data = 'Hello Superweb'

  return (
    <>
      <div className="text-primary">
        <h1 className="super-web" style={style}>{data}</h1>
        <p style={{ textDecoration: 'underline' }}>We are learning react js.</p>
      </div>
    </>
  )
}

export default App



// code
import { useCallback, useEffect, useRef, useState } from 'react';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);

  const loaderRef = useRef();

  const fetchData = async (pageIndex) => {
    try {
      let res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex}&_limit=10`
      );
      res = await res.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const showFirstPageData = async () => {
    const data = await fetchData(1);
    setPosts(data);
    // console.log(data, 'data');
  };

  const getData = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const data = await fetchData(page);
    setPosts((prevPosts) => [...prevPosts, ...data]);

    setTimeout(() => {
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    }, 3000);
  }, [page, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // call next page data

        getData();
      }
    });

    // check here observer  by using useref....

    if (loaderRef?.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef?.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getData]);

  useEffect(() => {
    showFirstPageData();
  }, []);
  console.log(posts, 'posts');

  return (
    <>
      <h1>Hi Dev</h1>
      <div className="lists">
        {posts?.map((list) => (
          <>
            <h4>{list?.title}</h4>
            <p>{list?.body}</p>
          </>
        ))}
      </div>
      {
        <div className="loader" ref={loaderRef}>
          {isLoading && <h1>Loading.....</h1>}
        </div>
      }
    </>
  );
}

export default App;


