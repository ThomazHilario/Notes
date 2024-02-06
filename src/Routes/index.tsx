import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Home } from '../Page/Home'
import { Register } from '../Page/Register'
import { Notes } from '../Page/Notes'

export function BrowserPage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/notes' element={<Notes/>} />
            </Routes>
        </BrowserRouter>
    )
}