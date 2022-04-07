import React, { useState } from "react";
import styled from "styled-components";
import WordBox from "./WordBox";
import Scramble from "react-scramble";

function Unscrambler() {
  const [letters, setLetters] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [wordLength, setWordLength] = useState("");
  const [wordsToDisplay, setWordsToDisplay] = useState([""]);
  const [includes, setIncludes] = useState("");

  var words = require("an-array-of-english-words");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (wordsToDisplay.length === 0 || wordsToDisplay[0] === "") {
    // if (wordLength === "") {

    var lettercounts = {};

    for (const letter of letters.split("")) {
      lettercounts[letter] = lettercounts[letter]
        ? lettercounts[letter] + 1
        : 1;
    }
    setWordsToDisplay(
      words.filter((word) => {
        const wordcounts = {};

        for (const letter of word.split("")) {
          wordcounts[letter] = wordcounts[letter] ? wordcounts[letter] + 1 : 1;
        }
        if (
          word.split("").every((letter) => letters.includes(letter)) &&
          word.startsWith(starts) &&
          word.endsWith(ends) &&
          word.includes(includes) &&
          word.length <= letters.length &&
          (wordLength === ""
            ? word.startsWith(starts)
            : word.length === parseInt(wordLength)) &&
          word
            .split("")
            .every((letter) => wordcounts[letter] <= lettercounts[letter])
        ) {
          return word;
        }
      })
    );
    // } else {
    //   setWordsToDisplay(
    //     words.filter(
    //       (word) =>
    //         word.split("").every((letter) => letters.includes(letter)) &&
    //         word.startsWith(starts) &&
    //         word.endsWith(ends) &&
    //         word.includes(includes) &&
    //         word.length === parseInt(wordLength)
    //     )
    //   );
    // }
    // } else {
    //   setWordsToDisplay([""]);
    //   setLetters("");
    //   setStarts("");
    //   setEnds("");
    //   setIncludes("");
    //   setWordLength("");
    // }
  };
  // if(wordsToDisplay !== []){
  // var shortest = wordsToDisplay.reduce((a, b) =>
  //   a.length <= b.length ? a : b
  // ).length;

  //   var longest = wordsToDisplay.reduce((a, b) => (a.length > b.length ? a : b))
  //     .length;
  // }
  // const range = (min, max) =>
  //   [...Array(max - min + 1).keys()].map((i) => i + min);

  // const numberRange = range(3, letters.length);

  var numberRange = [];
  for (var i = 3; i <= letters.length; i++) {
    numberRange.push(i);
  }

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="topForm">
        <h1>
          <Scramble
            autoStart
            text="Unscrambler"
            steps={[
              {
                roll: 10,
                action: "+",
                type: "all"
              },
              {
                action: "-",
                type: "forward"
              }
            ]}
          />
        </h1>
        <form onSubmit={handleSubmit}>
          <Label for="letters">Letters</Label>
          <br></br>
          <Input
            name="letters"
            required
            type="search"
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
          />
          <br></br>
          <Inputs>
            <LeftLabel for="starts">Starts With</LeftLabel>
            <br></br>
            <LeftInput
              name="starts"
              type="search"
              value={starts}
              onChange={(e) => setStarts(e.target.value)}
            />
            <RightLabel for="ends">Ends With</RightLabel>
            <br></br>
            <RightInput
              name="ends"
              type="search"
              value={ends}
              onChange={(e) => setEnds(e.target.value)}
            />
          </Inputs>

          <Inputs>
            <LeftLabel for="includes">Includes</LeftLabel>
            <br></br>
            <LeftInput
              name="includes"
              type="search"
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
            />
            <RightLabel for="length">Length</RightLabel>
            <br></br>
            <RightInput
              name="length"
              type="search"
              value={wordLength}
              onChange={(e) => setWordLength(e.target.value)}
            />
          </Inputs>

          {/* <Label for="length">Length</Label>
          <br></br>
          <Input
            name="length"
            type="search"
            onChange={(e) => setWordLength(e.target.value)}
          /> */}
          <br></br>
          <button className={"show__btn"} type="submit">
            {/* {wordsToDisplay.length === 0 || wordsToDisplay[0] === "" */}
            {/* ? " */}
            Show Words
            {/* " */}
            {/* : "Reset"} */}
          </button>
        </form>
      </div>
      {wordsToDisplay.length === 0 ? (
        <h1>
          <Scramble
            autoStart
            text="NO RESULTS"
            steps={[
              {
                roll: 10,
                action: "+",
                type: "all"
              },
              {
                action: "-",
                type: "forward"
              }
            ]}
          />
        </h1>
      ) : (
        numberRange.reverse().map((number) => {
          if (wordsToDisplay.some((word) => word.length === number)) {
            return (
              <div>
                <h1>
                  <Scramble
                    autoStart
                    text={`${number} letter words`}
                    steps={[
                      {
                        roll: 10,
                        action: "+",
                        type: "all"
                      },
                      {
                        action: "-",
                        type: "forward"
                      }
                    ]}
                  />
                </h1>
                <WordContainer>
                  {wordsToDisplay
                    .filter((word) => word.length === number)
                    .map((word) => (
                      <WordBox key={word.id} word={word} />
                    ))}
                </WordContainer>
                <button className={"pushy__btn"} onClick={toTop}>
                  Back to Top
                </button>
              </div>
            );
          }
        })
      )}
    </div>
  );
}

const WordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const NumHead = styled.h2`
  user-select: none;
`;

const Inputs = styled.div`
  display: flex;
`;

const Label = styled.label`
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LeftLabel = styled.label`
  text-transform: uppercase;
  letter-spacing: 1px;
  float: left;
`;

const RightLabel = styled.label`
  text-transform: uppercase;
  letter-spacing: 1px;
  float: right;
`;

// const WordBox = styled.div`
// text-transform: uppercase;
// letter-spacing: 1px;
// background-color: grey;
// border: 1px solid black;
// min-width: 20vw;
// width: auto;
// height: 5vh;
// justify-content: center;
// text-align: center;
// align-items: center;
// margin-left: 5vw;
// margin-right: 5vw;
// `;

const Word = styled.h5`
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding: 3px;
`;

const Input = styled.input`
  border-radius: 20px;
  position: relative;
  color: rgb(37, 38, 51);
  text-transform: uppercase;
  letter-spacing: 1px;
  height: 5vh;
  margin-bottom: 2vh;
  width: 40vw;
  font-size: 1.5em;
`;

const LeftInput = styled.input`
  border-radius: 20px;
  position: relative;
  color: rgb(37, 38, 51);
  text-transform: uppercase;
  letter-spacing: 1px;
  height: 5vh;
  margin-bottom: 2vh;
  width: 20vw;
  font-size: 1.5em;
  float: left;
  margin-right: 5vw;
`;

const RightInput = styled.input`
  border-radius: 20px;
  position: relative;
  color: rgb(37, 38, 51);
  text-transform: uppercase;
  letter-spacing: 1px;
  height: 5vh;
  margin-bottom: 2vh;
  width: 20vw;
  font-size: 1.5em;
  float: right;
  margin-right: 10vw;
`;

const Form = styled.div`
  right: 0;
  float: right;
  position: relative;
  color: rgb(37, 38, 51);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px;
  margin-top: 5vh;
  border: 5px solid black;
`;

export default Unscrambler;
