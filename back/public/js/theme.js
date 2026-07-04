const themeSelect = document.querySelector('#theme-select');
const themeStorageKey = 'poketcg-backoffice-theme';

if (themeSelect) {
    themeSelect.value = document.documentElement.dataset.theme;

    themeSelect.addEventListener('change', () => {
        document.documentElement.dataset.theme = themeSelect.value;
        localStorage.setItem(themeStorageKey, themeSelect.value);
    });
}
