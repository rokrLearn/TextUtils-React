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
    var text = document.getElementById("myBox");
    text.select();
    // text.setSelectionRange(0, 9999); not required as select is enough along with navigator
    navigator.clipboard.writeText(text.value);
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
        <h1>{props.heading}</h1>
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
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
      </div>
      <div className="container my-3" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>Your Text Summary</h1>
        <p>
          There are {text.split(" ").length} words and {text.length} characters.
        </p>
        <p>It can be read in {0.008 * text.split(" ").length} minutes.</p>
        <h2>Preview</h2>
        <p>{text.length > 0 && !(text === defaultText) ? text : "Enter text to preview here."}</p>
      </div>
    </>
  );
}
