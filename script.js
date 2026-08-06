document.addEventListener('DOMContentLoaded', () => {
    // 1. スマホ用ハンバーガーメニューの開閉制御
    const menuToggle = document.getElementById('js-menu-toggle');
    const globalNav = document.getElementById('js-global-nav');

    if (menuToggle && globalNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-open');
            globalNav.classList.toggle('is-open');
        });

        // ナびリンククリック時に閉じる
        const navLinks = globalNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-open');
                globalNav.classList.remove('is-open');
            });
        });
    }

    // 2. よくある質問ページ (FAQ) のアコーディオン制御
    const faqToggles = document.querySelectorAll('.js-faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.closest('.faq-item');
            
            // クリックされたアイテムの開閉を切り替える
            if (faqItem) {
                faqItem.classList.toggle('is-active');
            }
        });
    });

    // 3. スクロール時のヘッダー制御（TOPページのみ）
    const body = document.body;
    if (body.classList.contains('home-page')) {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                body.classList.add('is-scrolled');
            } else {
                body.classList.remove('is-scrolled');
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
});
