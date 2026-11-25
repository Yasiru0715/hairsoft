/* =========================================================
   HAIR SOFT — script.js
   ========================================================= */
'use strict';

/* =========================================================
   1. SERVICES & PRICES
   ----- Edit service names, descriptions and prices here -----
   ========================================================= */
const SERVICES = [
    {
        name: "Men's Haircut",
        desc: 'Precision cuts, fades and classic styles tailored to your face shape',
        price: 800,
        img: 'young-man-barbershop-trimming-hair_1303-26254.avif'
    },
    {
        name: "Women's Haircut",
        desc: 'Layered cuts, bobs, trims and complete restyles by expert hands.',
        price: 1200,
        img: 'images%20(2).jpg'
    },
    {
        name: 'Hair Coloring',
        desc: 'Full color, highlights, balayage and global coloring with premium dyes.',
        price: 'Price Negotiable',
        img: 'images%20(1).jpg'
    },
    {
        name: 'Hair Styling',
        desc: 'Blow-dry, curls, waves and elegant styling for any occasion.',
        price: 6000,
        img: 'images%20(3).jpg'
    },
    {
        name: 'Hair Straightening',
        desc: 'Smooth, silky, frizz-free hair with professional straightening.',
        price: 3000,
        img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=700&auto=format&fit=crop'
    },
    {
        name: 'Brazilian Keratin Treatment',
        desc: 'Professional keratin treatment for smoother, softer and more manageable hair.',
        price: '15,000/= upwards',
        img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=700&auto=format&fit=crop'
    },
    {
        name: 'Hair Treatments',
        desc: 'Keratin, spa and deep-conditioning treatments for healthy hair.',
        price: 10000,
        img: 'images%20(4).jpg'
    },
    {
        name: 'Hair Washing',
        desc: 'Relaxing wash with premium shampoo, conditioning and head massage.',
        price: 5420,
        img: 'hair-4-1.jpg'
    },
    {
        name: 'Beard Trimming',
        desc: 'Sharp beard shaping, trimming and grooming for a refined look.',
        price: 500,
        img: 'Beard_hero1.webp'
    }
];

const CURRENCY = 'Rs.'; // change to '$', '€', etc. if needed

/* =========================================================
   2. RENDER SERVICE CARDS
   ========================================================= */

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = SERVICES.map(s => `
        <article class="service-card reveal" data-service="${s.name}">
            <div class="service-card-img">
                <img src="${s.img}" alt="${s.name}" loading="lazy">
            </div>
            <div class="service-card-body">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <div class="service-price">
                    <span class="price">${typeof s.price === 'number' ? CURRENCY + ' ' + s.price : s.price}</span>
                    <a href="#appointment" class="book-link" data-service="${s.name}">Book →</a>
                </div>
            </div>
        </article>
    `).join('');

    // Populate booking dropdown
    const serviceSelect = document.getElementById('serviceSelect');

    if (serviceSelect) {
        serviceSelect.innerHTML = '<option value="">Select a service</option>';

        SERVICES.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.name;
            opt.textContent = `${s.name} — ${typeof s.price === 'number' ? CURRENCY + ' ' + s.price : s.price}`;
            serviceSelect.appendChild(opt);
        });
    }

    // Book button
    grid.querySelectorAll('.book-link').forEach(link => {
        link.addEventListener('click', () => {
            if (serviceSelect) {
                serviceSelect.value = link.dataset.service;
                clearError(serviceSelect);
            }
        });
    });

    // Hair Styling card click
    grid.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.book-link')) return;

            if (card.dataset.service === 'Hair Styling') {
                openHairStylingPopup();
            }
        });
    });

    observeReveals();
}

/* =========================================================
   HAIR STYLING POPUP
   ========================================================= */

const HAIR_STYLES = [
    {
        name: 'Fashion Hair Style',
        desc: 'Elegant and modern fashion hairstyles for a stylish look.',
        price: 3000,
        img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=700&auto=format&fit=crop'
    },
    {
        name: 'Kandyan Hair Style',
        desc: 'Traditional Kandyan hairstyles for cultural occasions.',
        price: 3500,
        img: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=700&auto=format&fit=crop'
    },
    {
        name: 'Western Hair Style',
        desc: 'Beautiful western-inspired hairstyles with a modern finish.',
        price: 3000,
        img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=700&auto=format&fit=crop'
    },
    {
        name: 'Party Hair Style',
        desc: 'Glamorous hairstyles for parties and special events.',
        price: 4000,
        img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=700&auto=format&fit=crop'
    }
];

