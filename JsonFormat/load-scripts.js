let cm; // Declare cm as a global variable

function initCodeMirrorBasic() {
  const jsonInput = document.getElementById("json-input");
  const codeMirrorWrapper = document.createElement("div");
  jsonInput.replaceWith(codeMirrorWrapper);

  cm = CodeMirror(codeMirrorWrapper, {
    value: "",
    mode: "application/json",
    lineNumbers: true,
    theme: "default",
    indentUnit: 2,
    lineWrapping: false,
  });

  return cm;
}

function initCodeMirrorFold(cm) {
  cm.setOption("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  cm.setOption("foldGutter", true);
  cm.setOption("extraKeys", {
    "Ctrl-Q": function (cm) {
      cm.foldCode(cm.getCursor());
    },
  });
}

async function loadScript(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      console.log(`Script loaded: ${url}`);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);

    // 设置超时
    setTimeout(() => {
      reject(new Error(`Script loading timed out after ${timeout} ms: ${url}`));
    }, timeout);
  });
}

function loadStylesheet(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => {
      console.log(`Stylesheet loaded: ${url}`);
      resolve();
    };
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`));
    document.head.appendChild(link);

    // 设置超时
    setTimeout(() => {
      reject(new Error(`Stylesheet loading timed out after ${timeout} ms: ${url}`));
    }, timeout);
  });
}

async function loadResources(resources) {
  const loadPromises = resources.map(async (resource) => {
    try {
      if (resource.type === 'script') {
        await loadScript(resource.src);
      } else if (resource.type === 'stylesheet') {
        await loadStylesheet(resource.src);
      }
    } catch (error) {
      console.error(`Failed to load resource ${resource.src}: ${error.message}`);
      console.log(`Trying to load backup resource: ${resource.backupSrc}`);
      if (resource.type === 'script') {
        await loadScript(resource.backupSrc);
      } else if (resource.type === 'stylesheet') {
        await loadStylesheet(resource.backupSrc);
      }
    }
  });

  await Promise.all(loadPromises);
}

async function loadFunctionalScriptsFold() {
  const resources = [
    {
      src: "third-party-libs/codemirror.min.css",
      backupSrc: "third-party-libs/codemirror.min.css",
      type: "stylesheet",
    },
    {
      src: "third-party-libs/codemirror.min.js",
      backupSrc: "third-party-libs/codemirror.min.js",
      type: "script",
    },
    {
      src: "third-party-libs/javascript.min.js",
      backupSrc: "third-party-libs/javascript.min.js",
      type: "script",
    },
    {
      src: "third-party-libs/foldgutter.min.css",
      backupSrc: "third-party-libs/foldgutter.min.css",
      type: "stylesheet",
    },
    // 动态加载 js
    {
      src: "third-party-libs/foldcode.min.js",
      backupSrc: "third-party-libs/foldcode.min.js",
      type: "script",
    },
    {
      src: "third-party-libs/foldgutter.min.js",
      backupSrc: "third-party-libs/foldgutter.min.js",
      type: "script",
    },
    {
      src: "third-party-libs/brace-fold.min.js",
      backupSrc: "third-party-libs/brace-fold.min.js",
      type: "script",
    },
  ];

  // 首先加载具有依赖关系的资源
  await loadResources(resources.slice(0, 2));

  // 然后加载其他资源
  await loadResources(resources.slice(2));

  // 在加载功能性脚本后执行依赖于延迟加载脚本的初始化
  initCodeMirrorBasic();
  initCodeMirrorFold(cm);
}

async function loadAnalytics() {
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-MBMVKK6XE3");

  // Baidu Analytics
  var _hmt = _hmt || [];

  const loadAnalyticsScripts = async () => {
    const gaPromise = loadScript(
      "https://www.googletagmanager.com/gtag/js?id=G-MBMVKK6XE3"
    );

    const baPromise = new Promise((resolve, reject) => {
      const hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?ce04d5c0f38bd75216f8e2a9568ef4f9";
      hm.onload = () => {
        resolve();
      };
      hm.onerror = (error) => {
        reject(error);
      };
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    });

    await Promise.all([gaPromise, baPromise]);
  };

  await loadAnalyticsScripts();
}

async function loadFunctionalScripts() {
  const functionalScripts = [
    {
      src: "third-party-libs/beautify.min.js",
      backupSrc: "third-party-libs/beautify.min.js",
    },
    {
      src: "jsonlint.js",
    },
    {
      src: "json.js",
    },
  ];

  const loadScriptPromises = functionalScripts.map(async (script) => {
    try {
      await loadScript(script.src);
    } catch (error) {
      console.error(`Failed to load script ${script.src}: ${error.message}`);
      console.log(`Trying to load backup script: ${script.backupSrc}`);
      await loadScript(script.backupSrc);
    }
  });

  await Promise.all(loadScriptPromises);
}

// 在 DOMContentLoaded 事件触发时开始异步加载功能性脚本
document.addEventListener("DOMContentLoaded", async () => {
  await loadFunctionalScriptsFold(); // 异步加载功能性脚本
  await loadFunctionalScripts(); // 异步加载功能性脚本
  await loadAnalytics();        // Analytics
});