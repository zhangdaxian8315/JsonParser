function displaySuccess() {
  let resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "Valid JSON";
  resultContainer.classList.remove("error-result");
  resultContainer.classList.add("valid-result");
  resultContainer.classList.remove("hidden");
  resultContainer.style.display = "block";
}

function displayError(error) {
  let resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = '<div class="alert alert-danger" role="alert"><pre>' + error.message + '</pre></div>';
  resultContainer.classList.remove("valid-result");
  resultContainer.classList.add("error-result");
  resultContainer.classList.remove("hidden");
  resultContainer.style.display = "block";
}

//格式化
function customArrayFormatter(arr) {
  return '[' + arr.join(', ') + ']';
}

function formatJsonWithInput(jsonStr) {
  if (jsonStr === '') {
    return '';
  }

  let formattedJsonStr = "";

  try {
    let jsonObj = jsonlint.parse(jsonStr);
    formattedJsonStr = js_beautify(JSON.stringify(jsonObj), {
      indent_size: 1,
      indent_char: "\t",
      eol: "\n",
      unformatted: ["[", "]"],
      content_unformatted: ["[", "]"],
      templates: {
        array_formatter: customArrayFormatter
      }
    });
  } catch (e) {
    throw e;
  }

  return formattedJsonStr;
}

function formatJson() {
  let jsonStr = cm.getValue();
  let formattedJsonStr = "";
  let resultContainer = document.getElementById("result-container");

  try {
    formattedJsonStr = formatJsonWithInput(jsonStr);
    displaySuccess();
  } catch (e) {
    displayError(e);
    return;
  }

  cm.setValue(formattedJsonStr);
}


//反格式化
function unformatJsonWithInput(jsonStr) {
  try {
    let jsonObj = jsonlint.parse(jsonStr);
    return JSON.stringify(jsonObj);
  } catch (e) {
    throw e;
  }
}

function unformatJson() {
  let jsonStr = cm.getValue();

  try {
    let unformattedJsonStr = unformatJsonWithInput(jsonStr);
    cm.setValue(unformattedJsonStr);
  } catch (e) {
    displayError(e);
    return;
  }
}

//转义
function escapeJsonWithInput(jsonStr) {
  let escapedJsonStr = jsonStr.replace(/([\\"])/g, function(match) {
    const escapeChars = {
      '\\': '\\\\',
      '"': '\\"',
    };
    return escapeChars[match];
  });

  return escapedJsonStr;
}

function escapeJson() {
  let jsonStr = cm.getValue();
  let escapedJsonStr = escapeJsonWithInput(jsonStr);
  cm.setValue(escapedJsonStr);
}

//反转义
function unescapeJsonWithInput(jsonStr) {
  return jsonStr.replace(/\\\\|\\"/g, function(match) {
    const unescapeChars = {
      '\\\\': '\\',
      '\\"': '"',
    };
    return unescapeChars[match];
  });
}

function unescapeJson() {
  let jsonStr = cm.getValue();
  let unescapedJsonStr = unescapeJsonWithInput(jsonStr);
  cm.setValue(unescapedJsonStr);
}

//Unicode转中文
function unicodeToChineseWithInput(jsonStr) {
  return jsonStr.replace(/\\u([\d\w]{4})/g, function(match, unicodeChar) {
    return String.fromCharCode(parseInt(unicodeChar, 16));
  });
}

function unicodeToChinese() {
  let jsonStr = cm.getValue();
  let chineseStr = unicodeToChineseWithInput(jsonStr);
  cm.setValue(chineseStr);
}

//中文转Unicode
function chineseToUnicodeWithInput(jsonStr) {
  return jsonStr.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function(match) {
    return "\\u" + match.charCodeAt(0).toString(16);
  });
}

function chineseToUnicode() {
  let jsonStr = cm.getValue();
  let unicodeStr = chineseToUnicodeWithInput(jsonStr);
  cm.setValue(unicodeStr);
}

//清空
function clearJson() {
  cm.setValue("");
  let resultContainer = document.getElementById("result-container");
  resultContainer.classList.remove("shown");
  resultContainer.style.display = "none"; // 添加这一行
}

//复制
function copyJson() {
  const textToCopy = cm.getValue(); // 获取 CodeMirror 编辑器的内容
  const tempInput = document.createElement("textarea");
  
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  tempInput.value = textToCopy;
  
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function goHome() {
  // 检查是否通过文件协议打开
  if (window.location.protocol === "file:") {
    window.location.href = "JSONFormat.html";
  } else {
    window.location.href = "/";
  }
}

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

$(document).ready(function(){
  $('.dropdown').hover(function() {
    $('.dropdown-content').css('display', 'block');
  }, function() {
    $('.dropdown-content').css('display', 'none');
  });
});

