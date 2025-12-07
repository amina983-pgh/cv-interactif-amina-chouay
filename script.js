function showSection(sectionId, event) {
    if (event) event.preventDefault();

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (event) event.target.classList.add('active');

    if (sectionId === 'skills') animateSkills();

    saveActiveSection(sectionId);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateSkills() {
    setTimeout(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 100);
}

window.addEventListener('load', () => {
    animateSkills();
    checkProfileImage();
    restoreActiveSection();
});

function checkProfileImage() {
    const img = document.querySelector('.profile-img img');
    if (!img) return;

    img.onload = () => img.style.opacity = '1';
    img.onerror = () => {
        img.style.display = 'none';
        const icon = document.createElement('i');
        icon.className = 'fas fa-user';
        img.parentElement.appendChild(icon);
    };
}

function saveActiveSection(id) {
    localStorage.setItem('activeSection', id);
}

function restoreActiveSection() {
    const saved = localStorage.getItem('activeSection');
    if (saved) {
        const btn = document.querySelector(`[onclick="showSection('${saved}', event)"]`);
        if (btn) btn.click();
    }
}

function changeProfileImage(path) {
    const cont = document.querySelector('.profile-img');
    const oldImg = cont.querySelector('img');
    if (oldImg) {
        oldImg.src = path;
        return;
    }
    const img = document.createElement('img');
    img.src = path;
    img.alt = "Photo de profil";
    cont.appendChild(img);
}

function previewProfileImage(input) {
    if (!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => changeProfileImage(e.target.result);
    reader.readAsDataURL(input.files[0]);
}
