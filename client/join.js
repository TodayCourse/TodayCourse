const agreeChkAll = document.querySelector('input[name=agree_all]');
    agreeChkAll.addEventListener('change', (e) => {
    let agreeChk = document.querySelectorAll('input[name=agree]');
    for(let i = 0; i < agreeChk.length; i++){
      agreeChk[i].checked = e.target.checked;
    }
});

const modalOpenText = document.getElementById('modalOpenText');
const modalOpenText01 = document.getElementById('modalOpenText01');
const modalOpenText02 = document.getElementById('modalOpenText02');
const modalOpenText03 = document.getElementById('modalOpenText03');
const modalOpenText04 = document.getElementById('modalOpenText04');

const modalCloseButton = document.getElementById('modalCloseButton');
const modalCloseButton01 = document.getElementById('modalCloseButton01');
const modalCloseButton02 = document.getElementById('modalCloseButton02');
const modalCloseButton03 = document.getElementById('modalCloseButton03');
const modalCloseButton04 = document.getElementById('modalCloseButton04');

const modal = document.getElementById('modalContainer');
const modal01 = document.getElementById('modalContainer01');
const modal02 = document.getElementById('modalContainer02');
const modal03 = document.getElementById('modalContainer03');
const modal04 = document.getElementById('modalContainer04');

modalOpenText.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modalOpenText01.addEventListener('click', () => {
  modal01.classList.remove('hidden01');
});

modalCloseButton01.addEventListener('click', () => {
  modal01.classList.add('hidden01');
});

modalOpenText02.addEventListener('click', () => {
  modal02.classList.remove('hidden02');
});

modalCloseButton02.addEventListener('click', () => {
  modal02.classList.add('hidden02');
});

modalOpenText03.addEventListener('click', () => {
  modal03.classList.remove('hidden03');
});

modalCloseButton03.addEventListener('click', () => {
  modal03.classList.add('hidden03');
});

modalOpenText04.addEventListener('click', () => {
  modal04.classList.remove('hidden04');
});

modalCloseButton04.addEventListener('click', () => {
  modal04.classList.add('hidden04');
});
