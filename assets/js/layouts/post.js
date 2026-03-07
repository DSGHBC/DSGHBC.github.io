function foldLeft() {
    document.getElementById('leftSide').classList.toggle('folded');
    document.getElementById('leftBtn').classList.toggle('folded');
    const text = document.getElementById('leftBtnText');

    if (
        document.getElementById('leftSide').classList.contains('folded') ||
        document.getElementById('leftBtn').classList.contains('folded')
    ) {
        text.textContent = '目录';
    } else {
        text.textContent = '隐藏';
    }
}
function foldRight() {
    document.getElementById('rightToc').classList.toggle('folded');
}

function buildToc() {
    const root = document.getElementById('rightToc');
    const content = document.getElementById('content');
    const tocList = document.getElementById('tocList');
    // const tocTitle = document.getElementById('tocTitle')

    // const title = content.querySelector('h1');
    // if (!title.textContent) {
    //     tocTitle.textContent = '{{page.title}}'
    // } else {
    //     tocTitle.textContent = title.textContent;
    // }

    const headings = content.querySelectorAll('h2,h3');

    if (!headings.length) {
        root.style.display = 'none';
        return;
    }

    headings.forEach((heading, index) => {
        heading.id = 'heading-' + index;
        const li = document.createElement('li');
        li.textContent = heading.textContent;
        li.style.marginLeft = heading.tagName === 'H3' ? '12px' : '0';
        li.addEventListener('click', () => {
            heading.scrollIntoView({ behavior: 'smooth' });
        });

        tocList.appendChild(li);
    });
}

function highlightToc() {
    const content = document.getElementById('content');
    const headings = content.querySelectorAll('h2,h3');
    const tocItems = document.querySelectorAll('#tocList li');

    if (!headings.length || !tocItems.length) return;
    let currentIndex = 0;
    const viewportTop = window.scrollY;

    for (let index = 0; index < headings.length; index++) {
        const rect = headings[index].getBoundingClientRect();
        if (rect.top > 200) {
            break;
        }
        currentIndex = index;
    }

    tocItems.forEach(item => item.classList.remove('active'));

    if (tocItems[currentIndex]) {
        tocItems[currentIndex].classList.add('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    buildToc();
    highlightToc();
});

window.addEventListener('scroll', highlightToc);

// document.querySelector('.mobile-left').addEventListener('click', () => {
//     document.querySelector('.left').classList.toggle('show');
// });

// document.querySelector('.mobile-right').addEventListener('click', () => {
//     document.querySelector('.right').classList.toggle('show');
// });