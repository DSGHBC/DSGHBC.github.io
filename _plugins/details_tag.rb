# _plugins/details_tag.rb
# 使用 {% details <提示文本> %} 来开始一个<details>标签
# 使用 {% enddetails %} 来表示一个</details>标签


module Jekyll
  class DetailsTag < Liquid::Block
    def initialize(tag_name, summary, tokens)
      super
      @summary = summary.strip
    end

    def render(context)
      content = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
      converted_content = converter.convert(content)
      
      <<~HTML
        <details>
          <summary>#{@summary}</summary>
          <div class="details-content">
            #{converted_content}
          </div>
        </details>
      HTML
    end
  end
end

Liquid::Template.register_tag('details', Jekyll::DetailsTag)