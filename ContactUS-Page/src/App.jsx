
import './App.css'
import ContactForm from './components/ContactForm/ContactForm'
import ContactHeader from './components/ContactHeader/ContactHeader'
import Navbar from './components/Navigation/navbar'

function App() {

  return (
    <div>
      <Navbar/>
      <main className='main_container'>
      <ContactHeader/>
      <ContactForm/>
      </main>
    </div>
  )
}

export default App
