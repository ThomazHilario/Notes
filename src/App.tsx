import { BrowserPage } from "./Routes"
import { NotesProvider } from "./Context"
function App() {
  
  return (
    <NotesProvider>
      <BrowserPage/>
    </NotesProvider>
  )
}

export default App
