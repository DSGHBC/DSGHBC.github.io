---
layout: default
data: 2025-11-21
title: LaTexTesting
---

# 你好

{% capture my_content %}

### 这是一个二级标题

这是一个段落，包含**粗体**和*斜体*文本。

- 列表项 1
- 列表项 2
- 列表项 3

{% endcapture %}

{% include details.html summary="点击展开查看详细内容" content=my_content %}

你好呀

这个页面用于测试details标签

# details 测试完毕