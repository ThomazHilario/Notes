import { BrowserPage } from "./Routes"
import { NotesProvider } from "./Context"

// Import toast
import { Toaster } from 'sonner'
function App() {
  
  return (
    <NotesProvider>
      <Toaster/>
      <BrowserPage/>
    </NotesProvider>
  )
}

export default App
