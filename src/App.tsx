import { BrowserPage } from "./Routes"
import { NotesProvider } from "./Context"

// Import toast
import { Toaster } from 'sonner'
function App() {
  
  return (
    <NotesProvider>
      <Toaster position="top-right" duration={2000}/>
      <BrowserPage/>
    </NotesProvider>
  )
}

export default App
