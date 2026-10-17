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

document.addEventListener('keydown', (event) => {
  if (event.key === 'c') {
    const phone = document.querySelector(".phone");
    phone.style.visibility = "visible";

    setTimeout(() => {
        phone.style.visibility = "hidden";

        setTimeout(() => {
            phone.style.visibility = "visible";

            setTimeout(() => {
                phone.style.visibility = "hidden";

                setTimeout(() => {
                    const client = document.querySelector(".client");
                    client.style.visibility = "visible";
                }, 750);
            }, 750);
        }, 750);
    }, 750);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'v') {
    const client = document.querySelector(".client");
    client.style.visibility = "hidden";
  }
});
