
// import "./Menu.css";

// function Menu() {
//   return (
//     <div className="menu-page">

//       {/* Page Banner */}
//       {/* <div className="menu-banner">
//         <h1>Our Menu</h1>
//         <p>Home / Menu</p>
//       </div> */}

//       {/* Menu Heading */}
//       <section className="menu-container">

//         <div className="menu-heading">
//           <h4>OUR MENU</h4>
//           <h2>Check Our Delicious Menu</h2>
//           <p>
//             Explore our delicious vegetarian and non-vegetarian food.
//           </p>
//         </div>

//         {/* Menu Categories */}
//         <div className="menu-categories">
//           <button className="selected">All</button>
//           <button>Vegetarian</button>
//           <button>Non-Vegetarian</button>
//           <button>Tandoor</button>
//         </div>

//         {/* Menu Items */}
//         <div className="menu-grid">

//           <div className="menu-card">
//             <img
//               src="/images/paneer-lehsumi.jpg"
//               alt="Paneer Lehsumi"
//             />

//             <div className="menu-card-content">
//               <h3>Paneer Lehsumi</h3>
//               <p>
//                 A delicious tandoor starter from our menu.
//               </p>
//             </div>
//           </div>

//           <div className="menu-card">
//             <img
//               src="/images/paneer-pudina.jpg"
//               alt="Paneer Pudina"
//             />

//             <div className="menu-card-content">
//               <h3>Paneer Pudina</h3>
//               <p>
//                 A flavourful paneer starter with pudina.
//               </p>
//             </div>
//           </div>

//         </div>

//       </section>

//     </div>
//   );
// }

// export default Menu;





import { useState } from "react";
import "./Menu.css";

