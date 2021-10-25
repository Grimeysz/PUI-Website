var nItems = 0;

document.getElementById("addtocart").onclick = function addItem() {
  nItems = nItems + 1;
  document.getElementById("cartitems").innerHTML = nItems;
  document.getElementById("popup").style.display = "block";
};

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
