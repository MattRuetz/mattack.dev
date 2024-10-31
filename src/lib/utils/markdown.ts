import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-toml';

// Create marked instance with proper configuration
const marked = new Marked(
  markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
      if (prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
      }
      return code;
    }
  })
);

marked.setOptions({
    breaks: true,
    gfm: true
});

export async function processMarkdown(content: string): Promise<string> {
    return marked.parse(content);
}