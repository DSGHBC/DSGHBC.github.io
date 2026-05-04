/* ── 侧栏折叠 ─────────────────────────────────── */
function foldLeft() {
    var side = document.getElementById('leftSide');
    var btn  = document.getElementById('leftBtn');

    var nowFolded = side.classList.toggle('folded');
    btn.classList.toggle('show', nowFolded);
}

function foldRight() {
    var toc = document.getElementById('rightToc');
    var btn = document.getElementById('rightBtn');

    var nowFolded = toc.classList.toggle('folded');
    btn.classList.toggle('show', nowFolded);
}

/* ── 初始状态 ─────────────────────────────────── */
function initSidebars() {
    var isMobile = window.innerWidth <= 1000;
    var leftSide  = document.getElementById('leftSide');
    var leftBtn   = document.getElementById('leftBtn');
    var rightToc  = document.getElementById('rightToc');
    var rightBtn  = document.getElementById('rightBtn');

    if (isMobile) {
        // 手机端默认全部折叠，浮钮显示
        leftSide.classList.add('folded');
        rightToc.classList.add('folded');
        leftBtn.classList.add('show');
        rightBtn.classList.add('show');
    } else {
        // 桌面端默认全部展开，浮钮隐藏
        leftSide.classList.remove('folded');
        rightToc.classList.remove('folded');
        leftBtn.classList.remove('show');
        rightBtn.classList.remove('show');

        // 如果文章没有标题（无目录），隐藏右侧
        var headings = document.querySelectorAll('#content h1, #content h2, #content h3');
        if (!headings.length) {
            rightToc.style.display = 'none';
            rightBtn.style.display = 'none';
        }
    }
}

/* ── 目录生成 ─────────────────────────────────── */
function buildToc() {
    var toc = document.getElementById('rightToc');
    var content = document.getElementById('content');
    var tocList = document.getElementById('tocList');
    var rightBtn = document.getElementById('rightBtn');

    var headings = content.querySelectorAll('h1, h2, h3');

    if (!headings.length) {
        toc.style.display = 'none';
        rightBtn.style.display = 'none';
        return;
    }

    headings.forEach(function(heading, index) {
        heading.id = 'heading-' + index;

        var li = document.createElement('li');
        li.textContent = heading.textContent;
        li.dataset.index = index;

        var indent = { H1: 0, H2: 14, H3: 28 }[heading.tagName] || 0;
        if (indent) li.style.marginLeft = indent + 'px';

        li.addEventListener('click', function() {
            heading.scrollIntoView({ behavior: 'smooth' });
        });

        tocList.appendChild(li);
    });
}

function highlightToc() {
    var content = document.getElementById('content');
    var headings = content.querySelectorAll('h1, h2, h3');
    var tocItems = document.querySelectorAll('#tocList li');

    if (!headings.length || !tocItems.length) return;

    var threshold = 72; // nav-h(52) + buffer
    var currentIndex = 0;
    for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top > threshold) break;
        currentIndex = i;
    }

    tocItems.forEach(function(item) { item.classList.remove('active'); });
    if (tocItems[currentIndex]) {
        tocItems[currentIndex].classList.add('active');
    }
}

/* ── 代码块初始化 ─────────────────────────────── */
function initCodeBlocks() {
    var langNames = {
        'c':'C','cpp':'C++','c++':'C++','python':'Python','py':'Python',
        'matlab':'MATLAB','m':'MATLAB','javascript':'JavaScript','js':'JavaScript',
        'typescript':'TypeScript','ts':'TypeScript','bash':'Bash','shell':'Shell',
        'sh':'Shell','powershell':'PowerShell','ps1':'PowerShell','html':'HTML',
        'css':'CSS','json':'JSON','yaml':'YAML','sql':'SQL',
    };

    document.querySelectorAll('div.highlighter-rouge').forEach(function(block) {
        var langClass = [].slice.call(block.classList).find(function(c) {
            return c.indexOf('language-') === 0;
        });
        var langKey = langClass ? langClass.replace('language-', '').toLowerCase() : '';
        var displayName = langNames[langKey] || (langKey ? langKey.toUpperCase() : '');

        var header = document.createElement('div');
        header.className = 'code-header';

        var langSpan = document.createElement('span');
        langSpan.className = 'code-lang';
        langSpan.textContent = displayName;

        var copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '复制';
        copyBtn.addEventListener('click', function() {
            var codeEl = block.querySelector('td.rouge-code pre')
                      || block.querySelector('.highlight > pre');
            var text = codeEl ? codeEl.textContent : '';
            copyToClipboard(text, copyBtn);
        });

        header.appendChild(langSpan);
        header.appendChild(copyBtn);
        block.insertBefore(header, block.firstChild);
    });
}

function copyToClipboard(text, btn) {
    function onSuccess() {
        btn.textContent = '已复制';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(fallback);
    } else {
        fallback();
    }

    function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        try { document.execCommand('copy') ? onSuccess() : null; } catch(e) {}
        document.body.removeChild(ta);
    }
}

/* ── 启动 ─────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', function() {
    initSidebars();
    initCodeBlocks();
    buildToc();
    highlightToc();
});

window.addEventListener('scroll', highlightToc, { passive: true });
