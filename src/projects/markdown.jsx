import {marked} from "marked"
import { useState } from "react"

marked.use({
    breaks : true
})

const text = `# Welcome to my React Markdown Previewer! 

## This is a sub-heading... 
### And here's some other cool stuff: 

` + 
"Heres some code, `<div></div>`, between 2 backticks." + "\n" +
"\n" +
"```" + "\n" +
"\/\/ this is multi-line code:" + "\n" +
"\n" +
"function anotherExample(firstLine, lastLine) {" + "\n" +
"  if (firstLine == '```' && lastLine == '```') {" + "\n" +
"    return multiLineCode;" + "\n" +
"  }" + "\n" +
"}" + "\n" + "\n" +
"```" + "\n" +  
`
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

function Page(){

    const [input, setInput] = useState(text)

    return <section className="all-initial">

        <div className="flex items-center flex-col gap-4 py-4">
            <textarea id="editor"
                style={{
                    width : "700px"
                }}
                className="border-4"
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={8}
                placeholder=">>> Input Here <<<"
            />

            <div id="preview"
                style={{
                    width : "800px",
                    minHeight : "400px"
                }}
                className="markdown border-4 p-4"
                dangerouslySetInnerHTML={{__html : marked(input)}} 
            />
        </div>
    </section>
}

export default Page