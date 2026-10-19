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

  document.querySelectorAll('input[name=num-columns]').forEach((input) => {
    input.addEventListener("change", (e) => {
      if (input.checked) {
      	const thirdColumn = document.querySelector(".third-column");
        const columns = document.querySelector(".columns");
      	if (input.value === "three") {
       		thirdColumn.style.removeProperty('display');
         	columns.style.gridTemplateColumns = "repeat(3, 1fr)";
       	} else {
        	thirdColumn.style.display = "none";
        	columns.style.gridTemplateColumns = "repeat(2, 1fr)";
        }
      }
    });
  });

  document.querySelectorAll('input[name=border-color]').forEach((input) => {
    input.addEventListener("change", (e) => {
      if (input.checked) {
        document.querySelectorAll(".columns > div").forEach((div) => {
	      	if (input.value === "none") {
	     			div.style.border = input.value;
	       	} else {
	        	div.style.border = `medium solid ${input.value}`;
	        }
        });
      }
    });
  });

  document.querySelectorAll('input[name=content-background]').forEach((input) => {
    input.addEventListener("change", (e) => {
      if (input.checked) {
        const columns = document.querySelector(".columns");
        if (input.value === "dark") {
        	columns.style.backgroundColor = "rgb(24, 26, 27)";
        } else {
        	columns.style.backgroundColor = input.value;
        }
        if (input.value === "dark" || input.value === "black") {
        	document.querySelector(".monitor").style.color = "white";
        } else {
        	document.querySelector(".monitor").style.color = "black";
        }
      }
    });
  });

  document.querySelectorAll('input[name=homepage-background]').forEach((input) => {
    input.addEventListener("change", (e) => {
      if (input.checked) {
        document.querySelector(".monitor").style.background = input.value;
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

    document.querySelectorAll(".initial-text").forEach((placeholder) => {
      placeholder.style.display = "none";
    });
  });
  document.addEventListener("dragend", (e) => {
    document.querySelectorAll(".placeholder").forEach((placeholder) => {
      placeholder.style.display = "none";
    });
  });

  document.querySelectorAll(".select-ashley").forEach(button => button.addEventListener('click', () => {
  	selectClient("ashley");
		ringPhone();
  }));
  document.querySelectorAll(".select-grandma").forEach(button => button.addEventListener('click', () => {
  	selectClient("grandma");
		ringPhone();
  }));
  document.querySelectorAll(".select-kyle").forEach(button => button.addEventListener('click', () => {
  	selectClient("kyle");
	  ringPhone();
  }));
  document.querySelector(".show-client-picker").addEventListener('click', () => {
		showClientPicker();
  });
  document.querySelector(".ring-phone").addEventListener('click', () => {
		ringPhone();
  });

  const acceptRequest = document.querySelector(".client-accept-request");
  acceptRequest.addEventListener('click', () => {
		if (acceptRequest.textContent === "Accept client") {
			createInitialPlaceholders();
			showNotepadContents();
		}
  	closeClientAsk();
  });

  const phone = document.querySelector(".phone");
  phone.addEventListener("click", () => {
    if (dialogState != "ringing") return;
    dialogState = "speaking";
    phone.classList.remove("ringing");
    document.querySelector(".phone-background").classList.remove("ringing");
    ringingNode.stop();
    ringingNode = null;
    showClientAsk();
  });

  loadMusic().then(() => {
    musicLoaded = true;
    if (pageResourcesLoaded) enablePowerButton();
  });
});

window.addEventListener("load", () => {
  pageResourcesLoaded = true;
  if (musicLoaded) enablePowerButton();
});

let pageResourcesLoaded = false;
let musicLoaded = false;
let poweredOn = false;

async function enablePowerButton() {
  document.querySelector(".loading > div").textContent = "Loaded.";
  document.querySelector(".loading > progress").value = 1;

  document.querySelector(".powerbutton").addEventListener("click", () => {
    poweredOn = true;
    startGame();
  });
  while (true) {
    await new Promise(r => setTimeout(r, 800));
    if (poweredOn) break;
    document.querySelector(".powerbutton-neutral").style.display = "none";
    document.querySelector(".powerbutton-off").style.display = "block";
    await new Promise(r => setTimeout(r, 1200));
    if (poweredOn) break;
    document.querySelector(".powerbutton-off").style.display = "none";
    document.querySelector(".powerbutton-neutral").style.display = "block";
  }
}

async function startGame() {
  document.querySelector(".powerbutton-neutral").style.display = "none";
  document.querySelector(".powerbutton-off").style.display = "none";
  document.querySelector(".powerbutton-on").style.display = "block";
  document.querySelector(".monitor").style.visibility = "visible";
  document.querySelector(".loading").style.display = "none";
  playMusic();

  showClientPicker();
}

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

function createContentItem(html) {
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

  return newdiv;
}

function placeholderDrop(event) {
  event.preventDefault();
  const placeholder = event.target.parentElement;
  const html = event.dataTransfer.getData("text/html");
  placeholder.replaceWith(createPlaceholder(), createContentItem(html), createPlaceholder());
}

function deleteItem(item) {
	if (item.nextElementSibling.classList.contains("placeholder")) {
	  item.nextElementSibling.remove();
	}
  item.remove();
}

function createInitialPlaceholders() {
	const initialText = document.createElement("div");
  initialText.classList.add("initial-text");
  initialText.textContent = "(Drag content here to place it!)";
	document.querySelector(".monitor-content").prepend(initialText);
  document.querySelectorAll(".columns > div").forEach((div) => {
    div.append(createPlaceholder());
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
			`Hey Sweetie, could you make sure to add a "Profile Photo" to my Home Page? I used to be quite a looker back in my day, you know. You might not believe it but I was quite rebellious. Some people have even told me that I have mean eyes! That helped me out in a pinch sometimes too.`,
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
let isNewClient = true;
let alwaysIndex = 0;
let selectedClientSometimesDialogs = [];
let sometimesIndex = 0;

const selectClient = clientName => {
	hideClientPicker();

  isNewClient = true;
	selectedClient = clientName;
	selectedClientAlwaysDialogs = getShuffledCopy(dialogTracks[selectedClient]["always"]);
	alwaysIndex = 0;
	selectedClientSometimesDialogs = getShuffledCopy(dialogTracks[selectedClient]["sometimes"]);
	sometimesIndex = 0;
	document.querySelector(".client").style.backgroundColor = dialogTracks[selectedClient]["background-color"];

	document.querySelectorAll(".client-ashley").forEach(elem => {
		if (clientName === "ashley") {
			elem.style.removeProperty('display');
		} else {
			elem.style.display = "none";
		}
	});

	document.querySelectorAll(".client-grandma").forEach(elem => {
		if (clientName === "grandma") {
			elem.style.removeProperty('display');
		} else {
			elem.style.display = "none";
		}
	});

	document.querySelectorAll(".client-kyle").forEach(elem => {
		if (clientName === "kyle") {
			elem.style.removeProperty('display');
		} else {
			elem.style.display = "none";
		}
	});
};

let dialogState = "none";

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

const showClientAsk = () => {
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
  dialogState = "none";
};

const ringPhone = () => {
  if (dialogState != "none") return;
  dialogState = "ringing";
  document.querySelector(".phone").classList.add("ringing");
  document.querySelector(".phone-background").classList.add("ringing");
  playRinging();
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'c') {
    ringPhone();
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

const offlineContext = new OfflineAudioContext(2, 1, 44100);
let audioContext = null;

let musicBuf = null;
let musicGainNode = null;
let musicNode = null;
let ringingBuf = null;
let ringingGainNode = null;
let ringingNode = null;

async function load(path) {
  const response = await fetch(path);
  const buffer = await response.arrayBuffer();
  return await offlineContext.decodeAudioData(buffer);
}

async function loadMusic() {
  musicBuf = await load("/audio/music.mp3");
  ringingBuf = await load("/audio/ring.mp3");
}

async function playMusic() {
  if (musicNode !== null) return;
  audioContext = new AudioContext();
  musicGainNode = audioContext.createGain();
  musicGainNode.gain.value = 0.5;
  musicGainNode.connect(audioContext.destination);
  musicNode = new AudioBufferSourceNode(audioContext, {
    buffer: musicBuf,
    loop: true,
    loopStart: 0,
    loopEnd: musicBuf.duration,
  });
  musicNode.connect(musicGainNode);
  musicNode.start();
}

function playRinging() {
  if (ringingNode !== null) {
    ringingNode.start();
    return;
  }
  audioContext = new AudioContext();
  ringingGainNode = audioContext.createGain();
  ringingGainNode.gain.value = 0.8;
  ringingGainNode.connect(audioContext.destination);
  ringingNode = new AudioBufferSourceNode(audioContext, {
    buffer: ringingBuf,
    loop: true,
    loopStart: 0,
    loopEnd: ringingBuf.duration,
  });
  ringingNode.connect(ringingGainNode);
  ringingNode.start();
}

const showClientPicker = () => {
  const client = document.querySelector(".client-picker-box");
  client.style.visibility = "visible";
}

const hideClientPicker = () => {
  const client = document.querySelector(".client-picker-box");
  client.style.visibility = "hidden";
}

const showNotepadContents = () => {
  const client = document.querySelector(".notepad");
  client.style.visibility = "visible";
}
