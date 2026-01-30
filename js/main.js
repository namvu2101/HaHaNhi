$(document).ready(function () {
  setTimeout(() => {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(300).fadeOut("slow");
    $("body").css({ overflow: "visible" });
  }, 600);

  $(window).on("resize", layoutButtons);
});

/* ================= SET TEXT ================= */
function setText() {
  $("#titleWeb").text(CONFIG.titleWeb);
  $("#title").text(CONFIG.title);
  $("#desc").text(CONFIG.desc);
  $("#yes").text(CONFIG.btnYes);
  $("#no").text(CONFIG.btnNo);
}

/* ================= LAYOUT ================= */
function layoutButtons() {
  const isMobile = $(window).width() <= 768;

  if (isMobile) return; // mobile để CSS lo

  const yes = $("#yes");
  const no = $("#no");

  const yesW = yes.outerWidth();
  const noW = no.outerWidth();
  const spacing = 40;

  const totalW = yesW + noW + spacing;
  const xStart = ($(window).width() - totalW) / 2;
  const y = $(window).height() * 0.55;

  yes.css({ left: xStart, top: y });
  no.css({ left: xStart + yesW + spacing, top: y });
}

/* ================= INTRO ================= */
function firstQuestion() {
  $(".content").hide();
  Swal.fire({
    title: CONFIG.introTitle,
    text: CONFIG.introDesc,
    imageUrl: "img/logi.gif",
    imageWidth: 300,
    imageHeight: 300,
    background: '#fff url("img/iput-bg.jpg")',
    confirmButtonText: CONFIG.btnIntro,
  }).then(() => {
      // ✅ PLAY NHẠC SAU KHI CLICK INTRO
    bgAudio = new Audio("sound/soundBG.mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.6;
    bgAudio.play().catch(() => {});
    $(".content").fadeIn(200);
    setText();
    layoutButtons();
  });
}

/* ================= NO RUN ================= */
function moveNoButton() {
  const audio = new Audio("sound/Swish1.mp3");
  audio.play();

  const no = $("#no");
  const padding = 20;

  const maxX = $(window).width() - no.outerWidth() - padding;
  const maxY = $(window).height() * 0.6;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  no.css({ left: x, top: y });
}

$("#no").on("mouseenter click", moveNoButton);

/* ================= AUTO TEXT ================= */
let typingIndex = 0;
function textGenerate() {
  const reply = CONFIG.reply;
  const input = $("#txtReason");
  input.val(reply.slice(0, typingIndex++));
  if (typingIndex <= reply.length) {
    setTimeout(textGenerate, 40);
  }
}

/* ================= YES ================= */
$("#yes").click(function () {
  new Audio("sound/tick.mp3").play();

  Swal.fire({
    title: CONFIG.question,
    width: $(window).width() <= 768 ? "90%" : 900,
    html: "<input id='txtReason' class='form-control' placeholder='Whyyy'>",
    background: '#fff url("img/iput-bg.jpg")',
    confirmButtonText: CONFIG.btnReply,
    didOpen: () => {
      typingIndex = 0;
      textGenerate();
    },
  }).then(() => {
    Swal.fire({
      title: CONFIG.mess,
      text: CONFIG.messDesc,
      confirmButtonText: CONFIG.btnAccept,
      background: '#fff url("img/iput-bg.jpg")',
      willClose: () => {
        window.location.href = CONFIG.messLink;
      },
    });
  });
});
