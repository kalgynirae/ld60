document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".monitor-content");

  document.querySelectorAll('input[name=font-family]').forEach((input) => {
    input.addEventListener("change", (e) => {
        if (input.checked) {
        content.classList.remove("font-sans");
        content.classList.remove("font-serif");
        content.classList.add(`font-${input.value}`);
      }
    });
  });
});

let isInDialogState = false;

const showClientAsk = () => {
  const client = document.querySelector(".client");
  client.style.visibility = "visible";

  const text = 'i have an unreasonable ask for you. (press v to accept)';
  client.innerHTML = '';

  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.transition = 'opacity 0.1s';
    span.style.transitionDelay = `${index * 40}ms`;
    client.appendChild(span);

    setTimeout(() => {
      span.style.opacity = '1';
    }, 50);
  });
};

const closeClientAsk = () => {
  const client = document.querySelector(".client");
  client.style.visibility = "hidden";
  isInDialogState = false;
};

const playPhoneRingingAnimation = () => {
  if (isInDialogState) {
    return;
  }
  isInDialogState = true;

  const phone = document.querySelector(".phone");
  phone.style.visibility = "visible";

  setTimeout(() => {
      phone.style.visibility = "hidden";

      setTimeout(() => {
          phone.style.visibility = "visible";

          setTimeout(() => {
              phone.style.visibility = "hidden";

              setTimeout(() => {
                  showClientAsk();
              }, 750);
          }, 750);
      }, 750);
  }, 750);
};

// Trigger phone ringing animation
document.addEventListener('keydown', (event) => {
  if (event.key === 'c') {
    playPhoneRingingAnimation();
  }
});

// Close client ask
document.addEventListener('keydown', (event) => {
  if (event.key === 'v') {
    closeClientAsk();
  }
});
