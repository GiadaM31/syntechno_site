// Attiva/disattiva menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Chiusura del menu mobile quando si clicca su un link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll fluido per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Evidenziazione del link attivo nella navbar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Gestione del form di contatto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ottenere i dati del form
    const formData = new FormData(this);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const messaggio = formData.get('messaggio');
    const privacy = formData.get('privacy');
    
    // Validazione di base
    if (!nome || !email || !messaggio) {
        alert('Per favore, compila tutti i campi obbligatori.');
        return;
    }
    
    if (!privacy) {
        alert('Devi accettare i termini della Privacy per continuare.');
        return;
    }
    
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Per favore, inserisci un indirizzo email valido.');
        return;
    }
    
    // Simulazione invio del form
    alert('Grazie per il tuo messaggio! Ti contatteremo presto.');
    this.reset();
    
    // RIVEDERE QUESTA PARTE: Inviare i dati del form al server
    // Esempio utilizzando l'API fetch:
    /*
    fetch('/contact-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Messaggio inviato con successo!');
        this.reset();
    })
    .catch(error => {
        alert('Errore nell\'invio del messaggio. Riprova più tardi.');
        console.error('Error:', error);
    });
    */
});

// Aggiunta effetti e animazioni interattive
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Inizializzazione delle animazioni al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    // Animazione delle card dei servizi e progetti
    document.querySelectorAll('.servizio-card, .progetto-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animazione di apertura della sezione hero
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
});

// Pulsante "Torna su"
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('id', 'scrollToTop');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #e60012;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

// Mostra/nascondi il pulsante in base allo scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

// Funzionalità del pulsante "Torna su"
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Effetto hover sui link di navigazione
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Effetto ingrandimento bottone CTA tramite JS
document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.transition = 'transform 0.2s';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'none';
    });
});

// Animazione di input del form
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Effetto parallasse alla hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Log di sviluppo in console
console.log('SynTechno website loaded successfully!');
console.log('Developed for SynTechno - Cremona');

// Gestione errori per elementi mancanti
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Gestione eventi di ridimensionamento finestra
window.addEventListener('resize', () => {
    // Chiudi il menu mobile al ridimensionamento
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});