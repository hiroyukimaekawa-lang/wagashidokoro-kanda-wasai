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
});
