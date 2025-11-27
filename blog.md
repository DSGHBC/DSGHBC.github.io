---
layout: page 
title: DSGH's Blog 
---
<!-- <h1>{{ page.title }}</h1>
<ul class="blog">
    {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
 -->
<!-- <div class="post-list">
  {% for post in site.posts %}
    <article class="post-item">
      <time datetime="{{ post.date | date_to_xmlschema }}">
        {{ post.date | date: "%Y.%m.%d" }}
      </time>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    </article>
  {% endfor %}
</div> -->
<h1>{{ page.title }}</h1>
<div class="blog-container">
    <ul class="blog">
        {% for post in site.posts %}
        <li >
            <a href="{{ post.url }}" title="{{ post.title }}" class="post-title">{{ post.title }}</a>
            <span class="post-date">{{ post.date | date_to_string }}</span>
        </li>
        {% endfor %}
    </ul>
</div>