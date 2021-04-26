$(document).ready(function () {
    var demo = localStorage.getItem("cart");
    if (demo) {
        product = JSON.parse(demo)
        $(".ca").text(Object.keys(product).length)
    }
    var html = '';
    var cart_sub_total = 0;
    var total = 0;
    var getTax = $("li.eco_taxt").find("span").text().substr(1)
    Object.keys(product).map((key, index) => {
        html += "<tr>" +
            "<td class='cart_product'>" +
            "<a>" +
            "<img src='" + product[key]['img'] + "'>" +
            "</a>" +
            "</td>" +
            "<td class='cart_description'>" +
            "<h4>" + product[key]['name'] + "</h4>" +
            "<p>" + key + "</p>" +
            "</td>" +
            "<td class='cart_price'>" +
            "<p>" + product[key]['price'] + "</p>" +
            "</td>" +
            "<td class='cart_quantity'>" +
            "<div class='cart_quantity_button'>" +
            "<a class='cart_quantity_up' > + </a>" +
            "<input class='cart_quantity_input' type='text' name='quantity' value='" + product[key]['qty'] + "' autocomplete='off' size='2' >" +
            "<a class='cart_quantity_down' > -  </a>" +
            "</div>" +
            "</td>" +
            "<td class='cart_total'" + ">" +
            "<p class='cart_total_price'" + ">$" + product[key]['price'].substr(1) * product[key]['qty'] + "</p>" +
            "</td>" +
            "<td class='cart_delete'" + ">" +
            "<a class='cart_quantity_delete' ><i class='fa fa-times'" + "></i></a>" +
            "</td>" +
            "</tr>";

        cart_sub_total = cart_sub_total + product[key]['price'].substr(1)*product[key]['qty']
        total = cart_sub_total + parseInt(getTax)
        $("li.cart_sub_total").find("span").text(cart_sub_total)        
        $("li.total").find("span").text(total)
    })
    $("table tbody").append(html);

    $(".cart_quantity_up").click(function () {
        var getId = $(this).closest("tr").find(".cart_description").find("p").text()
        var getPrice = $(this).closest("tr").find(".cart_price").find("p").text().substr(1)
        var getQty = $(this).closest("tr").find(".cart_quantity").find(".cart_quantity_input").val()
        var getTotal = $(this).closest("tr").find(".cart_total_price").text()

        getQty = parseInt(getQty) + 1
        getTotal = "$" + parseInt(getPrice) * getQty
        $(this).closest("tr").find(".cart_quantity").find(".cart_quantity_input").val(getQty)
        $(this).closest("tr").find(".cart_total_price").text(getTotal)
        cart_sub_total = cart_sub_total + parseInt(getPrice)
        total = cart_sub_total + parseInt(getTax)
        $("li.cart_sub_total").find("span").text(cart_sub_total)        
        $("li.total").find("span").text(total)
        


        var abc = localStorage.getItem("cart");
        product = JSON.parse(abc)
        product[getId]['qty'] = product[getId]['qty'] + 1;
        var convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
    })
    $(".cart_quantity_down").click(function () {
        var getId = $(this).closest("tr").find(".cart_description").find("p").text()
        var getPrice = $(this).closest("tr").find(".cart_price").find("p").text().substr(1)
        var getQty = $(this).closest("tr").find(".cart_quantity").find(".cart_quantity_input").val()
        var getTotal = $(this).closest("tr").find(".cart_total_price").text()

        getQty = parseInt(getQty) - 1
        getTotal = "$" + parseInt(getPrice) * getQty
        $(this).closest("tr").find(".cart_quantity").find(".cart_quantity_input").val(getQty)
        $(this).closest("tr").find(".cart_total_price").text(getTotal)
        cart_sub_total = cart_sub_total - parseInt(getPrice)
        total = cart_sub_total + parseInt(getTax)
        $("li.cart_sub_total").find("span").text(cart_sub_total)        
        $("li.total").find("span").text(total)
        if (getQty == 0) {
            $(this).closest("tr").remove();
        }

        var abc = localStorage.getItem("cart");
        product = JSON.parse(abc)
        product[getId]['qty'] = product[getId]['qty'] - 1;
        if (product[getId]['qty'] == 0) {
            delete product[getId]
        }
        var convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
    })
    $(".cart_quantity_delete").click(function () {
        var getId = $(this).closest("tr").find(".cart_description").find("p").text()
        var getTotal = $(this).closest("tr").find(".cart_total_price").text().substr(1)
        $(this).closest("tr").remove();
        cart_sub_total = cart_sub_total - parseInt(getTotal)
        total = cart_sub_total + parseInt(getTax)
        $("li.cart_sub_total").find("span").text(cart_sub_total)        
        $("li.total").find("span").text(total)
        var abc = localStorage.getItem("cart");
        product = JSON.parse(abc)
        delete product[getId]
        var convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
    })


});
