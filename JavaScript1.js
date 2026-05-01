document.querySelectorAll('.float-whatsapp, .float-call').forEach(btn => {
        btn.addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate(50); // short vibration
            }
        });
});
