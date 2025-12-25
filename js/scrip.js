// import images as relative image path won't work with vite/vercel.
import check from '../assets/check.svg'

import AOS from 'aos'
import 'aos/dist/aos.css'

// init AOS animation
AOS.init({
  duration: 1000,
  offset: 100,
})

// Mobile Menu Logic
const menuBtn = document.querySelector('.header__menu-movil')
const navMenu = document.querySelector('.header__menu')

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show')
  })

  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show')
    })
  })
}

// Product Interaction Logic
const products = [
  {
    id: 'ricarina',
    title: 'Ricarina Harina de trigo multiusos',
    img: '/assets/ricarina-multiuso.png',
    desc: 'Ricarina es la elección perfecta para la elaboración de bollería y panes comerciales. Con su calidad superior, garantiza resultados consistentes y deliciosos en todas tus recetas.',
  },
  {
    id: 'prima-suave',
    title: 'PRIMARINA Especial suave',
    img: '/assets/prima-harina-100.png',
    desc: 'Nuestra Primarina Especial Suave es ideal para repostería fina y productos que requieren una textura aireada y delicada. La favorita de los reposteros.',
  },
  {
    id: 'prima-multi',
    title: 'PRIMARINA Multiproposito',
    img: '/assets/prima-harina-1.png',
    desc: 'Versatilidad en cada gramo. Primarina Multiproposito se adapta a diversas preparaciones, desde pan artesanal hasta galletas crujientes.',
  },
  {
    id: 'super-integral',
    title: 'Superstar Harina Integral',
    img: '/assets/superstar-integral.png',
    desc: 'Para quienes buscan salud y sabor. Harina integral de alta calidad, rica en fibra y perfecta para panes con carácter.',
  },
  {
    id: 'super-multi',
    title: 'SUPERSTAR Multiproposito',
    img: '/assets/superstar-multiproposito.png',
    desc: 'Calidad profesional para todo tipo de panadería. Rendimiento excepcional y absorción de agua superior.',
  },
  {
    id: 'super-pizza',
    title: 'SUPERSTAR especial pizza',
    img: '/assets/superstar-especial-pizza.png',
    desc: 'Diseñada específicamente para lograr esa masa elástica y crujiente que toda pizza gourmet necesita.',
  },
  {
    id: 'doral',
    title: 'Doral simple - Doral Mantequilla',
    img: '/assets/doral.png',
    desc: 'Mezclas listas para usar que ahorran tiempo sin sacrificar el sabor tradicional de una buena mantequilla.',
  },
  {
    id: 'instaferm',
    title: 'Instaferm Levadura',
    img: '/assets/instaferm.png',
    desc: 'Levadura seca instantánea de alto poder. Garantiza un crecimiento uniforme y rápido en todas tus masas.',
  },
]

const filterBtns = document.querySelectorAll('.popular-foods__filter-btn')
const catalogue = document.querySelector('.popular-foods__catalogue')

function updateCatalogue(product) {
  if (!catalogue) return

  // Smooth transition
  catalogue.style.opacity = '0'

  setTimeout(() => {
    if (product === 'all') {
      catalogue.innerHTML = products
        .map(
          p => `
                <article class="popular-foods__card">
                    <img src="${p.img}" alt="${p.id}" class="popular-foods__card-img">
                    <h4 class="popular-foods__card-title">${p.title}</h4>
                </article>
            `
        )
        .join('')
    } else {
      const p = products.find(
        prod =>
          product
            .toLowerCase()
            .includes(prod.title.split(' ')[0].toLowerCase()) ||
          product.toLowerCase().includes(prod.id)
      )
      if (p) {
        catalogue.innerHTML = `
                    <article class="popular-foods__card active-card" style="max-width: 600px;">
                        <img src="${p.img}" alt="${p.title}" class="popular-foods__card-img" style="width: auto; height: 200px;">
                        <h4 class="popular-foods__card-title">${p.title}</h4>
                        <p>${p.desc}</p>
                    </article>
                `
      }
    }
    catalogue.style.opacity = '1'
  }, 300)
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const filterText = btn.textContent.trim()
    if (filterText === 'Todos') {
      updateCatalogue('all')
    } else {
      updateCatalogue(filterText)
    }
  })
})

// Initialize AOS again after dynamic updates if needed,
// though we usually just want transitions for simple filtering.
