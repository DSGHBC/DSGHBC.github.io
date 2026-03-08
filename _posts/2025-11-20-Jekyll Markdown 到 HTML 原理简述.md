---
layout: post
title: Jekyll Markdown 到 HTML 原理简述 
date: 2025-11-20
---

我们可以使用 yaml 页面头部参数 (Front Matter) 来指定一个一个 markdown 页面的渲染模式。

在我们的项目目录下，有一个文件夹 `_posts`。这里面放的是模板，这些模板都是 Html，也就是实际被显示出来的样子，而 Jekyll 简化了我们需要多次写这个的过程，我们可以使用 Liquid 技术来把我们的 markdown 信息填充进入 html，随后使用 jekyll 把 markdown 转化为 html，得到最终的静态网页。

值得一提的是，我们的 `_posts` 中的页面可以使用 `css` 的。

我们来举一个例子。

{% raw %}
```html
<!DOCTYPE html>
<html>
    <head>
        <title>{{ page.title }}</title>
        <link rel="stylesheet" type="text/css" href="/css/main.css">
    </head>
    <body>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/blog">Blog</a></li>
            </ul>
        </nav>
        <div class="container">
            {{ content }}
        </div><!-- /.container -->
        <footer>
            <ul>
                <li><a href="mailto:tai@foxmail.com">Email</a></li>
                <li><a href="https://github.com/dsghbc">GitHub</a></li>
            </ul>
        </footer>
    </body>
</html>
```
{% endraw %}

{% raw %}
这是在 `_posts` 下的一个模板 `default.html`。

这里面就有两个 `Liquid` 语言标记，一个是 `{{page.title}}`，一个是 `{{content}}`。

其中 `page.title` 指的是页面中的 Front matter 中定义的变量 `title` 的值，这个值会被替换到这里。

而 `content` 是一个默认的变量，它指的是在我们 Front matter 后的内容。

所以我们可以创建如下的一个 `index.md`。

{% endraw %}

```markdown
---
layout: default 
title: "欢迎来到我的网站" 
description: "这是一个使用Markdown来进行编写的网站"
---
# Welcome!

欢迎来到这里!


## 联系我

tai0@foxmail.com
```

我们看到了使用 `---` 开头的 Front matter 数据，这里面指定了 `layout` 和 `title` 变量。

`layout` 变量指的是我们这个页面使用的模板，也就是在 `_posts` 中的 Html 文件。

`title` 变量就是我们后续引用的变量。

> 在根目录下有一个文件名为 `_config.yml`，这个文件是默认的变量值。具体而言指的是我们在每个文件开头的 Front matter 数据字段，这里面没有设定的会继承 `config.yml` 中的值，如果有设定，就覆盖。(类似 html 中的 style)。

而在 Front matter 后的数据全部都是 `content` 的内容。

这样一个 md 文件，被依照如上的方式渲染之后，如下的显示。

<img src="/assets/img/2025-11-16/Pasted image 20251116030107.png" height="60%" width="60%">