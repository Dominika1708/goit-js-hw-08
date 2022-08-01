import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener(
  'input',
  throttle(e => {
    e.preventDefault();
    const inputObject = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(inputObject));
  }, 500)
);

const storageContent = localStorage.getItem('feedback-form-state');
const parsedContent = JSON.parse(storageContent);

const checkForData = () => {
  if (storageContent !== null) {
    inputEmail.value = parsedContent.email;
    textarea.value = parsedContent.message;
  }
};
checkForData();

form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;

  console.log(`Email: ${email.value}, Password: ${message.value}`);

  e.currentTarget.reset();
  localStorage.clear();
});
