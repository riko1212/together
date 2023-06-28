const nextBtnEl = document.querySelectorAll('.js-hero-next');
const prevBtnEl = document.querySelectorAll('.js-hero-back');
const stepsArr = document.querySelectorAll('.hero-step');
const bulitArr = document.querySelectorAll('.hero-bulit-item');
const professionBtnEl = document.querySelector('.profession-btn');
const ageBtnEl = document.querySelector('.age-btn');
const locationBtnEl = document.querySelector('.location-btn');
const emailBtnEl = document.querySelector('.email-btn');
const finalBtnEl = document.querySelector('.final-btn');

const makeNextStep = (event) => {
  event.target.closest('.hero-step').classList.remove('current');
  event.target
    .closest('.hero-step')
    .nextElementSibling.classList.add('current');
};

const fetchErrors = () => {
  return fetch('http://www.mocky.io/v2/5dfcef48310000ee0ed2c281').then(
    (response) => {
      return response.json();
    }
  );
};

const showError = (event, err) => {
  const errorView = event.target
    .closest('.hero-step')
    .querySelector('.hero-input-bottom');
  errorView.classList.add('show');
  errorView.classList.add('step-error');
  errorView.textContent = err.message;
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
  }
};

const onAgeBtnElClick = (e) => {
  if (e.target.parentNode.querySelector('.hero-input-field').value === '') {
    fetchErrors().then(({ errors }) => {
      const error = errors.find((el) => el.name === 'age');
      showError(e, error);
    });
  } else {
    makeNextStep(e);
  }
};
const onLocationBtnElClick = (e) => {
  if (e.target.parentNode.querySelector('.hero-input-field').value === '') {
    fetchErrors().then(({ errors }) => {
      const error = errors.find((el) => el.name === 'location');
      showError(e, error);
    });
  } else {
    makeNextStep(e);
  }
};

const onEmailBtnElClick = (e) => {
  if (e.target.parentNode.querySelector('.hero-input-field').value === '') {
    fetchErrors().then(({ errors }) => {
      const error = errors.find((el) => el.name === 'email');
      showError(e, error);
    });
  } else {
    makeNextStep(e);
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

professionBtnEl.addEventListener('click', onProfessionBtnElClick);
ageBtnEl.addEventListener('click', onAgeBtnElClick);
locationBtnEl.addEventListener('click', onLocationBtnElClick);
emailBtnEl.addEventListener('click', onEmailBtnElClick);
finalBtnEl.addEventListener('click', onFinalBtnElClick);

// const onNextBtnClick = (e) => {
//   let active = 0;
//   stepsArr.forEach((el, i) => {
//     if (el.classList.contains('current')) {
//       active = i;
//       el.classList.remove('current');
//     }
//   });
//   stepsArr[active + 1].classList.add('current');
//   bulitArr[active + 1].classList.add('filled');
// };

const onPrevBtnClick = (e) => {
  let active = 0;
  stepsArr.forEach((el, i) => {
    if (el.classList.contains('current')) {
      active = i;
      el.classList.remove('current');
    }
  });
  stepsArr[active - 1].classList.add('current');
  bulitArr[active].classList.remove('filled');
};

// nextBtnEl.forEach((el) => el.addEventListener('click', onNextBtnClick));
prevBtnEl.forEach((el) => el.addEventListener('click', onPrevBtnClick));
