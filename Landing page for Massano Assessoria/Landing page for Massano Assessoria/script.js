// Número do WhatsApp
const WHATSAPP_NUMBER = '71 99111-7575';

/**
 * Rola suavemente até a seção
 */
function scrollToSection(href) {
    if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const section = document.querySelector(href);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Abre WhatsApp com animação
 */
function openWhatsApp() {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços de regularização empresarial.');
    
    // Feedback visual nos botões
    const buttons = document.querySelectorAll('[data-action="whatsapp"]');
    buttons.forEach(btn => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

/**
 * Abre cliente de e-mail
 */
function openMailTo(subjectText, bodyText) {
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:contato@massanoassessoria.com.br?subject=${subject}&body=${body}`;
}

/**
 * Rótulos dos campos
 */
function labelFromKey(key) {
    const labels = {
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        phone: 'Telefone',
        businessType: 'Tipo de Negócio',
    };
    return labels[key] || key;
}

/**
 * Constrói corpo do e-mail
 */
function buildMailBody(formData) {
    const lines = [];
    for (const [key, value] of formData.entries()) {
        if (!String(value).trim()) continue;
        lines.push(`${labelFromKey(key)}: ${value}`);
    }
    return lines.join('\n');
}

/**
 * Configura botões de scroll
 */
function setupScrollButtons() {
    const menuButtons = document.querySelectorAll('[data-scroll]');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    menuButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('data-scroll');
            if (!href) return;

            scrollToSection(href);

            // Fecha menu mobile se aberto
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon?.classList.remove('hidden');
                closeIcon?.classList.add('hidden');
            }

            // Animação do botão clicado
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
        });
    });
}

/**
 * Configura menu mobile
 */
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        // Animação do botão
        menuButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            menuButton.style.transform = '';
        }, 200);

        mobileMenu.classList.toggle('hidden');

        if (isOpen) {
            menuIcon?.classList.remove('hidden');
            closeIcon?.classList.add('hidden');
            // Animação de fechar
            mobileMenu.style.animation = 'slideOutUp 0.3s ease';
        } else {
            menuIcon?.classList.add('hidden');
            closeIcon?.classList.remove('hidden');
            // Animação de abrir
            mobileMenu.style.animation = 'slideInDown 0.3s ease';
        }
    });
}

/**
 * Configura botões do WhatsApp
 */
function setupWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('[data-action="whatsapp"]');
    whatsappButtons.forEach((button) => {
        button.addEventListener('click', openWhatsApp);
    });
}

/**
 * Configura formulários de e-mail
 */
function setupMailForms() {
    const forms = document.querySelectorAll('form[data-mail-form], #contact-form');

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Feedback de loading
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const subject = form.getAttribute('data-mail-subject') || 'Solicitação de Orçamento - Massano Assessoria';
            const body = buildMailBody(formData);

            // Simula um pequeno delay para mostrar o loading
            setTimeout(() => {
                openMailTo(subject, body);
                
                // Remove loading
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Feedback de sucesso
                submitBtn.textContent = '✓ Enviado!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 2000);
            }, 500);
        });
    });
}

/**
 * Atualiza ano no footer
 */
function setupCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }
}

/**
 * Cria as fatias do círculo para o badge
 */
function criarFatias() {
    const badge = document.querySelector('.xp-badge');
    if (!badge) return;
    if (badge.querySelector('.xp-badge-svg')) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "xp-badge-svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    const centroX = 50, centroY = 50, raio = 46;
    const anguloInicial = -90;
    const numFatias = 10;
    const anguloPorFatia = 360 / numFatias;

    for (let i = 0; i < numFatias; i++) {
        const angulo1 = (anguloInicial + i * anguloPorFatia) * Math.PI / 180;
        const angulo2 = (anguloInicial + (i + 1) * anguloPorFatia) * Math.PI / 180;

        const x1 = centroX + raio * Math.cos(angulo1);
        const y1 = centroY + raio * Math.sin(angulo1);
        const x2 = centroX + raio * Math.cos(angulo2);
        const y2 = centroY + raio * Math.sin(angulo2);

        const largeArcFlag = anguloPorFatia > 180 ? 1 : 0;
        const d = `M ${centroX} ${centroY} L ${x1} ${y1} A ${raio} ${raio} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "#c9a34b");
        path.setAttribute("data-fatia", i);
        svg.appendChild(path);
    }

    badge.insertBefore(svg, badge.firstChild);
}

/**
 * Anima as fatias do círculo
 */
function animarFatias(progresso) {
    const paths = document.querySelectorAll('.xp-badge-svg path');
    if (!paths.length) return;

    const separacao = 1 - progresso;
    const centroX = 50, centroY = 50;
    const raioBase = 46;
    const numFatias = 10;
    const anguloBase = 360 / numFatias;

    paths.forEach((path, i) => {
        const anguloInicial = -90 + i * anguloBase;
        const anguloEfetivo = anguloBase * (1 - separacao * 0.2);
        const gapAngular = (anguloBase - anguloEfetivo) / 2;

        const ang1 = (anguloInicial + gapAngular) * Math.PI / 180;
        const ang2 = (anguloInicial + anguloBase - gapAngular) * Math.PI / 180;

        const raioEfetivo = raioBase * (1 - separacao * 0.1);

        const x1 = centroX + raioEfetivo * Math.cos(ang1);
        const y1 = centroY + raioEfetivo * Math.sin(ang1);
        const x2 = centroX + raioEfetivo * Math.cos(ang2);
        const y2 = centroY + raioEfetivo * Math.sin(ang2);

        const largeArcFlag = anguloEfetivo > 180 ? 1 : 0;
        const d = `M ${centroX} ${centroY} L ${x1} ${y1} A ${raioEfetivo} ${raioEfetivo} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
        
        // Animação suave com requestAnimationFrame
        requestAnimationFrame(() => {
            path.setAttribute("d", d);
        });
    });
}

/**
 * Animação do badge de experiência
 */
function setupBadgeAnimation() {
    const el = document.getElementById('xp-badge-animate');
    if (!el) return;

    const start = 0;
    const end = 10;
    const duration = 1500;
    const startTime = performance.now();

    function animateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing suave (cubic-bezier)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const value = Math.floor(eased * (end - start) + start);
        el.textContent = '+' + value;
        
        // Anima as fatias
        animarFatias(eased);

        if (progress < 1) {
            requestAnimationFrame(animateCount);
        } else {
            el.textContent = '+10';
            animarFatias(1);
            
            // Pequena animação de pulso ao final
            const badge = document.querySelector('.xp-badge');
            badge.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                badge.style.animation = '';
            }, 500);
        }
    }

    // Delay inicial para dar tempo de carregar
    setTimeout(() => {
        requestAnimationFrame(animateCount);
    }, 500);
}

/**
 * Adiciona animações de entrada nas seções
 */
function setupScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * Inicialização
 */
window.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones Lucide
    if (window.lucide?.createIcons) {
        window.lucide.createIcons();
    }

    // Configura todas as funcionalidades
    criarFatias();
    setupBadgeAnimation();
    setupScrollButtons();
    setupMobileMenu();
    setupWhatsAppButtons();
    setupMailForms();
    setupCurrentYear();
    setupScrollReveal();

    // Smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                scrollToSection(href);
            }
        });
    });
});

// Animação de loading para imagens
window.addEventListener('load', () => {
    // Remove qualquer classe de loading
    document.body.classList.add('loaded');
    
    // Adiciona classe para elementos que precisam de animação pós-load
    const heroContent = document.querySelector('.hero-panel .relative');
    if (heroContent) {
        heroContent.classList.add('content-loaded');
    }
});