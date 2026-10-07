/* ==========================================
   YOUR SECRET PIN
========================================== */

const CORRECT_PIN = "020602";


/* ==========================================
   YOUR LOVE LETTER
========================================== */

const LOVE_LETTER = `
Bammmyyyy,

If you're reading this, then you made it into our little world. ♡

I wanted to make something special for you — something that reminds you how much you mean to me.

You have brought so much warmth, happiness, and color into my life. Somehow, even ordinary moments become special when I'm with you.

I love your smile. I love your laugh. I love the little things you do that you probably don't even realize I notice.

Most of all, I love the way being with you feels like home.

I don't know what every chapter of our story will look like, but I know one thing:

I want to keep writing it with you.

Thank you for being you.

I love you. 🌻
`;


/* ==========================================
   ELEMENTS
========================================== */

const lockScreen =
  document.getElementById("lockScreen");

const mainContent =
  document.getElementById("mainContent");

const pinInput =
  document.getElementById("pinInput");

const unlockBtn =
  document.getElementById("unlockBtn");

const errorMessage =
  document.getElementById("errorMessage");

const pinDots =
  document.querySelectorAll(
    "#pinDots span"
  );

const typedLetter =
  document.getElementById("typedLetter");

const photoInput =
  document.getElementById("photoInput");

const gallery =
  document.getElementById("gallery");

const surpriseButton =
  document.getElementById("surpriseButton");

const finalMessage =
  document.getElementById("finalMessage");

const musicButton =
  document.getElementById("musicButton");

const musicIcon =
  document.getElementById("musicIcon");

const musicText =
  document.getElementById("musicText");

const backgroundMusic =
  document.getElementById(
    "backgroundMusic"
  );

const particles =
  document.getElementById(
    "particles"
  );


/* ==========================================
   PIN DOTS
========================================== */

pinInput.addEventListener(
  "input",
  function () {

    const length =
      pinInput.value.length;

    pinDots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index < length
        );

      }
    );

  }
);


/* ==========================================
   UNLOCK
========================================== */

function unlockWebsite() {

  const enteredPin =
    pinInput.value;

  if (enteredPin === CORRECT_PIN) {

    errorMessage.textContent = "";

    lockScreen.classList.add(
      "hidden"
    );

    setTimeout(
      () => {

        mainContent.classList.add(
          "show"
        );

        startParticles();

        typeLetter();

      },
      500
    );

  } else {

    errorMessage.textContent =
      "That's not our secret code... try again ♡";

    pinInput.value = "";

    pinDots.forEach(
      dot =>
        dot.classList.remove(
          "active"
        )
    );

    pinInput.animate(
      [
        {
          transform:
            "translateX(0)"
        },
        {
          transform:
            "translateX(-10px)"
        },
        {
          transform:
            "translateX(10px)"
        },
        {
          transform:
            "translateX(-6px)"
        },
        {
          transform:
            "translateX(0)"
        }
      ],
      {
        duration: 350
      }
    );

  }

}

unlockBtn.addEventListener(
  "click",
  unlockWebsite
);

pinInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      unlockWebsite();

    }

  }
);


/* ==========================================
   TYPING LOVE LETTER
========================================== */

let letterIndex = 0;

let letterStarted = false;

function typeLetter() {

  if (letterStarted) return;

  letterStarted = true;

  typedLetter.innerHTML = "";

  const typingSpeed = 18;

  function typeNextCharacter() {

    if (
      letterIndex <
      LOVE_LETTER.length
    ) {

      const character =
        LOVE_LETTER.charAt(
          letterIndex
        );

      if (character === "\n") {

        typedLetter.innerHTML +=
          "<br>";

      } else {

        typedLetter.innerHTML +=
          character;

      }

      letterIndex++;

      setTimeout(
        typeNextCharacter,
        typingSpeed
      );

    }

  }

  typeNextCharacter();

}


/* ==========================================
   PHOTO GALLERY
========================================== */

