document.querySelectorAll('.tab_menu_btn').forEach(el => {
    el.addEventListener('click', function () {
        document.querySelectorAll('.tab_menu_btn').forEach(el => el.classList.remove('on'));
        this.classList.add('on');
        
        const idx = (() => {
            const elements = document.querySelectorAll('.tab_menu_btn');
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].classList.contains('on')) return i;
            }
        })();
        
        document.querySelector('.tab_menu_btn.on');
        
        document.querySelectorAll('.tab_box').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.tab_box')[idx].style.display = 'block';
    });
});