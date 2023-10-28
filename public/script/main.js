/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const selectRow = function (trElement, inputId) {
  const roundIdInput = document.getElementById(inputId);
  if (roundIdInput.value === trElement.id) {
    //selected same row before, reset everything
    trElement.className = '';
    roundIdInput.value = '';
  } else {
    //selected new row
    if (roundIdInput.value) {
      //if previous row is not empty, deselect
      document.getElementById(roundIdInput.value).className = '';
    }
    trElement.className = 'bg-blue-300';
    roundIdInput.value = trElement.id;
  }
};

const validateSelection = function (inputId) {
  const input = document.getElementById(inputId);
  return input.value.trim().length > 0;
};
const incNumber = function (inputId, inc = 1, min = 0, max = 9) {
  const input = document.getElementById(inputId);
  const n = Number(input.value);
  if (n >= max) return;
  input.value = n + inc;
};

const decNumber = function (inputId, dec = 1, min = 0, max = 9) {
  const input = document.getElementById(inputId);
  const n = Number(input.value);
  if (n <= min) return;
  input.value = n - dec;
};

const selectUser = function (inputId) {
  const input = document.getElementById(inputId);
  input.checked = !input.checked;
};

const selectFile = function (inputId, image) {
  const input = document.getElementById(inputId);
  input.click();
  input.addEventListener('change', () => {
    image.src = URL.createObjectURL(input.files[0]);
  });
};

const validateNewGame = function (bannerId, inputName) {
  const inputs = document.getElementsByName(inputName);
  const banner = document.getElementById(bannerId);
  const selectedArray = Array.from(inputs.values()).filter(
    (input) => input.checked,
  );

  if (selectedArray.length !== 3) {
    banner.textContent = `3 ✔, ${selectedArray.length} ❌`;
    return false;
  }
  return true;
};
