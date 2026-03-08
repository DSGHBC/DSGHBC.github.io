---
layout: post
data: 2025-11-15
title: 加入Jekyll技术 - 利用 markdown 文本 
---
# 使用 jekyll 配置 md 页面

由于编写 html 的成本，个人网站我并没有多余的要求，例如需要使用到大量的动画或者后端的数据库等等，所以我决定使用 markdown 作为页面，也就是使用 jekyll 渲染一个静态的页面。

此处对于 jekyll 做一个简单的介绍。

jekyll 使用 Liquid 和 Markdown 来构建一个静态的个人网站，而 jekyll 和 Liquid 都是基于 Ruby 实现的，所以安装这两个东西都需要部署 Ruby。

值得注意的是，Jekyll 官方并不支持 Windows，但是我们依然可以通过某种方式实现 Windows 上运行这个项目。

[在 Windows 上安装 Jekyll (基于Ruby)]({% post_url 2025-11-20-在Windows上安装Jekyll(基于Ruby) %}) 这个文章将会解释如何安装 Windows 下的 Jekyll。

[Jekyll Markdown 到 HTML 原理简述]({% post_url 2025-11-20-Jekyll Markdown 到 HTML 原理简述 %}) 这个部分会简单的说一说 Md 文本以何种方式被 Jekyll 渲染为 HTML。

此部分的实践基于 [Creating and Hosting a Personal Site on GitHub](https://jmcglone.com/guides/github-pages/) 这个文章。

在一开始，我们已经成功部署了我们的个人网站，所以我们不必再进行二次部署。

我们修改根目录下的 `index.html` 文件如下。

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Hank Quinlan, Horrible Cop</title>
	</head>
	<body>
		<nav>
    		<ul>
        		<li><a href="/">Home</a></li>
	        	<li><a href="/about">About</a></li>
        		<li><a href="/cv">CV</a></li>
        		<li><a href="/blog">Blog</a></li>
    		</ul>
		</nav>
		<div class="container">
    		<div class="blurb">
        		<h1>Hi there, I'm Hank Quinlan!</h1>
				<p>I'm best known as the horrible cop from <em>A Touch of Evil</em> Don't trust me. <a href="/about">Read more about my life...</a></p>
    		</div><!-- /.blurb -->
		</div><!-- /.container -->
		<footer>
    		<ul>
        		<li><a href="mailto:hankquinlanhub@gmail.com">email</a></li>
        		<li><a href="https://github.com/hankquinlan">github.com/hankquinlan</a></li>
			</ul>
		</footer>
	</body>
</html>
```

并在根目录下创建一个目录 `css`，其中添加一个 css 文件 `main.css`。内容如下。

```css
body {
    margin: 60px auto;
    width: 70%;
}
nav ul, footer ul {
    font-family:'Helvetica', 'Arial', 'Sans-Serif';
    padding: 0px;
    list-style: none;
    font-weight: bold;
}
nav ul li, footer ul li {
    display: inline;
    margin-right: 20px;
}
a {
    text-decoration: none;
    color: #999;
}
a:hover {
    text-decoration: underline;
}
h1 {
    font-size: 3em;
    font-family:'Helvetica', 'Arial', 'Sans-Serif';
}
p {
    font-size: 1.5em;
    line-height: 1.4em;
    color: #333;
}
footer {
    border-top: 1px solid #d5d5d5;
    font-size: .8em;
}

ul.posts { 
    margin: 20px auto 40px; 
    font-size: 1.5em;
}

ul.posts li {
    list-style: none;
}
```

我们修改 `index.html` 文件，链接到我们的 `main.css` 文件。

在 `<head>` 标签内部添加 `<link rel="stylesheet" type="text/css" href="/css/main.css">` 这个标签。

值得注意的是，我们的 `href` 属性使用的是绝对目录。这里我们就构建了这个项目，我们可以提交并让 github 显示他。

至此我们来开始配置这个项目使用 MD 文本代替 HTML 成为网页。

首先是删除 `index.html` 这个文件，替换为 `index.md` 这个文件。

我们来讨论一个简单的 md 文件中的内容。通常来说，由两部分组成，一个部分叫做 `Front Matter` 页面头部参数。一个部分叫做 `content` 即正文。

## `Front Matter` 页面头部参数

页面头部参数使用了 `---` 来包裹，内部格式为 `name: value`。举例而言。

```yml
---
title: 标题
---
```

这里我们看到了一个页面头部参数，里面制定了一个参数 `title`，它的值是 `标题`。

## 正文

除了页面头部参数之外的内容，就是正文。

```yml
---
title: 标题
---
你好啊! 这里是一个正文，如果在Html中，需要使用<p>来包裹。
```

这里我们就看到了一行正文。

## 制作模板

首先，在原理部分，我们解释了替换过程，也就是 Markdown 最后会被转化为 html，而我们可以使用如上的两个部分的内容，来配置这个 html 会以什么样的形式来显示。

那么我们来配置两个东西，一个是**模板**，一个是**文本**。

模板是文本的渲染方式，所以里面需要用某种方式来表示文本的内容，而不是盲目的把文本中的所有内容放进去 (哪怕仅仅是简单的放进去，也需要一个东西来表示其位置，类似泛型亦或者 cpp 中的模板)。

所以我们来写出如下的一个模板。并命名为 `main.html`，放在根目录下的 `_layouts` 目录下。
{% raw %}
```html
<!DOCTYPE html>
<html>
    <head>
        <title>{{ page.title }}</title>
    </head>
    <body>
        <div class="container">
            {{ content }}
        </div><!-- /.container -->
    </body>
</html>
```

凡是以这个模板渲染的文件，都会安装模板的格式打印出来。这是十分显然的。

而我们在这个模板中看到了两个变量，一个是 `title`，它使用了 `page` 来访问这个变量，一个是 `content`，他入上所示，表示的是正文。

而这两个变量均使用了 `{{}}` 包括起来。这部分是 `Liquid` 的语法，这些东西称作**对象**。

我们使用 `page` 来访问我们在文本中的页面头部参数定义的变量。

{% endraw %}

## 制作文本

现在我们来使用上面我们创建的文本。

我们使用如下文本

```markdown
---
title: 标题
---
你好啊! 这里是一个正文，如果在Html中，需要使用<p>来包裹。
```

这样他是不会被渲染出来的，因为他并不知道它使用了什么模板。

我们添加 `layout: main` 来告诉我们的文本，我们使用了什么作为他的模板。

也就是如下。

```markdown
---
title: 标题
layout: main
---
你好啊! 这里是一个正文，如果在Html中，需要使用<p>来包裹。
```

这里的 `main` 就是我们上面的模板的名字。

我们把他命名为 `index.md`，并放在根目录下。

这样我们的网站就可以使用 Markdown 来显示了。

## 总结

使用 Jekyll 部署一个 md 网站的流程基本上如下。

{% raw %}
<div class="mermaid">
graph LR
制作模板-->MD文本使用模板-->模板渲染MD为HTML
</div>
{% endraw %}

后续我们可以使用类似的方式来实现页面之间的跳转，页面样式的渲染的更改等等。

我们的学习方向主要是

- jekyll 的目录结构
- jekyll 的保留变量
- Liquid 的基本知识

通过以上的三个部分的学习，我们可以逐渐熟练的使用这个技术来部署这个网站。