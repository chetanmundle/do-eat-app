import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../context/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ModalContext from "../../context/ModalContext";
import useHTTP from "../../hooks/useHTTP";
import Error from "../Error";
import Swal from "sweetalert2";

// declare it outside of the Component to avoid infinite-loop
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const modalCTX = useContext(ModalContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    street: "",
    phone: "",
    postalCode: "",
    city: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHTTP("http://localhost:3000/orders ", requestConfig);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCheckout = () => {
    modalCTX.closeCheckout();
  };

  const handleFinish = () => {
    modalCTX.closeCheckout();
    // clear entered-items to the cart
    clearCart();

    // clear success-modal
    clearData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    modalCTX.closeCheckout();

    console.log("Items : ", items);

    try {
      const response = await fetch(
        "https://infinia-backend.vercel.app/mail/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { email: userData.email },
        }
      );

      if (response.ok) {
        console.log("Email send Successfully");
        // Show success message using Swal
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your order has been placed successfully Wait 30 min",
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // If "OK" button is clicked
            window.location.reload(); // Refresh the page
          }
        });
      } else {
        console.log("Unable to send the Email to User");
      }

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const data = await response.json();
      // console.log("Data:", data);
    } catch (error) {
      console.log("Unable to send the Email");
    }
    // Show success message using Swal
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your order has been placed successfully Wait 30 min",
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // If "OK" button is clicked
        window.location.reload(); // Refresh the page
      }
    });

    // const formData = new FormData(e.target);
    // const customerData = Object.fromEntries(formData.entries()); //extract data

    // sendRequest(
    //   // Pass the Data to the sendRequest
    //   JSON.stringify({
    //     order: {
    //       items, // items from CartContext
    //       customer: customerData,
    //     },
    //   })
    // );
  };

  let actions = (
    <>
      <Button type="button" onClick={handleCloseCheckout} textOnly>
        Close
      </Button>

      <Button> Submit Order </Button>
    </>
  );

  if (isSending) {
    actions = <span> Sending Order Data... 📡</span>;
  }

  if (data && !error) {
    return (
      <Modal open={modalCTX.status === "checkout"} onClose={handleFinish}>
        <h2> Success! </h2>
        <h4> Your Order Was Submitted Successfully 🚚</h4>
        <p>
          We will get back to you with more details via Email within the next
          few minutes.
        </p>

        <p>
          <Button onClick={handleFinish}> Okay </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={modalCTX.status === "checkout"} onClose={handleCloseCheckout}>
      <form className="form" onSubmit={handleSubmit}>
        <h2> Checkout </h2>
        <p className="total-amount">
          Total Amount:
          <strong>
            &nbsp; <span>&#8377;</span>
            {cartTotal}
          </strong>
        </p>

        <Input
          label="Full Name"
          type="text"
          id="name"
          value={userData.name}
          onChange={handleChange}
        />
        <Input
          label="Email Address"
          type="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          value={userData.street}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          type="number"
          minLength={10}
          maxLength={10}
          id="phone"
          value={userData.phone}
          onChange={handleChange}
        />

        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postalCode"
            value={userData.postalCode}
            onChange={handleChange}
          />
          <Input
            label="City"
            type="text"
            id="city"
            value={userData.city}
            onChange={handleChange}
          />
        </div>

        {error && <Error title="Failed To Submit Order ⛔" message={error} />}

        <p className="modal-actions"> {actions} </p>
      </form>
    </Modal>
  );
}

/* Send HTTP Request (POST)
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          items, // items from CartContext
          customer: customerData,
        },
      }),
    });
*/
