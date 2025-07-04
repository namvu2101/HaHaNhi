$(document).ready(function () {
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  }, 600);

  $(window).resize(function () {
    init();
  });
});

function init() {
  $("#titleWeb").text(CONFIG.titleWeb);
  $("#title").text(CONFIG.title);
  $("#desc").text(CONFIG.desc);
  $("#yes").text(CONFIG.btnYes);
  $("#no").text(CONFIG.btnNo);

  const isMobile = $(window).width() <= 768;

  if (isMobile) {
    $("#yes").css({ left: "60%", top: "40%" });
    $("#no").css({ left: "10%", top: "30%" });
  } else {
    const yesW = $("#yes").outerWidth();
    const noW = $("#no").outerWidth();
    const spacing = 0.1 * $(window).width();
    const totalW = yesW + spacing + noW;
    const xYes = ($(window).width() - totalW) / 2;
    const xNo = xYes + yesW + spacing;
    const y = 0.5 * $(window).height();
    $("#yes").css({ left: `${xYes}px`, top: `${y}px` });
    $("#no").css({ left: `${xNo}px`, top: `${y}px` });
  }
}

function firstQuestion() {
  $(".content").hide();
  Swal.fire({
    title: CONFIG.introTitle,
    text: CONFIG.introDesc,
    imageUrl: "img/logi.gif",
    imageWidth: 300,
    imageHeight: 300,
    background: '#fff url("img/iput-bg.jpg")',
    imageAlt: "Intro image",
    confirmButtonText: CONFIG.btnIntro,
  }).then(function () {
    // const audio = new Audio("sound/soundBG.mp3");
    // audio.play();
    $(".content").show(200);
    init();
  });
}

function switchButton() {
  const audio = new Audio("sound/duck.mp3");
  audio.play();
  const leftNo = $("#no").css("left");
  const topNo = $("#no").css("top");
  const leftYes = $("#yes").css("left");
  const topYes = $("#yes").css("top");
  $("#no").css({ left: leftYes, top: topYes });
  $("#yes").css({ left: leftNo, top: topNo });
}
function moveButton() {
  const audio = new Audio("sound/Swish1.mp3");
  audio.play();

  const button = $("#no");
  const buttonWidth = button.outerWidth();
  const windowWidth = window.innerWidth;

  const padding = 20;
  const maxX = windowWidth - buttonWidth - padding;
  const maxY = 0.5 * $(window).height();

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  // Cập nhật bằng transform
  button.css({
    transform: `translate(${x}px, ${y}px)`,
    position: "absolute",
  });

  console.log(`Moved to: (${x}px, ${y}px)`);
}

let n = 0;
// $("#no").mousemove(function () {
//   if (Math.random() < 0.5 || n === 1) {
//     switchButton();
//   } else {
//     moveButton();
//   }
//   n++;
// });

// ✅ Click "No" => luôn random vị trí
$("#no").click(function () {
  moveButton();
});

function textGenerate() {
  let n = "";
  const text = " " + CONFIG.reply;
  const a = Array.from(text);
  const textVal = $("#txtReason").val() || "";
  const count = textVal.length;
  if (count > 0) {
    for (let i = 1; i <= count; i++) {
      n += a[i];
      if (i === text.length + 1) {
        $("#txtReason").val("");
        n = "";
        break;
      }
    }
  }
  $("#txtReason").val(n);
  setTimeout(textGenerate, 1);
}

$("#yes").click(function () {
  const audio = new Audio("sound/tick.mp3");
  audio.play();
  Swal.fire({
    title: CONFIG.question,
    width: $(window).width() <= 768 ? "90%" : 900,
    html: "<input type='text' class='form-control' id='txtReason' onmousemove='textGenerate()' placeholder='Whyyy'>",
    background: '#fff url("img/iput-bg.jpg")',
    backdrop: `rgba(0,0,123,0.4) url(\"img/giphy2.gif\") left top no-repeat`,
    confirmButtonColor: "#fe8a71",
    confirmButtonText: CONFIG.btnReply,
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        width: $(window).width() <= 768 ? "90%" : 900,
        title: CONFIG.mess,
        text: CONFIG.messDesc,
        confirmButtonText: CONFIG.btnAccept,
        confirmButtonColor: "#83d0c9",
        background: '#fff url("img/iput-bg.jpg")',
        onClose: () => {
          window.location = CONFIG.messLink;
        },
      });
    }
  });
});
