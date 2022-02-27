import logo from "../../logo.svg";
import NavBar from "../NavBar"

function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>WELCOME TO THE DYNAMIC REACT PROJECT</p>
      <NavBar />
    </header>
  );
}

export default Header;
