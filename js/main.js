import refs from './refs.js';
import fetchErrors from './fetchErrors.js';

const fillBulits = () => {
  refs.stepsArr.forEach((el, i) => {
    if (el.classList.contains('current')) {
      refs.bulitArr[i].classList.add('filled');
    }
  });
};

const makeNextStep = (event) => {
  event.target.closest('.hero-step').classList.remove('current');
  event.target
    .closest('.hero-step')
    .nextElementSibling.classList.add('current');
};

const showError = (event, err) => {
  const errorView = event.target
    .closest('.hero-step')
    .querySelector('.hero-input-bottom');
  errorView.classList.add('show');
  errorView.classList.add('step-error');
  errorView.textContent = err.message;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

//Handlers

const btnClick = (word, e) => {
  if (e.target.parentNode.querySelector('.hero-input-field').value === '') {
    fetchErrors().then(({ errors }) => {
      const error = errors.find((el) => el.name === word);
      showError(e, error);
    });
  } else {
    makeNextStep(e);
    fillBulits();
  }
};

const onProfessionBtnElClick = (e) => {
  if (e.target.parentNode.querySelector('.hero-input-field').value === '') {
    const errorView = e.target
      .closest('.hero-step')
      .querySelector('.hero-input-bottom');

    errorView.classList.add('show');
    errorView.textContent = 'Please select your position';
  } else {
    makeNextStep(e);
    fillBulits();
  }
};

const onAgeBtnElClick = (e) => {
  btnClick('age', e);
};
const onLocationBtnElClick = (e) => {
  btnClick('location', e);
};

const onEmailBtnElClick = (e) => {
  if (
    e.target.parentNode.querySelector('.hero-input-field').value === '' ||
    !validateEmail(e.target.parentNode.querySelector('.hero-input-field').value)
  ) {
    fetchErrors().then(({ errors }) => {
      const error = errors.find((el) => el.name === 'email');
      showError(e, error);
    });
  } else {
    makeNextStep(e);
    fillBulits();
  }
};

const onFinalBtnElClick = (e) => {
  if (e.target.parentNode.querySelector('.hero-input-field').value === '') {
    fetchErrors().then(({ errors }) => {
      const error = errors.find((el) => el.name === 'password');
      showError(e, error);
    });
  } else {
    e.target.innerHTML = `Start now
                    <svg class="hero-next-icon" width="17" height="11">
                      <use href="./img/symbol-defs.svg#icon-check"></use></svg
                    >`;
    e.target.classList.remove('js-hero-next');
  }
};

const onPrevBtnClick = (e) => {
  let active = 0;
  refs.stepsArr.forEach((el, i) => {
    if (el.classList.contains('current')) {
      active = i;
      el.classList.remove('current');
    }
  });
  refs.stepsArr[active - 1].classList.add('current');
  refs.bulitArr[active].classList.remove('filled');
};

//Listeners

refs.professionBtnEl.addEventListener('click', onProfessionBtnElClick);
refs.ageBtnEl.addEventListener('click', onAgeBtnElClick);
refs.locationBtnEl.addEventListener('click', onLocationBtnElClick);
refs.emailBtnEl.addEventListener('click', onEmailBtnElClick);
refs.finalBtnEl.addEventListener('click', onFinalBtnElClick);
refs.prevBtnEl.forEach((el) => el.addEventListener('click', onPrevBtnClick));
