import React, { useEffect, useReducer, useState } from 'react'
import './App.scss'
import ChangeTheme from './ChangeTheme'
import { StateContext, ThemeContext } from './contexts'
import Header from './Header'
import CreatePost from './post/CreatePost'
import PostList from './post/PostList'
import appReducer from './reducers'
import UserBar from './user/UserBar'
import {Button} from 'react-bulma-components'
// import 'react-bulma-components/dist/react-bulma-components.min.css'
// import Button from 'react-bulma-components/src/components/button'
// const user = 'cfxp'
const defaultPosts = [
  { title: 'React Hooks', content: 'The greated thing since sliced bread!', author: 'cfxp' },
  { title: 'Using React Fragments', content: 'Keeping the DOM tree clean!', author: 'cfxp' }
]

// export const ThemeContext = React.createContext({
//   primaryColor: 'deepskyblue'
// })

export default function App() {
  // const [user, setUser] = useState('')
  // const [posts, setPosts] = useState(defaultPosts)
  // const [user, dispatchUser] = useReducer(userReducer, '')
  // const [posts, dispatchPosts] = useReducer(postsReducer, defaultPosts)
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: defaultPosts })
  const { user } = state
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
          <PostList />
          <button className="is-primary button">PPP</button>
          <Button color="primary" size="large">BPP</Button>
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}