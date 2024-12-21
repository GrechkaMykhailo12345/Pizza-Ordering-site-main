// Оголошуємо асинхронну функцію для отримання продуктів з сервера
async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("pizza.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок 
    return ''
}


class ShoppingCart {
    constructor() {
        this.items = {}
        this.loadCartFromCookies()
    }

    // Зберігання кошика в кукі
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }

    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);
        }
    }

    addItem(product) {
        if (this.items[pizza.id]) {
            this.items[pizza.id].quantity += 1
        } else {
            this.items[pizza.id] = product
            this.items[pizza.id].quantity = 1
        }
        this.saveCartToCookies()
    }
}

let cart = new ShoppingCart()

function addToCard(event) {
    let data = event.target.getAttribute('data-product')
    let pizza = JSON.parse(data)
    cart.addItem(pizza)

    console.log(cart.items)
}

getProducts().then(function (products) {

    if (pizza_list) {
        products.forEach(function (pizza) {
            pizza_list.innerHTML += getCardHtml(pizza)
        })
        let addBtn_list = document.querySelectorAll(".add-cart-btn")
        addBtn_list.forEach(function (btn) {
            btn.addEventListener("click", addToCard)
        })
    }

})

function getCardHtml(pizza) {
    return `<div class="card" style="width: 18rem;">
  <img src="img/${pizza.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${pizza.title}</h5>
    <h6>${pizza.price} грн</h6>
    <button class="btn btn-primary add-cart-btn" data-product='${JSON.stringify(pizza)}'>Додати в кошик</button>
  </div>
</div>`
}


let main_screen = document.querySelector(".main-screen")
let all_products_btn = document.querySelector('.all-products-btn')
let all_products = document.querySelector("#all-products")
let first_page_btn = document.querySelector(".first-page-btn")
let first_page = document.querySelector("#first-page")
let about_btn = document.querySelector('.about-btn')
let about = document.querySelector('#about')
let basket_btn = document.querySelector('.basket-btn')
let basket = document.querySelector('#basket')

function showScreen(current_screen){
    first_page.style.display = "none"
    all_products.style.display = "none"
    about.style.display = "none"
    basket.style.display = "none"

    current_screen.style.display = 'block'
}

all_products_btn.addEventListener("click", function (e) {
    e.preventDefault()
    showScreen(all_products)
})

about_btn.addEventListener("click", function (e) {
    e.preventDefault()
    showScreen(about)
})

first_page_btn.addEventListener("click", function (e) {
    e.preventDefault()
    showScreen(first_page)
})

basket_btn.addEventListener("click", function (e) {
    e.preventDefault()
    showScreen(basket)
})

let pizza_list = document.querySelector('.pizza-list')

getProducts().then(function (products) {
    products.forEach(function (pizza) {
        pizza_list.innerHTML += getCardHtml(pizza)
    })
})

function getCartItem(pizza) {
    return `
         <div class="card my-2">
                <div class="row m-2 ">
                    <div class="col-2">
                        <img src="img/${pizza.image}" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <h5>${pizza.title}</h5>
                    </div>
                    <div class="col-2">${pizza.quantity} шт.</div>
                    <div class="col-2">
                        <h4>${pizza.price * pizza.quantity} грн</h4>
                    </div>
                </div>
            </div>
    `
}

let cart_list = document.querySelector(".сart-list")
let cart_buttons = document.querySelector(".cart-buttons")

if (cart_list){
    cart_list.innerHTML =''

    for (let key in cart.items){
        cart_list.innerHTML+= getCartItem(cart.items[key])
    }

    if (Object.keys(cart.items).length>0){
        cart_buttons.classList.remove('d-none')
    }
}
  
let cart_clean_btn = document.querySelector(".cart-clean")

cart_clean_btn?.addEventListener("click", function(event){
    document.cookie = `cart=''; max-age=0; path=/`
    cart_list.innerHTML = 'У кошику немає товарів'
    cart_buttons.classList.add('d-none')
})

const swiper = new Swiper('.swiper', {
    // Optional parameters
    //direction: 'vertical',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
    updateOnWindowResize: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    spaceBetween: 10,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    /* scrollbar: {
      el: '.swiper-scrollbar',
    }, */
});