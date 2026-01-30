let bgAudio;
let typingIndex = 0;

$(document).ready(function () {
  setTimeout(() => {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(300).fadeOut("slow");
    $("body").css({ overflow: "visible" });
  }, 600);

  $(window).on("resize", initLayout);
});

/* ================= SET TEXT ================= */
function setText() {
  $("#titleWeb").text(CONFIG.titleWeb);
  $("#title").text(CONFIG.title);
  $("#desc").text(CONFIG.desc);
  $("#yes").text(CONFIG.btnYes);
  $("#no").text(CONFIG.btnNo);
}

/* ================= INIT LAYOUT (QUAN TRỌNG) ================= */
function initLayout() {
  new Audio("sound/nhac.mp3").play();
  const isMobile = window.innerWidth <= 768;
  const yes = $("#yes");
  const no = $("#no");

  if (isMobile) {
    // MOBILE: để CSS xử lý
    yes.css({
      position: "relative",
      left: "",
      top: "",
      transform: ""
    });

    no.css({
      position: "relative",
      left: "",
      top: "",
      transform: ""
    });

    return;
  }

  // ===== DESKTOP =====
  yes.css("position", "absolute");
  no.css("position", "absolute");

  const yesW = yes.outerWidth();
  const noW = no.outerWidth();
  const spacing = 60;

  const totalW = yesW + noW + spacing;
  const startX = (window.innerWidth - totalW) / 2;
  const y = window.innerHeight * 0.55;

  yes.css({
    left: `${startX}px`,
    top: `${y}px`,
    transform: ""
  });

  no.css({
    left: `${startX + yesW + spacing}px`,
    top: `${y}px`,
    transform: ""
  });
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
    allowOutsideClick: false,
  }).then(() => {
    $(".content").fadeIn(200);
    setText();
    initLayout(); // ✅ init đúng thời điểm
  });
}

/* ================= NO CHẠY TRỐN (DESKTOP ONLY) ================= */
function moveNoButton() {
  const no = $("#no");
  const padding = 16;

  const btnW = no.outerWidth();
  const btnH = no.outerHeight();

  const maxX = window.innerWidth - btnW - padding;
  const maxY = window.innerHeight - btnH - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(
    padding + document.querySelector("header").offsetHeight,
    Math.random() * maxY
  );

  no.css({
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: ""
  });

  new Audio("sound/Swish1.mp3").play();
}

$("#no").on("mouseenter click", moveNoButton);

/* ================= AUTO TEXT ================= */
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
    width: window.innerWidth <= 768 ? "90%" : 900,
    html: "<input id='txtReason' class='form-control' placeholder='Whyyy'>",
    background: '#fff url("img/iput-bg.jpg")',
    confirmButtonText: CONFIG.btnReply,
    allowOutsideClick: false,
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
