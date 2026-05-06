---
layout: page
title: DSGH's Blog
---
<h1>{{ page.title }}</h1>
<ul class="blog-list">
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}" title="{{ post.title }}">
      <span class="post-head">
        <span class="post-title">{{ post.title }}</span>
        <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      </span>
      <span class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
