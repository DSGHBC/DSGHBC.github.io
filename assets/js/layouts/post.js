function foldLeft() {
    const side = document.getElementById('leftSide');
    const btn = document.getElementById('leftBtn');
    const icon = document.getElementById('leftBtnIcon');

    const nowFolded = side.classList.toggle('folded');
    btn.classList.toggle('folded', nowFolded);
    icon.className = nowFolded ? 'fa fa-chevron-right' : 'fa fa-chevron-left';
}

function foldRight() {
    const toc = document.getElementById('rightToc');
    const btn = document.getElementById('rightBtn');
    const icon = document.getElementById('rightBtnIcon');

    const nowFolded = toc.classList.toggle('folded');
    btn.classList.toggle('folded', nowFolded);
    icon.className = nowFolded ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
}

function buildToc() {
    const toc = document.getElementById('rightToc');
    const content = document.getElementById('content');
    const tocList = document.getElementById('tocList');

    const headings = content.querySelectorAll('h1, h2, h3');

    if (!headings.length) {
        toc.style.display = 'none';
        document.getElementById('rightBtn').style.display = 'none';
        return;
    }

    headings.forEach((heading, index) => {
        heading.id = 'heading-' + index;

        const li = document.createElement('li');
        li.textContent = heading.textContent;
        li.dataset.index = index;

        // indent by heading level
        const indent = { H1: 0, H2: 12, H3: 24 }[heading.tagName] ?? 0;
        if (indent) li.style.marginLeft = indent + 'px';

        li.addEventListener('click', () => {
            heading.scrollIntoView({ behavior: 'smooth' });
        });

        tocList.appendChild(li);
    });
}

function highlightToc() {
    const content = document.getElementById('content');
    const headings = content.querySelectorAll('h1, h2, h3');
    const tocItems = document.querySelectorAll('#tocList li');

    if (!headings.length || !tocItems.length) return;

    // 找到最后一个已经滚过导航栏的标题（top < navH + 小偏移）
    const threshold = 72; // nav-h(52) + 20px buffer
    let currentIndex = 0;
    for (let i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top > threshold) break;
        currentIndex = i;
    }

    tocItems.forEach(item => item.classList.remove('active'));
    tocItems[currentIndex].classList.add('active');
}

function initCodeBlocks() {
    const langNames = {
        'c':          'C',
        'cpp':        'C++',
        'c++':        'C++',
        'python':     'Python',
        'py':         'Python',
        'matlab':     'MATLAB',
        'm':          'MATLAB',
        'javascript': 'JavaScript',
        'js':         'JavaScript',
        'typescript': 'TypeScript',
        'ts':         'TypeScript',
        'bash':       'Bash',
        'shell':      'Shell',
        'sh':         'Shell',
        'powershell': 'PowerShell',
        'ps1':        'PowerShell',
        'html':       'HTML',
        'css':        'CSS',
        'json':       'JSON',
        'yaml':       'YAML',
        'sql':        'SQL',
    };

    // 只选 div.highlighter-rouge，排除行内 code.highlighter-rouge
    document.querySelectorAll('div.highlighter-rouge').forEach(block => {
        const langClass = [...block.classList].find(c => c.startsWith('language-'));
        const langKey = langClass ? langClass.replace('language-', '').toLowerCase() : '';
        const displayName = langNames[langKey] || (langKey ? langKey.toUpperCase() : '');

        const header = document.createElement('div');
        header.className = 'code-header';

        const langSpan = document.createElement('span');
        langSpan.className = 'code-lang';
        langSpan.textContent = displayName;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '复制';
        copyBtn.addEventListener('click', () => {
            // 只取代码内容，不含行号
            const codeEl = block.querySelector('td.rouge-code pre')
                        || block.querySelector('.highlight > pre');
            const text = codeEl ? codeEl.textContent : '';
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
        setTimeout(() => {
            btn.textContent = '复制';
            btn.classList.remove('copied');
        }, 2000);
    }
    function onFail() {
        btn.textContent = '失败';
        setTimeout(() => { btn.textContent = '复制'; }, 2000);
    }

    // 现代浏览器 + HTTPS
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallback());
    } else {
        fallback();
    }

    function fallback() {
        // HTTP 环境下的兼容方案
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy') ? onSuccess() : onFail();
        } catch {
            onFail();
        }
        document.body.removeChild(ta);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initCodeBlocks();
    buildToc();
    highlightToc();
});

window.addEventListener('scroll', highlightToc, { passive: true });
