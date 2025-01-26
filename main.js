let products = [
  {
    id: 1,
    name: "Waffle with Berries",
    list: "Waffle",
    price: 6.50,
    image: "/images/image-waffle-desktop.jpg"
  },
  {
    id: 2,
    name: "Vanilla Bean Crème Brûlée",
    list: "Crème Brûlée",
    price: 7.00,
    image: "/images/image-creme-brulee-desktop.jpg"
  },
  {
    id: 3,
    name: "Macaron Mix of Five",
    list: "Macaron",
    price: 8.00,
    image: "/images/image-macaron-desktop.jpg"
  },
  {
    id: 4,
    name: "Classic Tiramisu",
    list: "Tiramisu",
    price: 5.50,
    image: "/images/image-tiramisu-desktop.jpg"
  },
  {
    id: 5,
    name: "Pistachio Baklava",
    list: "Baklava",
    price: 4.00,
    image: "/images/image-baklava-desktop.jpg"
  },
  {
    id: 6,
    name: "Lemon Meringue Pie",
    list: "Pie",
    price: 5.00,
    image: "/images/image-meringue-desktop.jpg"
  },
  {
    id: 7,
    name: "Red Velvet Cake",
    list: "Cake",
    price: 4.50,
    image: "/images/image-cake-desktop.jpg"
  },
  {
    id: 8,
    name: "Salted Caramel Brownie",
    list: "Brownie",
    price: 4.50,
    image: "/images/image-brownie-desktop.jpg"
  },
  {
    id: 9,
    name: "Vanilla Panna Cotta",
    list: "Panna Cotta",
    price: 6.50,
    image: "/images/image-panna-cotta-desktop.jpg"
  }
];

const displayProduct = document.querySelector(".display_product");
const checkOut = document.querySelector(".cart");

let cart = [];

function displayProducts() {
  products.forEach(product => {
    const productDiv = document.createElement("div");

    productDiv.innerHTML = `
      <img class="image" src="${product.image}" alt="${product.name}">
      <div class="col">
        <p class="flex">${product.list}</p>
        <p class="flex">${product.name}</p>
        <p class="price flex">$${product.price.toFixed(2)}</p>
        <div>
          <button class="gg"><img src="./images/icon-add-to-cart.svg">Add To Cart</button>
          <div class="quantity-controls" style="display:none;">
            <button class="decrease">-</button>
            <input class="quantity-input" type="number" value="0" min="0">
            <button class="increase">+</button>
          </div>
        </div>
      </div>
    `;

    const quantityControl = productDiv.querySelector(".quantity-controls");
    const addToCart = productDiv.querySelector(".gg");
    const quantityInput = productDiv.querySelector(".quantity-input");
    const decrease = productDiv.querySelector(".decrease");
    const increase = productDiv.querySelector(".increase");

    // Show input on button hover
    addToCart.addEventListener("mouseenter", () => {
      addToCart.style.display = "none";
      quantityControl.style.display = "flex";
      quantityInput.focus();
    });

    // Hide input and reset button when focus is lost
    quantityInput.addEventListener("blur", () => {
      if (!quantityInput.value || parseInt(quantityInput.value) < 1) {
        addToCart.style.display = "block";
        quantityControl.style.display = "none";
        quantityInput.value = 1;
      }
    });

    increase.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1; // Increase quantity
      addToCartFunction(product.id, 1); // Update cart with increased quantity
    });

    decrease.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1; // Decrease quantity
        addToCartFunction(product.id, -1); // Update cart with decreased quantity
      }
    });

    // // Add to cart on initial button click
    // addToCart.addEventListener("click", () => {
    //   const initialQuantity = parseInt(quantityInput.value);
    //   addToCartFunction(product.id, initialQuantity); // Add initial quantity to cart
    // });

    displayProduct.appendChild(productDiv);
  });
}

displayProducts();

// Function to add and remove from cart
function addToCartFunction(productId, quantity) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity; // Update quantity if item already exists
    if (existingItem.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId); // Remove if quantity is zero or less
    }
  } else if (quantity > 0) {
    const product = products.find(prod => prod.id === productId);
    cart.push({ ...product, quantity }); // Add new product to cart
  }
  updateCheckout();
}

// Function to update checkout display
function updateCheckout() {
  checkOut.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    checkOut.innerHTML += `
      <div class="checkout-item">
        <p>${item.name}</p>
        <div class="icon">
          <p>
            <span>${item.quantity}x</span><span>@</span><span>$${item.price.toFixed(2)}</span>
            <span>$${itemTotal.toFixed(2)}</span>
          </p>
           <img class="remove-item" data-id="${item.id}" src="/images/icon-remove-item.svg" alt="">
          
        </div>
        <hr>
      </div>
    `;
  });

  // Display total
  checkOut.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;

  // Add remove functionality
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'));
      addToCartFunction(id, -1); // Remove one item from the cart
    });
  });
}
