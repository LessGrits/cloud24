let menu = document.getElementById("menu");
let menuIcon = document.getElementById("menu-icon");

menuIcon.onclick=()=> {
    menu.classList.toggle("hide");
};

let accordions = document.getElementsByClassName('accordion');


for(let i = 0; i < accordions.length; i++){
    accordions[i].onclick = function(){
        this.classList.toggle("show");
    }
}

let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        document.getElementById("menu").style.top = "0";
    } else {
        document.getElementById("menu").style.top = "-100px";
        (menu.className !== "menu hide")?menu.className = "menu hide": null;
    }
    prevScrollPos = currentScrollPos;
};
