let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// Function for next button 
nextBtn.onclick = function() {
    moveSlider('next')
}


// Function for prev button 
prevBtn.onclick = function() {
    moveSlider('prev')
}


function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')
    
    if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }


    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, {once: true}) // Remove the event listener after it's triggered once
}








/*  ***********/
const slidercousell = document.querySelector(".coursell-produt"),
firstCard = slidercousell.querySelectorAll(".card-product-coursell")[0],
dots = document.querySelector(".btn-coursell-product");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff, dotsNumber, slideNumber = 0;

const autoSlide = () => {
    if(slidercousell.scrollLeft - (slidercousell.scrollWidth - slidercousell.clientWidth) > -1 || slidercousell.scrollLeft <= 0) return;

    let firstCardWidth = firstCard.clientWidth + 14;
    if(slidercousell.scrollLeft > prevScrollLeft) { 
        return slidercousell.scrollLeft = Math.ceil(slidercousell.scrollLeft / firstCardWidth) * firstCardWidth;
    }

    slidercousell.scrollLeft = Math.floor(slidercousell.scrollLeft / firstCardWidth) * firstCardWidth;
}

const dragStart = (e) => {

    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slidercousell.scrollLeft;
}

const dragging = (e) => {

    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slidercousell.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slidercousell.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    slidercousell.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
    checkScrollPosition();
}

const checkScrollPosition = () => {
    setTimeout(() => {
        if(slidercousell.scrollLeft - (slidercousell.scrollWidth - slidercousell.clientWidth) > -1 ) changeActiveDot("dot"+(dotsNumber-1));
        else if(slidercousell.scrollLeft < (slideNumber) * slidercousell.clientWidth || slidercousell.scrollLeft >= (slideNumber+1) * (slidercousell.clientWidth)){
            for(var i=0; i<dotsNumber; i++){
                if(slidercousell.scrollLeft > i*(slidercousell.clientWidth) && slidercousell.scrollLeft < (i+1)*(slidercousell.clientWidth)) changeActiveDot("dot"+i);
            }
        }
        return;
    }, 500);
}

slidercousell.addEventListener("mousedown", dragStart);
slidercousell.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slidercousell.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
slidercousell.addEventListener("touchend", dragStop);


const changeSlideWithDots = (e) => {
    changeActiveDot(e.target.id);
    slidercousell.scrollLeft = slideNumber*(slidercousell.clientWidth+14);
}

const changeActiveDot = (id) => {
    console.log(id);
    slideNumber = Number(id.slice(3));
    document.querySelector(".btn-coursell-product .active").classList.remove('active');
    document.getElementById(id).classList.add("active");
}

const makeDots = () => {
    var number = slidercousell.scrollWidth / (slidercousell.clientWidth+14);
    var rounded = Math.round(number * 10) / 10;
    dotsNumber = Math.ceil(rounded);
    dots.style.transform = `translateX(-${dotsNumber/2}rem)`;
    var dot = "";
    for(var i = 0; i < dotsNumber; i++){
        dot = document.createElement("span");
        dot.setAttribute("id", "dot"+(i));
        if(i === 0) dot.setAttribute("class", "active");
        dot.onclick = changeSlideWithDots;
        dots.appendChild(dot);
    }
}

makeDots();


