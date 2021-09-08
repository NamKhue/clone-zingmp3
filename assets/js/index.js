// slide
// const slidesContainer = document.querySelector('.gallery-slide .gallery-item-container')
const bigSlideItems = document.querySelectorAll('#slide-1 .gallery-item')
const totalBigSlides = bigSlideItems.length
// const widthBigImg = bigSlideItems[0].clientWidth

// next/back btn
const backBtn = document.querySelector('.back-btn')
const nextBtn = document.querySelector('.next-btn')

let slidePos = 0

backBtn.addEventListener('click', () => {
    toBackPos()
})

nextBtn.addEventListener('click', () => {
    toNextPos()
})

function checkBtnCanActive() {
    if (slidePos == 0) {
        backBtn.style.opacity = .3
        backBtn.style.cursor = 'default';
        backBtn.setAttribute("disabled", true);
    }
    else {
        backBtn.style.opacity = 1
        backBtn.style.cursor = 'pointer';
        backBtn.setAttribute("disabled", false);
    }

    if (slidePos == totalBigSlides - 3) {
        nextBtn.style.opacity = .3
        nextBtn.style.cursor = 'default';
        nextBtn.setAttribute("disabled", true);
    }
    else {
        nextBtn.style.opacity = 1
        nextBtn.style.cursor = 'pointer';
        nextBtn.setAttribute("disabled", false);
    }
}

checkBtnCanActive()

function toNextPos() {
    if (slidePos == totalBigSlides - 3) {
        slidePos = totalBigSlides - 3
    }
    else {
        for (let slide of bigSlideItems) {
            slide.classList.add('hide-left')
        }
        
        slidePos++

        setTimeout(() => {
            bigSlideItems[slidePos - 1].classList.add('nonactive')
            for (let slide of bigSlideItems) {
                slide.classList.remove('hide-left')
            }
        }, 300);
    }
    checkBtnCanActive()
}

function toBackPos() {
    if (slidePos == 0) {
        slidePos = 0
    }
    else {
        for (let slide of bigSlideItems) {
            slide.classList.add('come-right')
        }
        
        bigSlideItems[slidePos - 1].classList.remove('nonactive')
        slidePos--

        setTimeout(() => {
            for (let slide of bigSlideItems) {
                slide.classList.remove('come-right')
            }
        }, 300);
    }
    checkBtnCanActive()
}