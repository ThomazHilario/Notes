import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Home } from '../Page/Home'
import { Register } from '../Page/Register'
import { Notes } from '../Page/Notes'

// private
import Private from '../Components/Private'

export function BrowserPage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/notes' element={<Private><Notes/></Private>} />
            </Routes>
        </BrowserRouter>
    )
}