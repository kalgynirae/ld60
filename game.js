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

  document.querySelectorAll(".placeable").forEach((placeable) => {
    placeable.draggable = true;
  });
  document.querySelectorAll(".placeable img").forEach((placeable) => {
    placeable.draggable = false;
  });
  document.addEventListener("dragstart", (e) => {
    if (!e.target.classList.contains("placeable")) return;
    document.querySelectorAll(".placeholder").forEach((placeholder) => {
      placeholder.style.display = "block";
      e.dataTransfer.setData("text/html", e.target.querySelector(".contents").innerHTML);
    });
  });
  document.addEventListener("dragend", (e) => {
    document.querySelectorAll(".placeholder").forEach((placeholder) => {
      placeholder.style.display = "none";
    });
  });

  createInitialPlaceholders();

  document.querySelector(".client-accept-request").addEventListener('click', () => {
  	closeClientAsk();
  });
});

function createPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");
  placeholder.style.display = "none";
  placeholder.textContent = "[drop here]";
  placeholder.addEventListener("dragover", (e) => e.preventDefault());
  placeholder.addEventListener("drop", placeholderDrop);
  return placeholder;
}

function placeholderDrop(event) {
  event.preventDefault();
  const placeholder = event.target;
  const html = event.dataTransfer.getData("text/html");
  const newdiv = document.createElement("div");
  newdiv.classList.add("b");
  newdiv.innerHTML = html;
  placeholder.replaceWith(createPlaceholder(), newdiv, createPlaceholder());
}

function createInitialPlaceholders() {
  document.querySelectorAll(".columns > div").forEach((div) => {
    div.prepend(createPlaceholder());
    Array.from(div.children).forEach((e) => {
      if (!e.classList.contains("placeholder")) {
        e.after(createPlaceholder());
      }
    });
  });
}

const dialogTracks = {
  "ashley": {
    "always": [
      "do you know the STAR * BOYZ?? ofcourse you do everyone does their the best!!! can you add a bunch of stuff for them?? i L.O.V.E. kyle soooo much!!! he doesn't know it yet but he's my husband!!!",
      "hiii so i was thinking that i should talk more about the love of my life oreo!!! he's my precious baby and i've had him since i was 7 and he's the bestest. please add my furbaby to my homepage thxx <3",
      "could you pick a kool and pretty and cute and awesome photo of me to use as a profile photo? like if kyle came across my homepage ,,,,,maybe he'd fall in love with me??? i read in a mag that his type is shorter than him and has nice eyes and a cool vibe and liek that totally describes me???",
    ],
    "sometimes": [
      "i saw that everyone has a best friends section so i wuz thinking that i should have one too and i'd like to put my bestie jessica at the top because i luvluvluv that girl to death!!!",
    ],
  },
};
let selectedClient = "ashley";
let selectedClientAlwaysDialogs = getShuffledCopy(dialogTracks[selectedClient]["always"]);
let alwaysIndex = 0;
let selectedClientSometimesDialogs = getShuffledCopy(dialogTracks[selectedClient]["sometimes"]);
let sometimesIndex = 0;

let isInDialogState = false;

const getClientText = () => {
	if (sometimesIndex < selectedClientSometimesDialogs.length && Math.random() < selectedClientSometimesDialogs.length / (selectedClientSometimesDialogs.length + selectedClientAlwaysDialogs.length * 2)) {
		return selectedClientSometimesDialogs[sometimesIndex++];
	}
	if (alwaysIndex < selectedClientAlwaysDialogs.length) {
    return selectedClientAlwaysDialogs[alwaysIndex++];
	}
  return "i'm out of ideas. do whatever else you'd like...!";
};

const showClientAsk = () => {
  const client = document.querySelector(".client");
  client.style.visibility = "visible";

  const text = getClientText();

  const clientName = document.querySelector(".client-name");
  clientName.innerHTML = selectedClient.charAt(0).toUpperCase() + selectedClient.slice(1);

  const clientTextbox = document.querySelector(".client-textbox");
  clientTextbox.innerHTML = '';

  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.classList.add('client-text')
    span.textContent = char;
    span.style.transitionDelay = `${index * 25}ms`;
    clientTextbox.appendChild(span);

    setTimeout(() => {
      span.style.opacity = '1';
    }, 50);
  });

  setTimeout(() => {
	  const acceptRequest = document.querySelector(".client-accept-request");
	  acceptRequest.classList.add("show");
  }, text.length * 25 + 500);
};

const closeClientAsk = () => {
  const client = document.querySelector(".client");
  client.style.visibility = "hidden";
  const acceptRequest = document.querySelector(".client-accept-request");
  acceptRequest.classList.remove("show");
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'c') {
    playPhoneRingingAnimation();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'v') {
    closeClientAsk();
  }
});

function getShuffledCopy(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
