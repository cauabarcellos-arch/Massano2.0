  const WHATSAPP_NUMBER = '71 99111-7575';

  function scrollToSection(href) {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  function openWhatsApp() {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços de regularização empresarial.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  }

  function openMailTo(subjectText, bodyText) {
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:contato@massanoassessoria.com.br?subject=${subject}&body=${body}`;
  }

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

  function buildMailBody(formData) {
    const lines = [];

    for (const [key, value] of formData.entries()) {
      if (!String(value).trim()) continue;
      lines.push(`${labelFromKey(key)}: ${value}`);
    }

    return lines.join('\n');
  }

  function setupScrollButtons() {
    const menuButtons = document.querySelectorAll('[data-scroll]');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    menuButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const href = button.getAttribute('data-scroll');
        if (!href) return;

        scrollToSection(href);

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          menuIcon?.classList.remove('hidden');
          closeIcon?.classList.add('hidden');
        }
      });
    });
  }

  function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');

      if (isOpen) {
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
        return;
      }

      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    });
  }

  function setupWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('[data-action="whatsapp"]');
    whatsappButtons.forEach((button) => {
      button.addEventListener('click', openWhatsApp);
    });
  }

  function setupMailForms() {
    const forms = document.querySelectorAll('form[data-mail-form], #contact-form');

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const subject = form.getAttribute('data-mail-subject') || 'Solicitação de Orçamento - Massano Assessoria';
        const body = buildMailBody(formData);

        openMailTo(subject, body);
      });
    });
  }

  function setupCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons();
    }

    setupScrollButtons();
    setupMobileMenu();
    setupWhatsAppButtons();
    setupMailForms();
    setupCurrentYear();
  });
