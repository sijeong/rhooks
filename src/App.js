import React, { useEffect, useReducer, useState } from 'react'
import './App.scss'
import ChangeTheme from './ChangeTheme'
import { StateContext, ThemeContext } from './contexts'
import Header from './Header'
import CreatePost from './post/CreatePost'
import PostList from './post/PostList'
import appReducer from './reducers'
import UserBar from './user/UserBar'
import { useResource } from 'react-request-hook'
import { Button } from 'react-bulma-components'

export default function App() {

  const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const { user, error } = state
  const [theme, setTheme] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`
    } else {
      document.title = 'React Hooks Blog'
    }
  }, [user])

  const [posts, getPosts] = useResource(() => ({
    url: '/posts',
    method: 'get'
  }))

  useEffect(getPosts, [])

  useEffect(() => {
    if (posts && posts.error) {
      dispatch({ type: 'POSTS_ERROR' })
    }
    if (posts && posts.data) {
      dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() })
    }
  }, [posts])
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>

        <div style={{ padding: 8 }}>

          <Header text="react Hooks Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <br />
          <UserBar />
          <br />
          {user && <CreatePost />}
          <br />
          <hr />
          {error && <b>{error}</b>}
          <PostList />
          <button className="is-primary button">PPP</button>
          <Button color="primary" size="large">BPP</Button>
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}