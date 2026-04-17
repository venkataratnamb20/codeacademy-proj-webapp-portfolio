// basics

const block_class = document.querySelectorAll(".block")
for (let i = 0; i < block_class.length; i++) {
    block_class[i].addEventListener("click", function() {
        // toggle background color
        let currentColor = block_class[i].style.backgroundColor;
        block_class[i].style.backgroundColor = currentColor === "#333" ? "#333" : "lightgray";
        // block_class[i].classList.toggle("active")
        console.log("clicked: " + block_class[i].id)
    })
}

// 