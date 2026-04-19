import Navbar from './Navbar'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Debug from './pages/Debug'

export default function MainContent({ activePage, setActivePage }) {
  return (
    <div className="main-content">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      {activePage === 'about' && <About />}
      {activePage === 'resume' && <Resume />}
      {activePage === 'projects' && <Portfolio />}
      {activePage === 'blog' && <Blog />}
      {activePage === 'contact' && <Contact />}
      {activePage === 'debug' && <Debug />}
    </div>
  )
}
