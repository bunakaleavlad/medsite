document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Handling
    const check = document.getElementById('check');
    const backdrop = document.querySelector('.menu-backdrop');
    if (backdrop) {
        const closeMenu = (e) => {
            if (e.type === 'touchstart') e.preventDefault();
            if (check) check.checked = false;
        };
        backdrop.addEventListener('click', closeMenu);
        backdrop.addEventListener('touchstart', closeMenu, {passive: false});
    }

    let startX = 0;
    document.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    }, {passive: true});

    document.addEventListener('touchend', e => {
        let endX = e.changedTouches[0].screenX;
        if (check && check.checked && (endX - startX > 50)) {
            check.checked = false;
        }
    }, {passive: true});

    // Prices Handling
    const PRICES = {
        alc: 3800,
        beauty: 1900,
        detox: 2900,
        immunity: 1600,
        nurse: 600,
        iv_home: 600,
        poisoning: 2900
    };
    for (const key in PRICES) {
        const id = 'price-' + key.replace('_', '-');
        const el = document.getElementById(id);
        if (el) {
            el.textContent = PRICES[key];
        }
    }

    // Form Submit Handling
    const tgForm = document.getElementById("tg");
    if (tgForm) {
        tgForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const CHAT_ID = "410783080";
            const URI_API = "https://api.telegram.org/bot7974988414:AAHZy2qsU9XD-4Wtsq5tN-phJvJ_So4VnvM/sendMessage";
            
            let massage = "<b>Заявка с сайта:</b>\n";
            const phoneInput = document.getElementById("user_phone");
            if (phoneInput) {
                massage += phoneInput.value;
            }

            if (typeof axios !== 'undefined') {
                axios.post(URI_API, {
                    chat_id: CHAT_ID,
                    parse_mode: "html",
                    text: massage,
                }).then((res) => {
                    if (phoneInput) phoneInput.value = "";
                    const success = document.getElementById("success");
                    if (success) success.style.display = "block";
                }).catch(err => {
                    console.error("Ошибка отправки заявки", err);
                });
            } else {
                console.error("Axios не загружен");
            }
        });
    }
});