function openHairStylingPopup() {
    const overlay = document.getElementById('hairStylingOverlay');
    const items = document.getElementById('hairStylingItems');

    if (!overlay || !items) return;

    items.innerHTML = HAIR_STYLES.map(style => `
        <div class="hair-style-card">
            <img src="${style.img}" alt="${style.name}" loading="lazy">

            <div class="hair-style-info">
                <h3>${style.name}</h3>
                <p>${style.desc}</p>

                <div class="hair-style-bottom">
                    <span class="hair-style-price">
                        Rs. ${style.price.toLocaleString('en-LK')}
                    </span>

                    <button class="hair-style-book"
                        data-style="${style.name}">
                        Book Your Style
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    items.querySelectorAll('.hair-style-book').forEach(button => {
        button.addEventListener('click', () => {
            const serviceSelect = document.getElementById('serviceSelect');
            const messageField = document.getElementById('custMsg');

            if (serviceSelect) {
                serviceSelect.value = 'Hair Styling';
                clearError(serviceSelect);
            }

            if (messageField) {
                const selectedStyle = button.dataset.style;
                messageField.value = messageField.value
                    ? messageField.value + '\nSelected Style: ' + selectedStyle
                    : 'Selected Style: ' + selectedStyle;
            }

            closeHairStylingPopup();

            document.getElementById('appointment')
                ?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeHairStylingPopup() {
    const overlay = document.getElementById('hairStylingOverlay');

    if (!overlay) return;

    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function initHairStylingPopup() {
    const overlay = document.getElementById('hairStylingOverlay');
    const closeButton = document.getElementById('hairStylingClose');

    if (!overlay || !closeButton) return;

    closeButton.addEventListener('click', closeHairStylingPopup);

    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            closeHairStylingPopup();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeHairStylingPopup();
        }
    });
}


/* =========================================================
   3. NAVBAR — sticky style + mobile menu
   ========================================================= */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}

/* =========================================================
   4. ACTIVE NAV LINK ON SCROLL
   ========================================================= */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    const spy = () => {
        const pos = window.scrollY + 120;
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id));
            }
        });
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
}

/* =========================================================
   5. SCROLL REVEAL ANIMATION
   ========================================================= */
let revealObserver;
function observeReveals() {
    if (!revealObserver) {
        revealObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
    }
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

/* =========================================================
   6. APPOINTMENT BOOKING
   ========================================================= */
function initBooking() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
   emailjs.init({
    publicKey: '879rW8HC3_ERfWrvK'
});

    // --- Prevent past dates: date input minimum = today ---
    const dateInput = document.getElementById('apptDate');
    const today = new Date();
    const pad = n => String(n).padStart(2, '0');
    dateInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    // Block manually-typed past dates as well
    dateInput.addEventListener('change', () => {
        if (dateInput.value && dateInput.value < dateInput.min) {
            showError(dateInput, 'Please choose today or a future date.');
        } else {
            clearError(dateInput);
        }
    });

    // --- Live validation: clear errors while typing ---
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => clearError(field));
        field.addEventListener('change', () => clearError(field));
    });

    // --- Submit & validate ---
    form.addEventListener('submit', async e => {
        e.preventDefault();
        let valid = true;

        const name = document.getElementById('custName');
        const phone = document.getElementById('custPhone');
        const email = document.getElementById('custEmail');
        const service = document.getElementById('serviceSelect');
        const stylist = document.getElementById('stylistSelect');
        const time = document.getElementById('apptTime');

        if (!name.value.trim() || name.value.trim().length < 2) {
            showError(name, 'Please enter your full name.'); valid = false;
        }
        if (!/^[+]?[\d\s\-()]{7,16}$/.test(phone.value.trim())) {
            showError(phone, 'Please enter a valid phone number.'); valid = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address.'); valid = false;
        }
        if (!service.value) { showError(service, 'Please select a service.'); valid = false; }
        if (!stylist.value) { showError(stylist, 'Please select a stylist.'); valid = false; }
        if (!dateInput.value) {
            showError(dateInput, 'Please choose a date.'); valid = false;
        } else if (dateInput.value < dateInput.min) {
            showError(dateInput, 'Past dates are not allowed.'); valid = false;
        }
        if (!time.value) { showError(time, 'Please choose a time slot.'); valid = false; }

        if (!valid) {
            const firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid select');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        const details = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    service: service.value,
    stylist: stylist.value,
    date: dateInput.value,
    time: time.value,
    message: document.getElementById('custMsg').value.trim()
};

const bookingId = 'HS-' + Date.now().toString(36).toUpperCase().slice(-6);

try {
    await emailjs.send(
        'service_ajih5pf',
        'template_5pn9aq8',
        {
            booking_id: bookingId,
            customer_name: details.name,
            customer_phone: details.phone,
            customer_email: details.email,
            selected_service: details.service,
            selected_stylist: details.stylist,
            appointment_date: details.date,
            appointment_time: details.time,
            additional_message: details.message
        }
    );

    openConfirmation(details, bookingId);

} catch (error) {
    console.error('EmailJS Error:', error);
    alert('Booking notification failed. Please try again.');
    }
});
}

function showError(field, message) {
    const group = field.closest('.form-group');
    group.classList.add('invalid');
    group.querySelector('.error-msg').textContent = message;
}

function clearError(field) {
    const group = field.closest('.form-group');
    if (group) group.classList.remove('invalid');
}

/* =========================================================
   7. CONFIRMATION MODAL
   ========================================================= */
function openConfirmation(details, bookingId) {
    const overlay = document.getElementById('modalOverlay');
    const box = document.getElementById('modalDetails');
   
    const prettyDate = new Date(details.date + 'T00:00:00')
        .toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });

    const row = (label, value) =>
        value ? `<div class="row"><span>${label}</span><span>${value}</span></div>` : '';

    box.innerHTML =
        `<div class="row booking-id"><span>Booking ID</span><span>${bookingId}</span></div>` +
        row('Name', details.name) +
        row('Phone', details.phone) +
        row('Email', details.email) +
        row('Service', details.service) +
        row('Stylist', details.stylist) +
        row('Date', prettyDate) +
        row('Time', details.time) +
        row('Message', details.message);

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Reset form after a successful booking
    document.getElementById('bookingForm').reset();
}

function closeConfirmation() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function initModal() {
    document.getElementById('modalClose').addEventListener('click', closeConfirmation);
    document.getElementById('modalDone').addEventListener('click', closeConfirmation);
    document.getElementById('modalOverlay').addEventListener('click', e => {
        if (e.target.id === 'modalOverlay') closeConfirmation();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeConfirmation();
    });
}

/* =========================================================
   8. FOOTER YEAR
   ========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    initNavbar();
    initScrollSpy();
    initBooking();
    initModal();
    initHairStylingPopup();
    observeReveals();
});
