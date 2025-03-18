const jsonlint = require('jsonlint');
const { js_beautify } = require('js-beautify');

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

function unformatJsonWithInput(jsonStr) {
  try {
    let jsonObj = jsonlint.parse(jsonStr);
    return JSON.stringify(jsonObj);
  } catch (e) {
    throw e;
  }
}

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

function unescapeJsonWithInput(jsonStr) {
  return jsonStr.replace(/\\\\|\\"/g, function(match) {
    const unescapeChars = {
      '\\\\': '\\',
      '\\"': '"',
    };
    return unescapeChars[match];
  });
}

function unicodeToChineseWithInput(jsonStr) {
  return jsonStr.replace(/\\u([\d\w]{4})/g, function(match, unicodeChar) {
    return String.fromCharCode(parseInt(unicodeChar, 16));
  });
}

function chineseToUnicodeWithInput(jsonStr) {
  return jsonStr.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function(match) {
    return "\\u" + match.charCodeAt(0).toString(16);
  });
}

module.exports = {
  formatJsonWithInput,
  unformatJsonWithInput,
  escapeJsonWithInput,
  unescapeJsonWithInput,
  unicodeToChineseWithInput,
  chineseToUnicodeWithInput,
};
