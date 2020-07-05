$(document).ready(() => {
    productUrl = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/"
    urlData = "https://5d76bf96515d1a0014085cf9.mockapi.io/product"

    var sliderShow = false



    $(window).on('resize', function () {
        if ($(window).width() > 1166) {
            $("#hide-division").css("transform", "translateX(-100%)")
            $("#side-bar").css("transform", "translateX(-100%)")
            sliderShow = false

        }
    })

    $("#hamburger-icon").click(() => {
        if (sliderShow) {
            $("#hide-division").css("transform", "translateX(-100%)")
            $("#side-bar").css("transform", "translateX(-100%)")
            sliderShow = false
        }
        else {
            $("#hide-division").css("transform", "translateX(0)")
            $("#side-bar").css("transform", "translateX(0)")
            sliderShow = true
        }
    })

    $(".link-side-bar").click(() => {
        $("#hide-division").css("transform", "translateX(-100%)")
        $("#side-bar").css("transform", "translateX(-100%)")
        sliderShow = false
    })

    $("#hide-division").click(() => {
        $("#hide-division").css("transform", "translateX(-100%)")
        $("#side-bar").css("transform", "translateX(-100%)")
        sliderShow = false

    })


    // $.ajax({
    //     url: 'apiendpoint', type: 'DELETE', success: function (response) { } });

    const productCard = (id, imgSrc, dataAbout, dataCompany, dataPrice) => {

        let clothinDetails = $("<div>").addClass("clothing-details")
        let details = $("<div>").addClass("details")
        let productImg = $("<img>").addClass("product-image")
        productImg.attr("src", imgSrc)
        details.append(productImg)
        details.click(() => {
            window.location.href = "./product_detail.html" + "?p=" + id
        })
        let detailsContent = $("<div>").addClass("details-content")
        let about = $("<h4>").addClass("about")
        about.text(dataAbout)
        let company = $("<h5>").addClass("company")
        company.text(dataCompany)
        let price = $("<p>").addClass("price")
        price.text(`Rs ${dataPrice}`)
        detailsContent.append(about)
        detailsContent.append(company)
        detailsContent.append(price)
        clothinDetails.append(details)
        clothinDetails.append(detailsContent)
        return clothinDetails
    }




    $.get(urlData, function (response) {
        console.log(response[3])
        for (i in response) {
            if (response[i]["isAccessory"]) {
                $("#accessories-append").append(productCard(response[i]["id"], response[i]["preview"], response[i]["name"], response[i]["brand"], response[i]["price"]))

            }
            else {
                $("#clothing-append").append(productCard(response[i]["id"], response[i]["preview"], response[i]["name"], response[i]["brand"], response[i]["price"]))
            }
        }

    })


})


