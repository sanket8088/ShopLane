$(document).ready(() => {
    if ("cart" in window.localStorage) {
        // alert(window.localStorage["cart"])
        $(".order-numbers").text(window.localStorage["cart"])
    }

})