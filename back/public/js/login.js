const testerAccessButton = document.querySelector('#tester-access');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

testerAccessButton?.addEventListener('click', () => {
    emailInput.value = 'tester@poketcg.com';
    passwordInput.value = 'PokeTester334!';
    passwordInput.focus();
});
