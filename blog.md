---
layout: page
title: DSGH's Blog
---
<h1>{{ page.title }}</h1>
<div class="blog-container">
  <ul class="blog">
    {% for post in site.posts %}
    <a href="{{ post.url }}" title="{{ post.title }}" class="post-title">
      <li>
        {{ post.title }}
        <span class="post-date">{{ post.date | date_to_string }}</span>
      </li>
    </a>
    {% endfor %}
  </ul>
</div>