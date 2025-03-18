document.getElementById("submit-feedback").addEventListener("click", function () {
  var feedbackText = document.getElementById("feedback-text").value;
  var inputWarning = document.getElementById("input-warning");
  
  if (feedbackText.length < 10) {
    inputWarning.classList.remove("hidden");
    inputWarning.classList.add("show");
    setTimeout(function () {
      inputWarning.classList.remove("show");
      inputWarning.classList.add("hidden");
    }, 2500);
    return;
  }
  
  if (feedbackText) {
    if (_hmt) {
      _hmt.push(['_trackEvent', 'feedback', 'submit', feedbackText]);
    }
    if (gtag) {
      gtag('event', 'submit', {'event_category': 'feedback', 'event_label': feedbackText});
    }
  }
  
  console.log("用户提交的意见反馈：", feedbackText);

  // 隐藏其他元素
  document.getElementById("feedback-content").classList.add("hidden");
  
  // 显示感谢信息
  var thanksMessage = document.getElementById("thanks-message");
  thanksMessage.classList.remove("hidden");

  // 1秒后跳转回主页
  setTimeout(function () {
    // 检查是否通过文件协议打开
    if (window.location.protocol === "file:") {
      window.location.href = "JSONFormat.html";
    } else {
      window.location.href = "/";
    }
  }, 2500);
});

function goHome() {
  // 检查是否通过文件协议打开
  if (window.location.protocol === "file:") {
    window.location.href = "JSONFormat.html";
  } else {
    window.location.href = "/";
  }
}

document.getElementById("feedback-text").addEventListener("input", function () {
  var charCount = this.value.length;
  document.getElementById("char-counter").textContent = charCount + " / 200";
});

function goJsonFormatter() {
  // 检查是否通过文件协议打开
  if (window.location.protocol === "file:") {
    window.location.href = "JSONFormat.html";
  } else {
    window.location.href = "/JsonFormatter.html";
  }
}

function goDateCalculator() {
  // 检查是否通过文件协议打开
  if (window.location.protocol === "file:") {
    window.location.href = "date-calculator.html";
  } else {
    window.location.href = "/date-calculator.html";
  }
}