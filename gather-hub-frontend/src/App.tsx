import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Events } from './pages/Events'
import { FullEvent } from './pages/SingleEvent'
import { PublishEvent } from './pages/PublishEvent'

function App() {

  return <div>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element = {<Register />} />
      <Route path='/login' element = {<Login />} />
      <Route path='events' element = {<Events />} />
      <Route path='event/:id' element = {<FullEvent />} />
      <Route path='/event/publish' element = {<PublishEvent />} />
    </Routes>
    </BrowserRouter>
  </div>
}

export default App
