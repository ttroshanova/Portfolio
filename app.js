const projectsContainer = document.querySelector('.projects');
const main = document.querySelector('main');
const projects = document.querySelectorAll('.project');
const projectTitles = [...document.querySelectorAll('main .projects .project h1')];
const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');
const arrows = document.querySelectorAll('.arrow');
const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');
const menuTitle = document.querySelector('h4:nth-of-type(1)');
const menuClose = document.querySelector('h4:nth-of-type(2)');
const mouse = document.querySelector('.mouse');
const projectsTitle = document.querySelector('.projects-title h1');
const tl = gsap.timeline();


let counter = 1;
let gap = 10;
const size = projects[0].getBoundingClientRect().width;

projectsContainer.style.transform = 'translateX(' + ((size + gap) * -counter) + 'px)';

const spansHide = (array) => {
    for(let i = 0; i < array.length; i++){
        array[i].classList.remove('rotate');
        array[i].style.transitionDelay = `${i * 0.15}s`;
    }
}

nextBtn.addEventListener('click', () => {
    if(counter >= projects.length - 1) return;
    projectsContainer.style.transition = 'transform 1.6s ease-in-out';
    counter++;
    projectsContainer.style.transform = 'translateX(' + ((size + gap) * -counter) + 'px)';
    const spans = [...projectsTitle.querySelectorAll('span')];
    const reversedSpans = spans.toReversed();
    spansHide(reversedSpans)
});

prevBtn.addEventListener('click', () => { 
    if(counter <= 0) return;
    projectsContainer.style.transition = 'transform 1.6s ease-in-out';
    counter--;
    projectsContainer.style.transform = 'translateX(' + ((size + gap) * -counter) + 'px)';
    const spans = projectsTitle.querySelectorAll('span');
    spansHide(spans)
})

projectsContainer.addEventListener('transitionend', () => {
    if(projects[counter].id === 'lastClone'){
        projectsContainer.style.transition = 'none';
        counter = projects.length - 2;
        projectsContainer.style.transform = 'translateX(' + ((size + gap) * -counter) + 'px)';
    }
    if(projects[counter].id === 'firstClone'){
        projectsContainer.style.transition = 'none';
        counter = projects.length - counter;
        projectsContainer.style.transform = 'translateX(' + ((size + gap) * -counter) + 'px)';
    }
})

const toggleEffect = (...elements) => {
    const elementsToToggle = [...elements];
    elementsToToggle.forEach(element => {
        element.classList.toggle('active');
    })
}

menu.addEventListener('click', () => {
    toggleEffect(overlay, menuTitle, menuClose, menu)
    if(overlay.classList.contains('active')){
        arrows.forEach((arrow) => {
            arrow.style.zIndex = '2';
            arrow.style.transition = 'left 0.3s, right 0.3s, z-index 0.1s ease-in-out';
        }) 
    } else {
        arrows.forEach((arrow) => {
            arrow.style.zIndex = '';
            arrow.style.transition = 'left 0.3s, right 0.3s, z-index 0.3s ease-in-out';
            arrow.style.transitionDelay = '0s, 0s, 1.7s';
        }) 
    }
})

document.addEventListener('mousemove', (e) => {
    mouse.style.left = `${e.clientX}px`;
    mouse.style.top = `${e.clientY}px`;
})

let options = {
    root: document,
    rootMargin: `0px -${size/2}px 0px -${size/2}px`,
    threshold: 0.7,
  };

  projectTitles.forEach(projectTitle => {
    const projectTitleText = projectTitle.textContent;
    const letters = projectTitleText.split('');
    projectTitle.textContent = '';
    for(let i = 0; i < letters.length; i++){
        projectTitle.innerHTML += '<span>' + letters[i] + '</span>';
    }
  })

  const handleIntersect = (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const spans = entry.target.children[0].querySelectorAll('span');
                    tl.to(spans, {y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: Power3.easeOut});
            } else {
                const spans = entry.target.children[0].querySelectorAll('span');
                tl.to(spans, {y: 30, opacity: 0, duration: 0.3, stagger: 0.08, ease: Power3.easeOut});
            }
        })
    }

let observer = new IntersectionObserver(handleIntersect, options);

projects.forEach(project => {
    observer.observe(project)
})

const transformCursor = (scaleNumber) => {
    mouse.style.transform = `translate(-50%, -50%) scale(${scaleNumber})`;
    mouse.style.transformOrigin = 'center';
    mouse.style.transition = 'transform 0.2s ease-in-out';
}

document.addEventListener('mouseover', (e) => {
    if(e.target.parentElement.classList.contains('logo')
    || e.target.parentElement.classList.contains('menu')
    || e.target.parentElement.classList.contains('container')
    || e.target.parentElement.classList.contains('hamburger')
    || e.target.parentElement.classList.contains('menu-title')
    || e.target.parentElement.classList.contains('text')) {
        transformCursor(0.4)
    } else {
        transformCursor(1)
    }
})


    const letters = projectsTitle.textContent.split('');
    projectsTitle.textContent = '';
    letters.forEach(letter => {
        projectsTitle.innerHTML += '<span>' + letter + '</span>'
    })


window.addEventListener('load', () => {
    const spans = projectsTitle.querySelectorAll('span');
    for(let i = 0; i < spans.length; i++){
        spans[i].classList.add('rotate');
        spans[i].style.transitionDelay = `${i * 0.15}s`;
    }
})