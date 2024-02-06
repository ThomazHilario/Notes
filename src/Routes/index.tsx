import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Home } from '../Page/Home'
import { Register } from '../Page/Register'
export function BrowserPage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}