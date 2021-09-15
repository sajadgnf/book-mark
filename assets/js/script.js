var $ = document

var addBookEl = $.querySelector("#add_book")
var modal = $.querySelector(".modal")
var addBookField = $.querySelectorAll(".add_book_field")
var errorEl = $.querySelectorAll(".error")
var saveBtn = $.getElementById("save_btn")
var cancleBtn = $.getElementById("cancle_btn")
var books = $.querySelector(".books")
var bookName = $.getElementById("name")
var bookUrl = $.getElementById("url")
var bookMarks = []

// Input Action
addBookField.forEach(elem => {
    elem.addEventListener("focus", event => {
        event.target.previousElementSibling.style.color = "#3579f5"
        event.target.nextElementSibling.classList.add("active")
        cleraError()
    })
    elem.addEventListener("blur", event => {
        event.target.previousElementSibling.style.color = "#000"
        event.target.nextElementSibling.classList.remove("active")
    })
})

// clear
var clear = () => {
    bookName.value = ""
    bookUrl.value = ""
}

// Error
var error = (name, url) => {
    if (name === "") {
        errorEl[0].innerHTML = "Please Fill The Frame"
        return false
    } else if (url === "") {
        errorEl[1].innerHTML = "Please Fill The Frame"
        return false
    } else if (name.length > 15 || url.length > 20) {
        alert("Entered values are exceeded")
        return false
    }
    return true
}

// Clear Error
var cleraError = () => {
    errorEl.forEach(event => {
        event.innerHTML = ""
    })
}

// Modal Show
var modalShow = () => {
    modal.style.display = "block"
}

// Close Modal
window.addEventListener("click", event => {
    if (event.target == modal) {
        closeModal()
        clear()
    }
})

const closeModal = () => {
    modal.style.display = "none"
    clear()
}

// delet Item
var deletItem = (inputUrl, inputName) => {
    var deleteItemConfirm = confirm("Are Sure To Delete?")

    if (deleteItemConfirm) {
        bookMarks.forEach((bookmark, index) => {
            if (bookmark.url == inputUrl && bookmark.name == inputName) {
                bookMarks.splice(index, 1)
            }
        })
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks))
        fetchBookMark()

    }

}

// BildMarkBook
var bildBookMark = () => {
    books.innerHTML = ""

    bookMarks.forEach(event => {
        const name = event.name
        const url = event.url

        // link
        const link = $.createElement('a')
        link.innerHTML = name
        link.setAttribute("class", "link")
        link.setAttribute("href", "https://" + url)

        // Fav Icon
        const favIcon = $.createElement("img")
        favIcon.setAttribute("src", "http://www.google.com/s2/favicons?domain=" + url)
        favIcon.setAttribute("alt", "name")
        favIcon.classList.add("fav_icon")

        // Delet Btn
        const deleteBtn = $.createElement("i")
        deleteBtn.setAttribute("class", "bi bi-x delete_btn")
        deleteBtn.setAttribute("title", "Delet Book")
        deleteBtn.addEventListener("click", () => {
            deletItem(url, name)
        })

        // link Info
        const linkInfo = $.createElement("div")

        // item
        const item = $.createElement("div")
        item.setAttribute("class", "py-3 col-md-2 mx-5 item")

        linkInfo.append(favIcon, link)
        item.append(linkInfo, deleteBtn)
        books.append(item)

    })

}

var storBookMark = e => {
    e.preventDefault()

    if (!error(bookName.value, bookUrl.value)) {
        return false
    }

    bookMarks.push({ name: bookName.value, url: bookUrl.value })
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks))

    bildBookMark()
    clear()
    closeModal()
}

// fetchBookMark
const fetchBookMark = () => {
    if (localStorage.getItem("bookMarks")) {
        bookMarks = JSON.parse(localStorage.getItem("bookMarks"))
    } else {
        bookMarks = []
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks))
    }
    bildBookMark()
}

// Events
addBookEl.addEventListener("click", modalShow)
saveBtn.addEventListener("click", storBookMark)
cancleBtn.addEventListener("click", closeModal)

fetchBookMark()