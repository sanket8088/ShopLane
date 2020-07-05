$(document).ready(() => {

    $(window).on('resize orientationchange', function () {
        $('.js-slider').slick('resize');
    });

    billAmount = 0
    postUrl = "https://5ee248928b27f30016094875.mockapi.io/orderResources"


    const createCards = (imgSrc, prodName, count, price) => {
        let outerDiv = $("<div>").addClass("total-orders-container")
        let picDiv = $("<div>").addClass("order-pics-container")
        let imgFile = $("<img>").addClass("pics-content")
        imgFile.attr("src", imgSrc)
        picDiv.append(imgFile)
        let contentDiv = $("<div>").addClass("order-page-details")
        let h1Div = $("<h1>").addClass("order-product-name")
        h1Div.text(prodName)
        let p1Div = $("<p>").addClass("order-product-quantity")
        p1Div.text(`x${count}`)
        let p2Div = $("<p>").addClass("order-amount")
        tamount = parseInt(count) * parseInt(price)
        p2Div.text(`Amount : Rs ${tamount}`)
        contentDiv.append(h1Div)
        contentDiv.append(p1Div)
        contentDiv.append(p2Div)
        outerDiv.append(picDiv)
        outerDiv.append(contentDiv)
        return outerDiv
    }
    if ("orderList" in window.localStorage) {
        let allList = JSON.parse(window.localStorage["orderList"])

        $("#total-items").text(`Total Items : ${allList.length}`)

        for (i in allList) {
            totalP = parseInt(allList[i]["count"]) * parseInt(allList[i]["price"])
            billAmount += totalP
            $(".all-items-to-order").append(createCards(allList[i]["preview"], allList[i]["name"], allList[i]["count"], allList[i]["price"]))

        }
        $(".price-total-amount").text(`Amount: Rs ${billAmount}`)
    }


    $("#confirm-order").click(() => {
        if (billAmount == 0) {
            alert("There are no items in your cart")
        }
        else {
            data = window.localStorage.getItem("orderList")
            console.log(data)
            dataPost = {
                "amount": billAmount,
                "products": data
            }
            $.ajax({
                type: "POST",
                url: postUrl,
                data: dataPost,
                success: () => {
                    window.localStorage.clear()
                    window.location.href = "./order_confirmation.html"
                }
            })
            // post call to send data

        }
    })



})  