import { Wrapper, FoodList, FoodPage } from 'components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FoodList/>}/>
          <Route path='/:foodId' element={<FoodPage/>}/>
        </Routes>
      </BrowserRouter>
    </Wrapper>
  )
}

export default App
