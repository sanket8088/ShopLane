$(document).ready(() => {

    const prodId = window.location.search.split("=")[1]
    const prodUrl = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/"
    const brandName = $("#pd-product-brand")
    const productDesc = $("#pd-product-detail")
    const productPrice = $("#pd-price")
    const fullDesc = $("#pd-description-content")
    const previewImg = $("#pd-image-file")
    const description = $("#pd-description-text")
    const productReview = $("#pd-product-review")
    const addToCart = $("#pd-cart-add")

    // managing local storage



    const order = window.localStorage
    if (order.length == 0) {
        orderList = []
    }
    else {
        console.log(order)
        orderList = order
    }



    const totalUrl = prodUrl + prodId

    $.get(totalUrl, (response) => {
        brandName.text(response.brand)
        productDesc.text(response.name)
        productPrice.text("Price : Rs ")
        let priceSpan = $("<span>").addClass("pd-price-color").text(response.price)
        productPrice.append(priceSpan)
        fullDesc.text(response.description)
        previewImg.attr("src", response.preview)
        description.text("Description")
        productReview.text("Product Review")
        let addToCart = $("<button>").addClass("pd-cart-add")
        addToCart.text("Add to Cart")
        addToCart.click(() => {
            let noOfOrders = $(".order-numbers").text()
            noOfOrders = parseInt(noOfOrders.trim())
            noOfOrders += 1
            window.localStorage.setItem("cart", noOfOrders)

            $(".order-numbers").text(noOfOrders)
            console.log(typeof (orderList))
            if (orderList.length == 0) {
                response["count"] = 1
                orderList.push(response)
                orderList = JSON.stringify(orderList)
                window.localStorage.setItem("orderList", orderList)
            }
            else {
                newObject = true
                orderList = window.localStorage.getItem("orderList")
                orderList = JSON.parse(orderList)
                for (i in orderList) {
                    if (orderList[i]["id"] == response.id) {
                        orderList[i]["count"] += 1
                        newObject = false
                    }
                }
                if (newObject) {
                    response["count"] = 1
                    orderList.push(response)
                }
                console.log(orderList)
                orderList = JSON.stringify(orderList)

                window.localStorage.setItem("orderList", orderList)

            }
        })

        $("#pd-description-container").append(addToCart)
        for (i in response.photos) {

            $("#pd-all-images").append(createPicture(response.photos[i]))
        }

    })

    const createPicture = (imUrl) => {
        let outerDiv = $("<div>").addClass("pd-list-image")
        let innerImg = $("<img>").addClass("pd-image-file")
        innerImg.attr("src", imUrl)
        innerImg.click(() => {

            previewImg.attr("src", imUrl)
        })
        outerDiv.append(innerImg)
        return outerDiv

    }




})