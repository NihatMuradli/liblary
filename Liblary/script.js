$(document).ready(function () {
    let bookArr = []
    reloadbooks();

    $("#bookform").submit(function (e) {
        e.preventDefault()
        let bookName = $("#bookName").val()
        let bookPrice = $("#bookPrice").val()
        let bookType = $("#bookType").val()
        let bookIMG = $("#bookIMG").val()
        let book = {
            name: bookName,
            price: bookPrice,
            type: bookType,
            photo: bookIMG
        }
        bookArr.push(book)
        console.log(bookArr)
        let bookArrJSON = JSON.stringify(bookArr)
        localStorage.setItem("bookArr", bookArrJSON)
        reloadbooks()
    })

    $("#newbook").click(function () {
        $("#addBook").css("display", "flex")
    })

    $("#icon").click(function () {
        $("#addBook").css("display", "none")
    })



    function reloadbooks() {
        if (localStorage.getItem("bookArr") == null) {
            bookArr = []
        } else {
            let jsonTxt = JSON.parse(localStorage.getItem("bookArr"))
            bookArr = jsonTxt
        }
        $("#content").empty()
        for (let i = 0; i < bookArr.length; i++) {
            let newDiv = $(`<div>
            <img src="${bookArr[i].photo}">
            <p><b>${bookArr[i].price}</b>
            </p><p>${bookArr[i].name}</p>
            <p>${bookArr[i].type}</p>
            <button id="${i}" class="deletebtn">Delete</button>
            </div>`)
            $("#content").append(newDiv)
        }
        $(".deletebtn").click(function () {
            let x = $(this).attr("id")
            bookArr.splice(x, 1)
            let myJson = localStorage.getItem("bookArr")
            let myArr = JSON.parse(myJson)
            myArr.splice(x, 1)
            let bookArrJSON = JSON.stringify(myArr)
            localStorage.setItem("bookArr", bookArrJSON)
            reloadbooks()
        })
        $("#searchicon").click(function () {
            $("#content").empty()
            let search = $("#search").val().toLowerCase()
            let jsonText = localStorage.getItem(`bookArr`)
            let arr = JSON.parse(jsonText)
            let selectValue = $("#cat").val()
            for (let i = 0; i < arr.length; i++) {
                let element;
                if (selectValue != "price") {
                    element = arr[i][`${selectValue}`].toLowerCase()
                    if (element.indexOf(search) != -1) {
                        let newDiv = $(`<div>
                    <img src="${arr[i].photo}">
                    <p><b>${arr[i].price}</b>
                    </p><p>${arr[i].name}</p>
                    <p>${arr[i].type}</p>
                    <button id="${i}" class="deletebtn">Delete</button>
                    </div>`)
                        $("#content").append(newDiv)
                    }
                } else if (selectValue == "price") {
                    for (let i = 0; i < arr.length; i++) {
                        let price = Number(arr[i].price)
                        if (parseInt($("#min").val()) <= price && price <= parseInt($("#max").val())) {
                            let newDiv = $(`<div>
                    <img src="${arr[i].photo}">
                    <p><b>${arr[i].price}</b>
                    </p><p>${arr[i].name}</p>
                    <p>${arr[i].type}</p>
                    <button id="${i}" class="deletebtn">Delete</button>
                    </div>`)
                            $("#content").empty()
                            $("#content").append(newDiv)
                        }
                    }
                }
            }
            if ($("#content").children().length == 0) {
                $("#content").append($("<p>Axtarisa uygun netice tapılmadi</p>"))
            }

        })
    }
})