function Menu() {

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // WhatsApp Single Dish Order Function
  function orderDish(name, price) {
    const phoneNumber = "91XXXXXXXXXX";

    const message = `Hello! I want to order ${name}. Price: ₹${price}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

  // Add to Cart Function
  function addToCart(name, price) {

    // Tandoori Chicken price selection
    if (String(price).includes("/")) {
      const selectedPrice = window.prompt(
        "Select Tandoori Chicken:\nEnter 200 for Half or 350 for Full"
      );

      if (selectedPrice !== "200" && selectedPrice !== "350") {
        return;
      }

      price = selectedPrice;
    }

    const numericPrice = Number(price);

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.name === name && item.price === numericPrice
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.name === name && item.price === numericPrice
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousCart,
        {
          name,
          price: numericPrice,
          quantity: 1
        }
      ];
    });
  }

  // Increase Quantity
  function increaseQuantity(name, price) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.name === name && item.price === price
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease Quantity
  function decreaseQuantity(name, price) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.name === name && item.price === price
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Total Cart Items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Cart Amount
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // WhatsApp Cart Order Function
  function orderCartOnWhatsApp() {

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const phoneNumber = "91XXXXXXXXXX";

    let message = "Hello Dehati Thiya Apna Dhaba!\n\n";
    message += "I want to place an order:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: Rs. ${item.price * item.quantity}\n\n`;
    });

    message += `Total Items: ${totalItems}\n`;
    message += `Total Amount: Rs. ${totalAmount}\n\n`;
    message += "Please confirm my order.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

  const menuSections = [
    {
      title: "TANDOORS (VEG)",
      type: "veg",
      items: [
        ["Paneer Tikka", "260"],
        ["Paneer Hariyali", "260"],
        ["Paneer Lehsuni", "260"],
        ["Paneer Malai", "300"],
        ["Paneer Pudina", "280"],
        ["Seekh Kabab", "200"],
        ["Paneer Makhmali Tikka", "300"],
        ["Paneer Tax Max", "300"],
        ["Paneer Achari Tikka", "280"],
        ["Veg Dilruba Seekh Kabab", "280"],
        ["Kullad Kabab", "300"],
        ["Mangoli Kabab", "300"],
        ["Corn Papdi Kabab", "300"],
        ["Corn Tikki", "230"],
        ["Sunhari Kabab", "300"],
        ["Dahi Kabab", "300"],
        ["Paneer Papadi Kabab", "300"],
        ["Mushroom Gulati Kabab", "350"],
        ["Rajma Gulati Kabab", "350"],
        ["Cheese Corn Kabab", "250"],
        ["Methi Corn Kabab", "250"],
        ["Aloo Adraki Tikki", "180"],
        ["Beetroot Kabab", "250"],
        ["Dilruba Tikki", "220"],
        ["Dahi Ke Sole", "350"],
        ["Paneer Corn Papdi Kabab", "350"],
        ["Mushroom Tikka", "300"],
        ["Mushroom Stuffed Tikka", "330"],
        ["Sweet Corn Seekh Kabab", "280"],
        ["Veg Cheese Seekh Kabab", "280"],
        ["Kankar Kabab", "200"],
        ["Hara Bhara Kabab", "200"],
        ["Paneer Achari", "260"],
        ["Paneer Multani Seekh Kabab", "220"]
      ]
    },
    {
      title: "MAIN COURSE (VEG)",
      type: "veg",
      items: [
        ["Dum Aloo", "180"],
        ["Aloo Zeera", "120"],
        ["Aloo Gobi Mutter", "180"],
        ["Veg Anda Curry", "220"],
        ["Green Peas Masala", "170"],
        ["Veg Kolhapuri", "180"],
        ["Mix Veg", "180"],
        ["Veg Angara", "200"],
        ["Veg Handi", "200"],
        ["Veg Jaipuri", "200"],
        ["Veg Jalfrezi", "220"],
        ["Matar Palak", "220"],
        ["Corn Palak", "220"],
        ["Veg Hyderabadi", "220"],
        ["Veg Do Pyaza", "220"]
      ]
    },
    {
      title: "SOUPS (NON-VEG)",
      type: "nonveg",
      items: [
        ["Chicken Hot And Sour", "110"],
        ["Chicken Manchaw", "110"],
        ["Chicken Lemon Coriander", "110"],
        ["Chicken Sweet Corn", "110"]
      ]
    },
    {
      title: "STARTERS (NON-VEG)",
      type: "nonveg",
      items: [
        ["Chicken Chilli Bone", "280"],
        ["Chicken Chili B/L", "310"],
        ["Chicken 65", "280"],
        ["Chicken Crispy", "280"],
        ["Chicken Schezwan", "280"],
        ["Chicken Lollipop", "320"],
        ["Chicken Garlic", "280"],
        ["Chicken Hong Kong", "300"],
        ["Chicken Tracker", "280"],
        ["Dragon Chicken", "280"],
        ["Chicken Tai Pai", "280"],
        ["Chicken Manchurian", "300"],
        ["Chicken Salt And Pepper", "280"],
        ["Chicken Wings Fry", "280"],
        ["Chicken Popcorn", "200"],
        ["Chicken Gulati Kabab", "380"],
        ["KFC Chicken", "280"],
        ["Fish Finger", "200"],
        ["Chicken Finger", "200"]
      ]
    },
    {
      title: "TANDOOR ROAST (NON-VEG)",
      type: "nonveg",
      items: [
        ["Fish Roast", "300"],
        ["Fish Tikka", "320"],
        ["Fish Hariyali", "320"],
        ["Chicken Roast", "200/350"],
        ["Tandoori Chicken", "200/350"],
        ["Tangadi Kabab", "150"],
        ["Chicken Seekh Kabab", "300"],
        ["Chicken Tikka", "300"],
        ["Chicken Lehsuni", "320"],
        ["Chicken Afghani", "320"],
        ["Chicken Hariyali Tikka", "320"],
        ["Chicken Pahadi", "320"]
      ]
    },
    {
      title: "NOODLES (NON-VEG)",
      type: "nonveg",
      items: [
        ["Egg Noodles", "180"],
        ["Chicken Noodles", "200"],
        ["Chicken Hakka Noodles", "220"]
      ]
    }
  ];

  return (
    <div className="menu-page">

      {/* SPECIAL DISHES */}
      <section className="special-dishes">

        {/* VEG SPECIALS */}
        <div className="special-category">
          <h2>Our Veg Specials</h2>
          <p className="special-description">
            Fresh ingredients, rich flavours and beautiful presentation.
          </p>

          <div className="special-grid">

            <div className="special-card">
              <img src="/images/Dahi kalab.jpeg" alt="Dahi Kabab" />
              <div className="special-info">
                <h3>Dahi Kabab</h3>
                <p>Soft, creamy kababs served with elegant garnishing.</p>
                <div className="special-buttons">
                  <strong>₹300</strong>
                  <button onClick={() => orderDish("Dahi Kabab", "300")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Dahi Kabab", "300")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="special-card">
              <img src="/images/harabharakabab.jpeg" alt="Hara Bhara Kabab" />
              <div className="special-info">
                <h3>Hara Bhara Kabab</h3>
                <p>Green goodness with fresh herbs and mint chutney.</p>
                <div className="special-buttons">
                  <strong>₹200</strong>
                  <button onClick={() => orderDish("Hara Bhara Kabab", "200")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Hara Bhara Kabab", "200")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="special-card">
              <img src="/images/paneertika.jpeg" alt="Paneer Tikka" />
              <div className="special-info">
                <h3>Paneer Tikka</h3>
                <p>Smoky paneer with colourful vegetables and spices.</p>
                <div className="special-buttons">
                  <strong>₹260</strong>
                  <button onClick={() => orderDish("Paneer Tikka", "260")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Paneer Tikka", "260")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="special-card">
              <img src="/images/angara.jpeg" alt="Veg Angara" />
              <div className="special-info">
                <h3>Veg Angara</h3>
                <p>Rich Indian curry with a delicious finishing touch.</p>
                <div className="special-buttons">
                  <strong>₹200</strong>
                  <button onClick={() => orderDish("Veg Angara", "200")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Veg Angara", "200")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* NON VEG SPECIALS */}
        <div className="special-category nonveg-category">
          <h2>Our Non-Veg Specials</h2>
          <p className="special-description">
            Authentic taste, freshly prepared and beautifully served.
          </p>

          <div className="special-grid">

            <div className="special-card">
              <img src="/images/tandurichiken.jpeg" alt="Tandoori Chicken" />
              <div className="special-info">
                <h3>Tandoori Chicken</h3>
                <p>Traditional tandoor flavour with fresh garnishing.</p>
                <div className="special-buttons">
                  <strong>₹200 / ₹350</strong>
                  <button onClick={() => orderDish("Tandoori Chicken", "200 / 350")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Tandoori Chicken", "200/350")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="special-card">
              <img src="/images/chickentikka.jpeg" alt="Chicken Tikka" />
              <div className="special-info">
                <h3>Chicken Tikka</h3>
                <p>Juicy tandoori pieces served with mint chutney.</p>
                <div className="special-buttons">
                  <strong>₹300</strong>
                  <button onClick={() => orderDish("Chicken Tikka", "300")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Chicken Tikka", "300")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="special-card">
              <img src="/images/Chicken-Lollipop.jpeg" alt="Chicken Lollipop" />
              <div className="special-info">
                <h3>Chicken Lollipop</h3>
                <p>Crispy, spicy and beautifully plated.</p>
                <div className="special-buttons">
                  <strong>₹320</strong>
                  <button onClick={() => orderDish("Chicken Lollipop", "320")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Chicken Lollipop", "320")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="special-card">
              <img src="/images/chicken65.jpeg" alt="Chicken 65" />
              <div className="special-info">
                <h3>Chicken 65</h3>
                <p>Spicy chicken bites with aromatic curry leaves.</p>
                <div className="special-buttons">
                  <strong>₹280</strong>
                  <button onClick={() => orderDish("Chicken 65", "280")}>
                    Order Now
                  </button>
                  <button className="cart-btn" onClick={() => addToCart("Chicken 65", "280")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="special-heading">
          <span>CHEF'S SPECIAL</span>
          <h1>Our Special Dishes</h1>
          <p>A Taste Worth Remembering</p>
          <p className="special-tagline">
            Every Dish Tells a Story, Every Plate is a Masterpiece!
          </p>
        </div>

      </section>

      {/* CART COUNT BUTTON */}
      <div className="cart-count">
        <button onClick={() => setShowCart(!showCart)}>
          🛒 Cart Items ({totalItems})
          {showCart ? " ▲" : " ▼"}
        </button>
      </div>

      {/* CART ITEMS PANEL */}
      {showCart && (
        <div className="cart-panel">

          <div className="cart-panel-header">
            <h2>Your Cart Items</h2>

            <button onClick={() => setShowCart(false)}>
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty. Please add some dishes!
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-row" key={`${item.name}-${item.price}`}>

                  <div className="cart-dish-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>

                  <div className="cart-quantity">
                    <button onClick={() => decreaseQuantity(item.name, item.price)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.name, item.price)}>
                      +
                    </button>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>
              ))}

              <div className="cart-total">
                <h3>Total Amount</h3>
                <h2>₹{totalAmount}</h2>
              </div>

              <button
                className="cart-whatsapp-btn"
                onClick={orderCartOnWhatsApp}
              >
                Order on WhatsApp
              </button>
            </>
          )}

        </div>
      )}

      {/* OLD MENU CARDS */}
      <div className="menu-horizontal">
        {menuSections.map((section, index) => (
          <div className="menu-card" key={index}>
            <h2 className={section.type}>{section.title}</h2>

            <div className="menu-items">
              {section.items.map((item, i) => (
                <div className="menu-item" key={i}>
                  <span>{item[0]}</span>
                  <span>₹{item[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Menu;