photoInput.addEventListener(
  "change",
  event => {

    const files =
      Array.from(
        event.target.files
      );

    const emptyGallery =
      document.querySelector(
        ".empty-gallery"
      );

    if (emptyGallery) {
      emptyGallery.remove();
    }

    files.forEach(
      (file, index) => {

        if (
          !file.type.startsWith(
            "image/"
          )
        ) {
          return;
        }

        const reader =
          new FileReader();

        reader.onload =
          event => {

            createPolaroid(
              event.target.result
            );

          };

        reader.readAsDataURL(
          file
        );

      }
    );

    photoInput.value = "";

  }
);


/* ==========================================
   CREATE POLAROID
========================================== */

function createPolaroid(
  imageSource
) {

  const polaroid =
    document.createElement(
      "div"
    );

  polaroid.className =
    "polaroid";

  const rotations = [
    "-3deg",
    "2deg",
    "-2deg",
    "3deg",
    "-1deg"
  ];

  const randomRotation =
    rotations[
      Math.floor(
        Math.random() *
        rotations.length
      )
    ];

  polaroid.style.setProperty(
    "--rotation",
    randomRotation
  );

  const image =
    document.createElement(
      "img"
    );

  image.src =
    imageSource;

  image.alt =
    "Our memory";

  const caption =
    document.createElement(
      "div"
    );

  caption.className =
    "polaroid-caption";

  caption.textContent =
    "A moment I'll always keep ♡";

  const removeButton =
    document.createElement(
      "button"
    );

  removeButton.className =
    "remove-photo";

  removeButton.textContent =
    "×";

  removeButton.title =
    "Remove photo";

  removeButton.addEventListener(
    "click",
    () => {

      polaroid.remove();

      if (
        gallery.children.length === 0
      ) {

        showEmptyGallery();

      }

    }
  );

  polaroid.appendChild(
    image
  );

  polaroid.appendChild(
    caption
  );

  polaroid.appendChild(
    removeButton
  );

  gallery.appendChild(
    polaroid
  );

}


/* ==========================================
   EMPTY GALLERY
========================================== */

function showEmptyGallery() {

  gallery.innerHTML = `
    <div class="empty-gallery">

      <div>📷</div>

      <h3>
        Our memories belong here
      </h3>

      <p>
        Add your favorite photos below.
      </p>

    </div>
  `;

}


/* ==========================================
   FINAL SURPRISE
========================================== */

surpriseButton.addEventListener(
  "click",
  () => {

    finalMessage.style.display =
      "block";

    surpriseButton.style.display =
      "none";

    createHeartBurst();

    finalMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
);


/* ==========================================
   FLOATING PARTICLES
========================================== */

function createParticle() {

  const particle =
    document.createElement(
      "div"
    );

  particle.className =
    "particle";

  const symbols = [
    "✦",
    "✧",
    "♡",
    "♥",
    "✿",
    "·"
  ];

  particle.textContent =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];

  particle.style.left =
    Math.random() * 100 + "vw";

  particle.style.fontSize =
    (
      10 +
      Math.random() * 20
    ) + "px";

  particle.style.animationDuration =
    (
      5 +
      Math.random() * 7
    ) + "s";

  particles.appendChild(
    particle
  );

  setTimeout(
    () => {
      particle.remove();
    },
    12000
  );

}


function startParticles() {

  setInterval(
    createParticle,
    700
  );

}


/* ==========================================
   HEART BURST
========================================== */

function createHeartBurst() {

  for (
    let i = 0;
    i < 35;
    i++
  ) {

    setTimeout(
      () => {

        createParticle();

      },
      i * 60
    );

  }

}


/* ==========================================
   MUSIC
========================================== */

let musicPlaying = false;

musicButton.addEventListener(
  "click",
  async () => {

    if (!musicPlaying) {

      try {

        await backgroundMusic.play();

        musicPlaying = true;

        musicButton.classList.add(
          "playing"
        );

        musicIcon.textContent =
          "❚❚";

        musicText.textContent =
          "Playing";

      } catch (error) {

        musicText.textContent =
          "Add music.mp3";

      }

    } else {

      backgroundMusic.pause();

      musicPlaying = false;

      musicButton.classList.remove(
        "playing"
      );

      musicIcon.textContent =
        "♫";

      musicText.textContent =
        "Music";

    }

  }
);


/* ==========================================
   START WITH FOCUS ON PIN
========================================== */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {
        pinInput.focus();
      },
      500
    );

  }
);
