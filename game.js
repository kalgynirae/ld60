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

  selectClient("ashley");

  document.querySelector(".select-ashley").addEventListener('click', () => {
	  selectClient("ashley");
		playPhoneRingingAnimation(true);
  });
  document.querySelector(".select-grandma").addEventListener('click', () => {
	  selectClient("grandma");
		playPhoneRingingAnimation(true);
  });
  document.querySelector(".select-kyle").addEventListener('click', () => {
  	selectClient("kyle");
	  playPhoneRingingAnimation(true);
  });
  document.querySelector(".ring-phone").addEventListener('click', () => {
		playPhoneRingingAnimation(false);
  });

  document.querySelector(".client-accept-request").addEventListener('click', () => {
  	closeClientAsk();
  });
});

function createPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");
  placeholder.style.display = "none";
  placeholder.innerHTML = "<div>[insert here]</div>";
  placeholder.addEventListener("dragover", (e) => e.preventDefault());
  placeholder.addEventListener("dragenter", () => placeholder.classList.add("hover"));
  placeholder.addEventListener("dragleave", () => placeholder.classList.remove("hover"));
  placeholder.addEventListener("drop", placeholderDrop);
  return placeholder;
}

function placeholderDrop(event) {
  event.preventDefault();
  const placeholder = event.target.parentElement;
  const html = event.dataTransfer.getData("text/html");
  const newdiv = document.createElement("div");
  newdiv.classList.add("content-item");
  newdiv.innerHTML = html;

  const controls = document.createElement("div");
  controls.classList.add("controls");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", () => deleteItem(newdiv));
  controls.append(deleteButton);
  newdiv.prepend(controls);

  placeholder.replaceWith(createPlaceholder(), newdiv, createPlaceholder());
}

function deleteItem(item) {
  item.nextElementSibling.remove();
  item.remove();
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
  	"intro": "helloooooo can you make me a mykoolhomepage pretty please??? all the cool kids in school have one and i need u 2 help me cuz u can get past the age verificajun thingy. ill be sooooo gratefull for the rest of my life!!! xoxo",
    "always": [
      "do you know the STAR * BOYZ?? ofcourse you do everyone does their the best!!! can you add a bunch of stuff for them?? i L.O.V.E. kyle soooo much!!! he doesn't know it yet but he's my husband!!!",
      "hiii so i was thinking that i should talk more about the love of my life oreo!!! he's my precious baby and i've had him since i was 7 and he's the bestest. please add my furbaby to my homepage thxx <3",
      "could you pick a kool and pretty and cute and awesome photo of me to use as a profile photo? like if kyle came across my homepage ,,,,,maybe he'd fall in love with me??? i read in a mag that his type is shorter than him and has nice eyes and a cool vibe and liek that totally describes me???",
    ],
    "sometimes": [
      "i saw that everyone has a best friends section so i wuz thinking that i should have one too and i'd like to put my bestie jessica at the top because i luvluvluv that girl to death!!!",
    ],
    "background-color": "rgba(48, 127, 253, 0.95)",
  },
  "grandma": {
  	"intro": 'Hello Dearie, my name is Meredith P., but you can just call me Grandma. I was hoping you could help me set up a "Kool" Home Page so I can connect more with my granddaughter Kayla. I will thank you with lots of Kisses and Cookies through the E-Mail :-)',
  	"always": [
	   	"Hey Pumpkin, I don't know what is hip with the children these days but could you add a little more Sparkle and Pizzazz to my profile? Appreciate you lots, dear!",
			`Hey Sweetie, could you make sure to add a "Profile Photo" to my Home Page? I used to be quite a looker back in my day, you know. I'm sure you can imagine that I would turn heads on the streets, probably because I'm tall too.`,
			"Hello Sweetheart, could you add my granddaughter Kayla to my Home Page? She knows everything about this Web-Site and I am getting a bit Old for the Tech these days. I'm just so proud of her. That honey bunches of oats is the joy of my life!",
	   ],
   	"sometimes": [
    	"Hello Sweet Pea, I was thinking of you today when I was crocheting. I used to grow sweet peas in my garden, but these days it's been getting harder to tend to my flowers due to my arthritis. I think it'll get better with my new joint medication though. I'm looking forward to getting to go outside and play with Kayla more.",
      "Hey Hon, I heard a song yesterday on the radio that made me so nostalgic. I don't remember the name but I'm sure you can find it using the Inter-Net. Could you add it to my Home Page please? Thank you bunches!",
    ],
    "background-color": "rgba(255, 133, 163, 0.95)",
  },
  "kyle": {
  	"intro": "hey my guy my names kyle can you make a homepage for me? i have plenty of money dont worry about that but keep it on the downlow okay?",
  	"always": [
	   	[
	    	"sup so my manager just called. he says I should make a mykoolhomepage to help promote the STAR * BOYZ upcoming album. ugh. im hiring you to do it cuz i cant be arsed",
	     	"sup im kyle. you might have heard of me…. im in the STAR * BOYZ……. i want to make a profile that can't be traced back to me. MAKE SURE THERE IS NOTHING ON THERE ABOUT THE STAR * BOYZ. im sick of us",
	    ],
			"could u add a profile photo of me? u know what i look like, right? no? well im kind of a dark and brooding type. super tall. SUPER buff,,,, yeah",
	   ],
   	"sometimes": [
    	"hey i saw you put some kind of colorful stuff on there. that's okay i guess but could you add some more stuff thats black? black is the color of my soul",
     	"hey i just got home from a press trip to the usa. i don't want anyone to think im from that country can u add some british stuff to my profile???",
    ],
    "background-color": "rgba(40, 40, 43, 0.95)",
  },
};
let selectedClient = "";
let selectedClientAlwaysDialogs = [];
let alwaysIndex = 0;
let selectedClientSometimesDialogs = [];
let sometimesIndex = 0;

