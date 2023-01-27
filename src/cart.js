let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket)

let calculation = () => {
    let cartQuantity = document.getElementById('cartAmount')

    cartQuantity.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

};

// everytime anyhting run, this is goint to called
calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
            
             <div class="details ">

            <p class="name">${search.name}</p>
            <p class"quantity">${item}</p>
            <p class="p1">Rs. ${search.price}</p>
            
           
            </div>
      
            `
        }).join("")
    }
    else {
        shoppingCart.innerHTML = ``

        label.innerHTML = `
        <h2 class="label-h2">Cart is Empty </h2>
        <a href="index.html">
        <button class="back-to-home"> Back to Home </button> </a>
        `
    }
}
generateCartItems()

let increment = (id) => {
    let selectedItem = id;

    // ** basket will keep adding the same identical id's without increasing the number. it doesnt make sense so we are making search function to achieve increement in no

    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;

    }

    update(selectedItem.id)
    generateCartItems()
    // console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
    totalAmount()
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;

    }
    // console.log(basket)
    update(selectedItem.id)

    basket = basket.filter((x) => x.item !== 0)
    //  to remove whole card when quantity is zero
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
    totalAmount()

}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};


let removeItems = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id)
    basket = basket.filter((x) => x.id !== selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))

    calculation()
    generateCartItems()

}


let totalAmount = () => {
    // let discountValue = prompt('Enter discount value ')
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x
            let search = shopItemsData.find((y) => y.id === id)

            return item * search.price;


        }).reduce((x, y) => x + y, 0)
        // if(discountValue){
        //     amount = amount - (amount * discountValue / 100)
        // }
        label.innerHTML = `
        <h1 class="name_on_cart">THE Cafe Grilzzz</h1>
        <p class="total_billed_amount">Total Bill : Rs. ${amount} </p>
        
        
        `
    }
    else return
}
let clearCart = () => {
    basket = []
    generateCartItems();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))


}
totalAmount()
// clearCart()