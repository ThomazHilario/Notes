import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Home } from '../Page/Home'

export function BrowserPage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}