import React, { useState } from "react";

export default function TextForm(props) {
  const defaultText = "Enter text here";
  const [text, setText] = useState(defaultText);

  const handleUpClick = () => {
    // console.log("Uppercase was clicked : " + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case.", "success");
  };

  const handleFocus = () => {
    if (text === defaultText) {
      setText("");
    }
  };

  const handleBlur = () => {
    if (text === "") {
      setText(defaultText);
    }
  };

  const handleOnChange = (event) => {
    // console.log("On Change");
    setText(event.target.value);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower Case.", "success");
  };

  const handleClearClick = () => {
    setText('');
    props.showAlert("Text Cleared.", "success");
  }

  const handleCopy = () => {
    // var text = document.getElementById("myBox");
    // text.select();
    // text.setSelectionRange(0, 9999); not required as select is enough along with navigator
    navigator.clipboard.writeText(text);
    // document.getSelection().removeAllRanges();
    props.showAlert("Text is copied to Clipboard.", "success");
  }

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces has been removed.", "success");
  }

  const handleTextAreaStyle = {
    color: (props.mode === 'dark' && text === defaultText) ? 'white' :
           (text === defaultText) ? 'grey' : 
           (props.mode === 'dark' ? 'white' : 'black'),
    backgroundColor : props.mode === 'dark' ? 'grey' : 'white'
  };

  // text = "Change it";
  // setText("New Text");
  return (
    <>
      <div className="container" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={handleTextAreaStyle}
          ></textarea>
        </div>
        <button disabled={text.length === 0 || text === defaultText} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button disabled={text.length === 0 || text === defaultText} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length === 0 || text === defaultText} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>
          Clear Text
        </button>
        <button disabled={text.length === 0 || text === defaultText} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>
          Copy Text
        </button>
        <button disabled={text.length === 0 || text === defaultText} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
      </div>
      <div className="container my-3" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>Your Text Summary</h1>
        <p>
          There are {!(text === defaultText) && text.split(/\s+/).filter((element)=>{return element.length !== 0}).length} words and {!(text === defaultText) && text.length} characters.
        </p>
        <p>It can be read in {!(text === defaultText) && 0.008 * text.split(/\s+/).filter((element)=>{return element.length !== 0}).length} minutes.</p>
        <h2>Preview</h2>
        <p>{text.length > 0 && !(text === defaultText) ? text : "Enter text to preview here."}</p>
      </div>
    </>
  );
}
