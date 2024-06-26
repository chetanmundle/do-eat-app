import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../context/CartContext";
import ModalContext from "../context/ModalContext";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showModal } = useContext(ModalContext);

  const handleShowCart = () => {
    showModal();
  };

  const totalCartItems = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="" />

        <h1> DoEat </h1>
      </div>

      <nav id="menu">
        <div>
          <ul className="navItems">
            {/* <li>
              <a href="#"> Home </a>
            </li> */}
            <li>
              <a href="#" className="active">
                Menu
              </a>
            </li>
          </ul>
        </div>

        <Button textOnly onClick={handleShowCart}>
          🛒 <span>{totalCartItems}</span>
        </Button>
      </nav>
    </header>
  );
}
