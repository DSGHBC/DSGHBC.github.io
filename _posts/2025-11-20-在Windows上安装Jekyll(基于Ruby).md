---
layout: post
title: 在 Windows 上安装 Jekyll (基于Ruby)
date: 2025-11-16
---

sources:

- [jekyll 中文网windows 安装jekyll](https://jekylldo.cn/docs/installation/windows/)

# 1 使用 RubyInstaller 安装

在此 [下载](https://rubyinstaller.org/downloads/)RubyInstaller 这个组件，他会在 windows 上安装 Ruby 和 Jekyll。

请注意的是，我们需要下载具有 DEVKIT 的版本。

<img src="/assets/img/2025-11-16/Pasted image 20251116004404.png" height="60%" width="60%">

随后的安装只需要依照个人习惯配置目录，然后其余的保持默认即可。对于安装的用户，依照个人习惯亦可，也可以仅仅给自己的用户安装。

在安装完毕后，会默认勾选开启 rubyinstaller2 for Windows。

如下界面

<img src="/assets/img/2025-11-16/Pasted image 20251116004648.png" height="60%" width="60%">

此处笔者错误的选择了 1，实际上需要选择 3。

这个界面可以使用 `ridk install` 命令再次打开。

> 注意，这个部分也涉及到了 MSYS2。[什么是MSYS2](/todoing.html)。介于笔者的电脑上已经安装过了 MSYS2，所以笔者做到这一步的时候十分好奇这个工具会如何运行，是否会识别到笔者的 MSYS2，是否可以复用笔者的 MSYS2。

使用管理员权限打开执行这个命令并选择 3，之后，如下输出。

<img src="/assets/img/2025-11-16/Pasted image 20251116005638.png" height="60%" width="60%">

可能是笔者在使用 CPP 中已经安装过了 MSYS2，所以全部是已经安装过了。

随后我们使用如下命令安装 `jekyll` 和 `Bundler`。

```powershell
gem install jekyll bundler
```

如下输出

<img src="/assets/img/2025-11-16/Pasted image 20251116010149.png" height="60%" width="60%">

> **什么是 RubyGem?**
> Gem 可以理解为 Ruby 的代码包。他提供了很多功能，供我们使用，Jekyll 和他的插件都是 Gem。
> **什么是 Bundler?**
> Bundler 是一个安装器，用于安装 Gemfile 中的 gem。
> 使用 Bundler 安装 Gemfile 中的 Gem，只需要在有 Gemfile 的目录下使用 `bundle install` 即可。也就是说 `bundler`，就是 cpp 中的 `vcpkg`。
> **什么是 gemfile?**
> 这个类似于 `vcpkg.json`，就是一个 gem 的列表。

为确保已经安装成功 `jekyll`，我们使用 `jekyll -v` 来检测我们的这个工具是否安装成功。如下输出。

<img src="/assets/img/2025-11-16/Pasted image 20251116011750.png" height="60%" width="60%">

这代表我们的 jekyll 已经安装完毕。

# 2 jekyll 安装测试

我们可以新配置一个项目，已确认我们的 jekyll 是可以用的。

如下命令。

```powershell
jekyll new myblog
cd myblog
bundle exec jekyll serve
```

随后，我们可以通过浏览器访问 `http://localhost:4000` 来查看我们的网站。

对于一个并没有使用 `jekyll` 创建的项目 (如同我们手动创建的项目)，我们可以使用其他的方式达到同样的效果。

```powershell
jekyll build # 或者jekyll b
jekyll serve # 或者jekyll s
```

- `jekyll build` 命令的作用是在本地生成一个静态的文件位于 `./_site` 目录。这个是默认设置，可以更改，但是不建议更改。
- `jekyll serve` 命令的作用是在本地构建一个服务器，用于访问这个网站。并在修改源文件时自动重新构建。
	- 执行命令时带上 `--livereload` 选项，每次修改保存重新构建后会自动刷新浏览器页面，实时加载和预览。
	- 尽管文档中指出了如上的参数，但是实际上如上的参数并没有效果，在我们执行 `jekyll serve` 的时候，给出了正确的参数 `--incremental`。

# 3 Linux 安装 jekyll

首先更新系统并安装 `ruby` 语言依赖。

```bash
sudo apt update
sudo apt install -y ruby ruby-dev build-essential
```

不需要 gem 的文档，配置一下

```bash
echo "gem: --no-document" >> ~/.gemrc
```

安装 jekyll 和 bundler

```bash
sudo gem install -n /usr/local/bin jekyll bundler
```

检查一下

```bash
jekyll -v
bundle -v
```
