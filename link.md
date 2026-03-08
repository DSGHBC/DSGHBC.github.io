---
layout: page 
title: "Link All The World!" 
---
## 构建这个网站

这个页面将会用于讲授如何构建这个网站，我会汇集我在构建这个网站过程中用到的知识以及笔记，制作成为一个完整的地图。如果你完整的阅读了这篇文章，应该可以做到完整的复刻这个网站。我会以搭积木的方式介绍这个网站是如何实现的，在显示基本的网站之后，我会在着手介绍`HTML`和`CSS`和`Javascript`的知识。

不用担心，我们学习以上的三者，只是为了这个网站服务，所以我们只会学习实用的一部分，而不会花费时间在枯燥的理论上(尽管这些理论也是十分必须的)。我会简单的概括的讲述DOM，盒结构等等知识。

> 我计划做一期视频来解释`HTML`和`CSS`和`Javascript`之间的关联，因为在我写下文字的时候，动画自然而然的浮现在了我的脑海中，所以我真的很想把它做出来。
>
> 不过，什么时候去做，是一个问题，我可能会花费时间去学习`Processing`语言去制作这个视频，也可能简单的使用AE来制作动画，谁知道呢?

现在，先收集一些官方的网页吧，我在构建这个网页的过程中，大量的阅读了这个部分的文档。如果你要复刻这个项目，那么这些网页想必也会帮助到你。

{% capture build %}

[Jekyll](https://jekylldo.cn/)
官方手册，用于学习jekyll和Liquid技术来部署和这个网站。

[Nginx](https://nginx.mosong.cc/guide/)
Nginx中文手册

[Liquid](https://jekylldo.cn/liquid/basics/introduction/)
Liquid语言手册

{% endcapture %}

{% include details.html summary="展开查看列表" content=build %}

{% capture todo %}

**理论**

- [ ] HTML，CSS和Javascript是如何连接起来的?
- [ ] CSS的盒结构 - 正常盒与怪异盒
- [ ] CSS的布局 - Flex与Grid
- [ ] CSS的动画 - 过渡和动画

**网站实战**

- [ ] post中的三栏式页面是如何实现的?
- [ ] 如何动态读取目录?
- [ ] 如何隐藏某一栏?
- [ ] 如何配置主题?

**部署**

- [x] [GitHubPages 实现一个简单的网页]({% post_url 2025-11-15-使用 GitHub 搭建个人网站 %})
- [x] [加入Jekyll技术 - 利用 markdown 文本]({% post_url 2025-11-15-加入Jekyll技术 - 利用 markdown 文本 %})

{% endcapture %}

{% include details.html summary="TODO列表" content=todo %}