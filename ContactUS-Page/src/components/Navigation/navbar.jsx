import styles from './navigation.module.css';
const Navbar = () => {
  return (
      <nav className={`${styles.navigation} container`}>
        <div className="logo">
          <img src="./public/images/logo.png" alt="logo" />
        </div>
        
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          
      </nav>
  )
}

export default Navbar;
