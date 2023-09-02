import './App.css';
import { useState, useEffect } from 'react';
import { marked } from "https://cdn.skypack.dev/marked@4.0.16";

marked.use({
  breaks: true
});

function Editor({ textInput, setTextInput }) {
  return (
    <div className="editor">
      <div className="frame">
        <p className="frame-text">Editor</p>
      </div>
      <textarea
        id="editor"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      ></textarea>
    </div>
  );
}

function Previewer({ markup }) {
  return (
    <div className="previewer">
      <div className="frame">
        <p className="frame-text">Preview</p>
      </div>
      <div id="preview" dangerouslySetInnerHTML={markup}/>
    </div>
  );
}

function App() {
  const [rawMarkdown, setRawMarkdown] = useState(``);

  useEffect(() => {
    setRawMarkdown(`# This is a markdown h1 header!

## This is a markdown h2 header!

This is a link [A GitHub Profile](https://github.com/Teller501)

Heres some code  \`Hi\`

\`\`\`
And a code block
\`\`\`

Here is a list of programming languages:
- Java
- C#
- JavaScript

> Coding is fun!

![Image of a dog](https://petguide.dk/wp-content/uploads/2022/10/gooldendoodle.jpg)

**This is nice and bold!**
`);
  }, []);

  const getMarkdownText = () => {
    let markup= marked.parse(rawMarkdown);
    
    return {__html: markup}
  };

  return (
    <div>
      <h1 className="title">Markdown Previewer</h1>
      <Editor textInput={rawMarkdown} setTextInput={setRawMarkdown} />
      <div className="space"></div>
      <Previewer markup={getMarkdownText()}/>
    </div>
  );
}

export default App;
