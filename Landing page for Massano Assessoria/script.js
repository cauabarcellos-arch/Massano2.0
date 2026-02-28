// Animação de contagem para o número de anos de experiência
document.addEventListener('DOMContentLoaded', function() {
    const xpCount = document.getElementById('xp-count');
    if (xpCount) {
        let start = 0;
        const end = 10;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / end), 50);
        const timer = setInterval(() => {
            start++;
            xpCount.textContent = '+' + start;
            if (start >= end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
});

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

            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon?.classList.remove('hidden');
                closeIcon?.classList.add('hidden');
            }

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
        
        menuButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            menuButton.style.transform = '';
        }, 200);

        mobileMenu.classList.toggle('hidden');

        if (isOpen) {
            menuIcon?.classList.remove('hidden');
            closeIcon?.classList.add('hidden');
            mobileMenu.style.animation = 'slideOutUp 0.3s ease';
        } else {
            menuIcon?.classList.add('hidden');
            closeIcon?.classList.remove('hidden');
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
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const subject = form.getAttribute('data-mail-subject') || 'Solicitação de Orçamento - Massano Assessoria';
            const body = buildMailBody(formData);

            setTimeout(() => {
                openMailTo(subject, body);
                
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
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
        
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const value = Math.floor(eased * (end - start) + start);
        el.textContent = '+' + value;
        
        animarFatias(eased);

        if (progress < 1) {
            requestAnimationFrame(animateCount);
        } else {
            el.textContent = '+10';
            animarFatias(1);
            
            const badge = document.querySelector('.xp-badge');
            badge.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                badge.style.animation = '';
            }, 500);
        }
    }

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
 * ===== POPUP DE PREÇO =====
 */
function openPricePopup() {
    const popup = document.getElementById('pricePopup');
    popup.classList.add('active');
}

function closePricePopup() {
    const popup = document.getElementById('pricePopup');
    popup.classList.remove('active');
}

/**
 * Inicialização
 */
window.addEventListener('DOMContentLoaded', () => {
    function setupHeroCarousel() {
        const imgs = document.querySelectorAll('.hero-carousel .carousel-img');
        let idx = 0;
        const total = imgs.length;
        const interval = 4000;

        function showImage(i) {
            imgs.forEach((img, j) => {
                img.style.opacity = (j === i) ? '1' : '0';
                img.style.zIndex = (j === i) ? '1' : '0';
            });
        }
        
        if (total > 0) {
            showImage(idx);
            setInterval(() => {
                idx = (idx + 1) % total;
                showImage(idx);
            }, interval);
        }
    }
    
    setupHeroCarousel();
    
    if (window.lucide?.createIcons) {
        window.lucide.createIcons();
    }

    criarFatias();
    setupBadgeAnimation();
    setupScrollButtons();
    setupMobileMenu();
    setupWhatsAppButtons();
    setupMailForms();
    setupCurrentYear();
    setupScrollReveal();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                scrollToSection(href);
            }
        });
    });

    // Configurar fechar popup ao clicar fora
    const popup = document.getElementById('pricePopup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePricePopup();
            }
        });
    }

    // Fechar popup com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePricePopup();
        }
    });

    // Abrir popup automaticamente após 5 segundos (opcional)
    setTimeout(function() {
        if (!sessionStorage.getItem('popupShown')) {
            openPricePopup();
            sessionStorage.setItem('popupShown', 'true');
        }
    }, 5000);
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const heroContent = document.querySelector('.hero-panel .relative');
    if (heroContent) {
        heroContent.classList.add('content-loaded');
    }
});

// ===== FECHAR MODAL AO CLICAR FORA =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-servico');
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            // Verifica se clicou no fundo escuro (overlay) e não no conteúdo do modal
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

// ===== POPUP INLINE ENTRE O TEXTO =====
function togglePricePopup() {
    const popup = document.getElementById('pricePopupInline');
    popup.classList.toggle('show');
}

// Fechar popup ao clicar fora
document.addEventListener('click', function(event) {
    const popup = document.getElementById('pricePopupInline');
    const trigger = document.querySelector('.price-popup-trigger');
    
    if (popup && trigger) {
        if (!trigger.contains(event.target) && !popup.contains(event.target)) {
            popup.classList.remove('show');
        }
    }
});

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popup = document.getElementById('pricePopupInline');
        if (popup) popup.classList.remove('show');
    }
});
