// Populate the year, month, and day select elements
for (var i = 1900; i <= 2099; i++) {
  var option = document.createElement('option');
  option.text = option.value = i;
  document.getElementById('year1').add(option);
  document.getElementById('year2').add(option.cloneNode(true));
  document.getElementById('year3').add(option.cloneNode(true));
}

for (var i = 1; i <= 12; i++) {
  var option = document.createElement('option');
  option.text = option.value = i;
  document.getElementById('month1').add(option);
  document.getElementById('month2').add(option.cloneNode(true));
  document.getElementById('month3').add(option.cloneNode(true));
}

function updateDays(yearSelectId, monthSelectId, daySelectId) {
  var yearSelect = document.getElementById(yearSelectId);
  var monthSelect = document.getElementById(monthSelectId);
  var daySelect = document.getElementById(daySelectId);

  var year = yearSelect.value;
  var month = monthSelect.value;
  var day = daySelect.value;

  // 获取该月份的天数
  var daysInMonth = new Date(year, month, 0).getDate();

  // 清空日期选择框
  daySelect.innerHTML = '';

  // 添加新的选项
  for (var i = 1; i <= daysInMonth; i++) {
    var option = document.createElement('option');
    option.text = option.value = i;
    daySelect.add(option);
  }
  var today = new Date();
  var day = today.getDate();
  document.getElementById(daySelectId).value = day;
}

// 在用户选择年份或月份后，更新日期选择框
document.getElementById('year1').addEventListener('change', function() {
  updateDays('year1', 'month1', 'day1');
});
document.getElementById('month1').addEventListener('change', function() {
  updateDays('year1', 'month1', 'day1');
});

// 对于第二组日期选择框，也做同样的处理
document.getElementById('year2').addEventListener('change', function() {
  updateDays('year2', 'month2', 'day2');
});
document.getElementById('month2').addEventListener('change', function() {
  updateDays('year2', 'month2', 'day2');
});

// 对于第三组日期选择框，也做同样的处理
document.getElementById('year3').addEventListener('change', function() {
  updateDays('year3', 'month3', 'day3');
});
document.getElementById('month3').addEventListener('change', function() {
  updateDays('year3', 'month3', 'day3');
});

var weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
function calculateDate() {
  var year1 = document.getElementById('year1').value;
  var month1 = document.getElementById('month1').value;
  var day1 = document.getElementById('day1').value;
  var date1 = new Date(year1, month1 - 1, day1);
  var days = parseInt(document.getElementById('days').value);
  if (isNaN(days)) {
    var inputWarning = document.getElementById("input-warning");
    inputWarning.classList.remove("hidden");
    inputWarning.classList.add("show");
    setTimeout(function () {
      inputWarning.classList.remove("show");
      inputWarning.classList.add("hidden");
    }, 2500);
    return;
  }
  date1.setDate(date1.getDate() + days);

  var dayOfWeek = date1.getDay(); // 获取星期几
  document.getElementById('result1').style.display = "block";
  document.getElementById('result1').innerText = '结果日期: ' + date1.toISOString().split('T')[0] + '  ' + weekDays[dayOfWeek];
}

function calculateDiff() {
  var year2 = document.getElementById('year2').value;
  var month2 = document.getElementById('month2').value;
  var day2 = document.getElementById('day2').value;
  var date2 = new Date(year2, month2 - 1, day2);

  var year3 = document.getElementById('year3').value;
  var month3 = document.getElementById('month3').value;
  var day3 = document.getElementById('day3').value;
  var date3 = new Date(year3, month3 - 1, day3);

  var diff = date3.getTime() - date2.getTime();
  var diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  document.getElementById('result2').style.display = "block";
  document.getElementById('result2').innerText = '相差天数: ' + diffDays;
}

document.addEventListener("DOMContentLoaded", function() {
  // 获取今天的日期
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // JavaScript 的月份是从 0 开始的，所以需要 +1
  var day = today.getDate();

  // 设置默认值
  document.getElementById('year1').value = year;
  document.getElementById('month1').value = month;
  document.getElementById('day1').value = day;

  document.getElementById('year2').value = year;
  document.getElementById('month2').value = month;
  document.getElementById('day2').value = day;

  document.getElementById('year3').value = year;
  document.getElementById('month3').value = month;
  document.getElementById('day3').value = day;

  // 更新日期选择框的天数
  updateDays('year1', 'month1', 'day1');
  updateDays('year2', 'month2', 'day2');
  updateDays('year3', 'month3', 'day3');

  document.getElementById('result1').style.textAlign = "center";
  document.getElementById('result1').style.paddingTop = "10px";
  document.getElementById('result1').style.paddingBottom = "10px";
  document.getElementById('result1').style.color = "#ff7676";
  document.getElementById('result1').style.fontWeight = "700";
  document.getElementById('result1').style.display = "none";

  document.getElementById('result2').style.textAlign = "center";
  document.getElementById('result2').style.paddingTop = "10px";
  document.getElementById('result2').style.paddingBottom = "10px";
  document.getElementById('result2').style.color = "#ff7676";
  document.getElementById('result2').style.fontWeight = "700";
  document.getElementById('result2').style.display = "none";
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