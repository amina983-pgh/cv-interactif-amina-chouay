
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');

    if (sectionId === 'skills') {
        animateSkills();
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function animateSkills() {
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 100);
}

window.addEventListener('load', () => {
    console.log('✅ CV Simple chargé avec succès!');
    animateSkills();
    checkProfileImage();
});

function checkProfileImage() {
    const profileImg = document.querySelector('.profile-img img');
    
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            console.log('✅ Photo de profil chargée avec succès!');
            this.style.opacity = '1';
        });
        profileImg.addEventListener('error', function() {
            console.log('⚠️ Erreur de chargement de la photo. Affichage de l\'icône par défaut.');
            this.style.display = 'none';
            const icon = document.createElement('i');
            icon.className = 'fas fa-user';
            this.parentElement.appendChild(icon);
        });
    } else {
        console.log('ℹ️ Pas de photo de profil. Utilisation de l\'icône par défaut.');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    
    const profileContainer = document.querySelector('.profile-img');
    
    if (profileContainer) {
        profileContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        profileContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    const cards = document.querySelectorAll('.card-simple');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    const contactBoxes = document.querySelectorAll('.contact-box');
    contactBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    const badges = document.querySelectorAll('.badge-custom');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const buttons = Array.from(document.querySelectorAll('.nav-btn'));
        const activeBtn = document.querySelector('.nav-btn.active');
        const currentIndex = buttons.indexOf(activeBtn);
        
        let nextIndex;
        if (e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % buttons.length;
        } else {
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        
        buttons[nextIndex].click();
    }
});
function downloadCV() {
    window.print();
    console.log('📄 Impression du CV lancée');
}
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header && window.innerWidth > 768) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

function isMobile() {
    return window.innerWidth <= 768;
}
window.addEventListener('resize', function() {
    if (isMobile()) {
        console.log('📱 Mode mobile activé');
    } else {
        console.log('💻 Mode desktop activé');
    }
});

function changeProfileImage(imagePath) {
    const profileContainer = document.querySelector('.profile-img');
    const existingImg = profileContainer.querySelector('img');
    const existingIcon = profileContainer.querySelector('i');
    
    if (existingImg) {
        existingImg.src = imagePath;
    } else {
        if (existingIcon) {
            existingIcon.remove();
        }
        const newImg = document.createElement('img');
        newImg.src = imagePath;
        newImg.alt = 'Photo de profil';
        profileContainer.appendChild(newImg);
        newImg.addEventListener('load', function() {
            console.log('✅ Nouvelle photo chargée!');
        });
        
        newImg.addEventListener('error', function() {
            console.log('❌ Erreur de chargement de la nouvelle photo');
        });
    }
}
function smoothTransition(element, property, value, duration = 300) {
    element.style.transition = `${property} ${duration}ms ease`;
    element.style[property] = value;
}
function saveActiveSection(sectionId) {
    localStorage.setItem('activeSection', sectionId);
}
function restoreActiveSection() {
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection) {
        const sectionButton = document.querySelector(`[onclick="showSection('${savedSection}')"]`);
        if (sectionButton) {
        }
    }
}
window.addEventListener('load', restoreActiveSection);
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
const optimizedScroll = debounce(function() {
}, 100);

window.addEventListener('scroll', optimizedScroll);
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('✅ Texte copié:', text);
            showNotification('Texte copié dans le presse-papier!');
        }).catch(err => {
            console.error('❌ Erreur de copie:', err);
        });
    }
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4e54c8;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
function previewProfileImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            changeProfileImage(e.target.result);
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #4e54c8';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Statistiques du CV:');
    console.log('- Sections:', document.querySelectorAll('.section').length);
    console.log('- Cartes:', document.querySelectorAll('.card-simple').length);
    console.log('- Compétences:', document.querySelectorAll('.skill-item').length);
    console.log('- Contacts:', document.querySelectorAll('.contact-box').length);
    console.log('- Badges:', document.querySelectorAll('.badge-custom').length);
    const hasProfileImage = document.querySelector('.profile-img img') !== null;
    console.log('- Photo de profil:', hasProfileImage ? '✅ Présente' : '❌ Absente (icône par défaut)');
});
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript détectée:', e.message);
});
console.log(`
╔════════════════════════════════════════════╗
║    CV SIMPLE - AMINA CHOUAY                ║
║    Version 1.0 avec support photo          ║
║    Développé avec ❤️                       ║
╚════════════════════════════════════════════╝

`);