const selectClient = clientName => {
	selectedClient = clientName;
	selectedClientAlwaysDialogs = getShuffledCopy(dialogTracks[selectedClient]["always"]);
	alwaysIndex = 0;
	selectedClientSometimesDialogs = getShuffledCopy(dialogTracks[selectedClient]["sometimes"]);
	sometimesIndex = 0;
	document.querySelector(".client").style.backgroundColor = dialogTracks[selectedClient]["background-color"];
};

let isInDialogState = false;

const getClientText = () => {
	if (sometimesIndex < selectedClientSometimesDialogs.length && Math.random() < selectedClientSometimesDialogs.length / (selectedClientSometimesDialogs.length + selectedClientAlwaysDialogs.length * 2)) {
		const dialog = selectedClientSometimesDialogs[sometimesIndex++];
		if (Array.isArray(dialog)) {
			return dialog[Math.floor(Math.random() * dialog.length)];
		}
		return dialog;
	}
	if (alwaysIndex < selectedClientAlwaysDialogs.length) {
    const dialog = selectedClientAlwaysDialogs[alwaysIndex++];
    if (Array.isArray(dialog)) {
			return dialog[Math.floor(Math.random() * dialog.length)];
		}
		return dialog;
	}
  return "i'm out of ideas. do whatever else you'd like...!";
};

const showClientAsk = isNewClient => {
  const client = document.querySelector(".client");
  client.style.visibility = "visible";

  let text = "uh oh if you see this, that's a bug!"
  if (isNewClient) {
		text = dialogTracks[selectedClient]["intro"];
	} else {
		text = getClientText();
	}

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
		if (isNewClient) {
			acceptRequest.textContent = "Accept client"
		} else {
			acceptRequest.textContent = "Okay.";
		}
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

const playPhoneRingingAnimation = isNewClient => {
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
                  showClientAsk(isNewClient);
              }, 750);
          }, 750);
      }, 750);
  }, 750);
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'c') {
    playPhoneRingingAnimation(false);
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
