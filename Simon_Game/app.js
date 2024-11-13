let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let bgMusic = document.getElementById("bgMusic"); // Get the audio element

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelUp();
        bgMusic.play(); // Start the background music when the game starts
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}.</b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        bgMusic.pause(); // Stop the music when the game ends
        bgMusic.currentTime = 0; // Reset the music to the start
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}
