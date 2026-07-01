const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const themeText = document.getElementById('theme-text');

// 1. Verifica daca utilizatorul are deja o preferinta salvata sau citeste setarea sistemului
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    updateToggleUI(true);
} else {
    document.body.classList.remove('dark-theme');
    updateToggleUI(false);
}

// 2. Asculta click-ul pe buton pentru schimbare manuala
themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleUI(isDark);
});

// 3. Functie auxiliara pentru a schimba iconita si textul de pe buton
function updateToggleUI(isDark) {
    if (isDark) {
        themeIcon.className = 'fa-solid fa-sun';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
        themeText.textContent = 'Dark Mode';
    }
}

// --- LOGICA PENTRU ACCORDION SHOWCASE ---
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        
        // Verifica daca e deja deschis
        const isOpen = item.classList.contains('active');
        
        // Optional: Inchide celelalte casete deschise (efect de acordeon pur)
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = null;
        });
        
        // Daca nu era deschis, il deschidem calculandu-i inaltimea reala scrollHeight
        if (!isOpen) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// --- CLI TYPING EFFECT LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    // Schimba aici cu numele tau real daca vrei sa apara complet
    const nameText = "Marius Vărășteanu"; 
    const titleText = "Software Architect & Full Stack Developer";
    
    const nameContainer = document.getElementById("cli-name");
    const titleContainer = document.getElementById("cli-title");
    
    let nameIndex = 0;
    let titleIndex = 0;
    
    // Viteza de scriere (in milisecunde per litera)
    const typeSpeed = 60; 

    function typeName() {
        if (nameIndex < nameText.length) {
            // Adaugam cursorul doar pe elementul care se scrie acum
            nameContainer.classList.add("cli-cursor");
            nameContainer.textContent += nameText.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, typeSpeed);
        } else {
            // Cand numele e gata, scoatem cursorul de pe el si pornim titlul
            nameContainer.classList.remove("cli-cursor");
            setTimeout(typeTitle, 300); // O scurta pauza de realism intre randuri
        }
    }

    function typeTitle() {
        if (titleIndex < titleText.length) {
            titleContainer.classList.add("cli-cursor");
            titleContainer.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, typeSpeed);
        }
        // Cursorul ramane activ la finalul titlului si va clipi la nesfarsit
    }

    // Porneste animatia cand pagina s-a incarcat complet
    typeName();
});

// --- LOGICA BUTON BACK TO TOP ---
document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;

    // Afiseaza butonul doar dupa ce s-a coborat mai mult de 400px
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    // Actiunea de click cu scroll fluid catre inceputul paginii
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});