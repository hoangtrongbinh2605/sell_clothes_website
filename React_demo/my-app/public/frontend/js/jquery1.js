$(document).ready(function () {
    var abc = localStorage.getItem("cart");
    if (abc) {
        product = JSON.parse(abc)
        $(".ca").text(Object.keys(product).length)
    }
    $(".add-to-cart").click(function () {
        var getImg = $(this).closest(".single-products").find("img").attr("src")
        var getName = $(this).closest(".overlay-content").find("p").text()
        var getPrice = $(this).closest(".overlay-content").find("h2").text()
        var getId = $(this).closest(".single-products").attr("id")

        // console.log(getImg,getName,getPrice,getId)

        var product = {}
        var product2 = {}
        product2['img'] = getImg;
        product2['name'] = getName;
        product2['price'] = getPrice;
        product2['qty'] = 1;

        var abc = localStorage.getItem("cart");
        if (abc) {
            product = JSON.parse(abc)
            Object.keys(product).map((key, index) => {
                if (key == getId) {
                    product2['qty'] = product[key]['qty'] + 1;
                }
            })    
                  
        }
        product[getId] = product2;
        $(".ca").text(Object.keys(product).length)
        var convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
        

    })
});
