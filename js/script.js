if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// change background if color option is clicked.
function changeBackground(image) {
  document.getElementById("floor-pouf").style.backgroundImage = image;
  console.log("image changed");
}
const a = document.getElementsByClassName("color-options");

a[0].onclick = function x() {
  changeBackground("url(shop-items/floor-pouf4.jpg)");
};

a[1].onclick = function x() {
  changeBackground("url(shop-items/floor-pouf2.jpg)");
};

a[2].onclick = function x() {
  changeBackground("url(shop-items/floor-pouf3.jpg)");
};

a[3].onclick = function x() {
  changeBackground("url(shop-items/floor-pouf.jpg)");
};

//global variables
var nItems = 2;

//event listeners
function ready() {
  // var removecartitems = document.getElementsByClassName("remove-item");
  // //remove items from cart when clicked
  // for (var i = 0; i < removecartitems.length; i++) {
  //   var x = removecartitems[i];
  //   x.addEventListener("click", function removeitem() {
  //     console.log("clicked");
  //     var buttonclicked = event.target;
  //     buttonclicked.parentElement.parentElement.remove();

  //     updateCartTotal();
  //     //update cart total
  //   });
  // }
  //update cart total when item quantity changed.

  var addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}
//END OF EVENT LISTENERS

function addToCartClicked(event) {
  var button = event.target;
  //typically this would be the parent element of the button
  var title = document.getElementsByClassName("shop-item-title")[0].innerText;
  var price = document.getElementsByClassName("shop-item-price")[0].innerText;
  var item = document.getElementById("floor-pouf");
  var style = window.getComputedStyle(item, false);
  var imageSrc = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  var x = document.getElementById("filling");
  var filling = x.options[x.selectedIndex].text;
  console.log(title, price, "src", imageSrc, "src");
  addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  var carttems = document.getElementById("floor-pouf");
  cartRow.classList.add("cart-row");
  var cartRowContents = `<div class="container-cart">
  <div class="cart-item">
    <img src="${imageSrc}" width=100% />
</div>
<div class="cart-item-description">

  <p><strong>Floor Pouf Pillow</strong></br>

      <strong>Color:</strong> Cozy Denim</br>
      
      <strong>Filling:</strong> ${filling}
  </p>

  </div>
  <div class="item-price-container">
      
    <p class="item-price">
        $45.99
    </p>
 
  </div>
  <div class="item-quantity-container">

    <input type="number" class="item-quantity" name="item-quantity"
    min="1" max="100" value="1">
    
    </div>

    <div class="cart-item-total-parent">

      <p class="cart-item-total">$45.99</p>
      <button class="remove-item">Remove Item</button>
    </div>
</div>`;

  //add the item to local storage
  // var newItem = {
  //   title: title,
  //   price: price,
  //   image: imageSrc
  // };
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
    cart.push(cartRowContents);
  } else {
    cart.push(cartRowContents);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

//update cart total function calculates total cost of items in your cart.
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-section")[0];
  var cartRows = cartItemContainer.getElementsByClassName("container-cart");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("item-price")[0];
    var quantityElement = cartRow.getElementsByClassName("item-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    // cart-item-total
    var itemTotal = document.getElementsByClassName("cart-item-total")[i];
    itemTotal.innerText = "$" + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementById("cart-total").innerText = "$" + total;
  document.getElementById("cart-total-with-shipping").innerText = "$" + total;
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

//a function that adds cart items to cart page.
function onLoad() {
  document.getElementById("cartitems").innerText = nItems;
  var cart = JSON.parse(localStorage.getItem("cart"));
  var cartItems = document.getElementsByClassName("container-cart-parent")[0];
  for (var i = 0; i < cart.length; i++) {
    var cartRow = document.createElement("div");
    cartRow.innerHTML = cart[i];
    cartItems.append(cartRow);
  }
  var removecartitems = document.getElementsByClassName("remove-item");

  //remove items from cart when clicked
  for (var i = 0; i < removecartitems.length; i++) {
    var x = removecartitems[i];
    x.addEventListener("click", function removeitem() {
      //remove that item from local storage
      console.log("clicked");
      //remove item from cart
      var buttonclicked = event.target;
      buttonclicked.parentElement.parentElement.remove();

      updateCartTotal();
      //update cart total
    });
  }

  var quantityInputs = document.getElementsByClassName("item-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  updateCartTotal();
}
