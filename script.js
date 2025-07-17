document.addEventListener("DOMContentLoaded", () => {
  // footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // MOBILE MENU TOGGLE

  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // TAB SWITCHING
  const vegTab = document.getElementById("veg-tab");
  const nonvegTab = document.getElementById("nonveg-tab");
  const vegMenu = document.getElementById("veg-menu");
  const nonvegMenu = document.getElementById("nonveg-menu");
  const veg = document.getElementById("veg");
  const nonVeg = document.getElementById("non-veg");

  if (vegTab && nonvegTab) {
    vegTab.addEventListener("click", () => {
      vegMenu?.classList.remove("hidden");
      veg?.classList.remove("hidden");
      nonvegMenu?.classList.add("hidden");
      nonVeg?.classList.add("hidden");
      vegTab.classList.add("bg-green-600", "text-white");
      vegTab.classList.remove("bg-gray-300", "text-black");
      nonvegTab.classList.remove("bg-green-600", "text-white");
      nonvegTab.classList.add("bg-gray-300", "text-black");
    });

    nonvegTab.addEventListener("click", () => {
      nonvegMenu?.classList.remove("hidden");
      nonVeg?.classList.remove("hidden");
      vegMenu?.classList.add("hidden");
      veg?.classList.add("hidden");
      nonvegTab.classList.add("bg-green-600", "text-white");
      nonvegTab.classList.remove("bg-gray-300", "text-black");
      vegTab.classList.remove("bg-green-600", "text-white");
      vegTab.classList.add("bg-gray-300", "text-black");
    });
  }

  // CATEGORY FILTER - VEG
  const categories = document.querySelectorAll("#veg-menu p");
  const foodItems = document.querySelectorAll(".main > div");

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      const selectedCategory = this.textContent.toLowerCase();

      foodItems.forEach((item) => {
        const itemName = item.querySelector("h3")?.textContent.toLowerCase();
        if (
          selectedCategory === "burger" ||
          selectedCategory === "pizza" ||
          selectedCategory === "momo" ||
          selectedCategory === "biryani" ||
          selectedCategory === "pasta"
        ) {
          item.style.display = itemName?.includes(selectedCategory)
            ? "block"
            : "none";
        } else {
          item.style.display = "block";
        }
      });

      categories.forEach((cat) => cat.classList.remove("bg-gray-300"));
      this.classList.add("bg-gray-300");
    });
  });

  if (categories.length > 0) {
    categories[0].classList.add("bg-gray-300");
  }

  // CATEGORY FILTER - NONVEG
  const categorie = document.querySelectorAll("#nonveg-menu p");
  const foodItem = document.querySelectorAll(".main > div");

  categorie.forEach((category) => {
    category.addEventListener("click", () => {
      const selected = category.textContent.toLowerCase();

      foodItem.forEach((item) => {
        const name = item.querySelector("h3")?.textContent.toLowerCase();
        item.style.display =
          selected === "all" || name.includes(selected) ? "block" : "none";
      });

      categorie.forEach((cat) => cat.classList.remove("bg-gray-300"));
      category.classList.add("bg-gray-300");
    });
  });

  if (categorie.length > 0) {
    categorie[0].classList.add("bg-gray-300");
  }

  // ADD TO CART
  const cartButtons = document.querySelectorAll(".add-to-cart");

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");

      const name = product.querySelector(".product-name")?.textContent.trim();
      const price = parseFloat(
        product
          .querySelector(".product-price")
          ?.textContent.replace("Rs.", "")
          .trim()
      );
      const quantity = parseInt(
        product.querySelector(".product-quantity")?.value
      );
      const image = product
        .querySelector(".product-image")
        ?.getAttribute("data-img");

      const cartItem = { name, price, quantity, image };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${quantity} of "${name}" added to cart!`);
    });
  });
});
