---
layout: page
title: DSGH's Blog
---
<h1>{{ page.title }}</h1>
<ul class="blog-list">
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}" title="{{ post.title }}">
      <span class="post-title">{{ post.title }}</span>
      <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
