import React, { useState } from "react";
import styled from "styled-components";

function Unscrambler() {
    const [letters, setLetters] = useState('')
    const [starts, setStarts] = useState('')
    const [ends, setEnds] = useState('')
    const [wordLength, setWordLength] = useState('')
    const [wordsToDisplay, setWordsToDisplay] = useState([''])

    var words = require('an-array-of-english-words')

        const handleSubmit = (e) => {
            e.preventDefault();



            if(wordLength === ''){
            setWordsToDisplay(
                words.filter(word => 
                    word.split('').every(letter => letters.includes(letter)) && word.startsWith(starts) && word.endsWith(ends) 
                    ))
            }else{
            setWordsToDisplay(
                words.filter(word => 
                    word.split('').every(letter => letters.includes(letter)) && word.startsWith(starts) && word.endsWith(ends) && word.length === parseInt(wordLength)
                    ))
                }
        }

        const shortest = wordsToDisplay.reduce((a, b) => a.length <= b.length ? a : b).length

        const longest = wordsToDisplay.reduce((a, b) => a.length > b.length ? a : b).length

        const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);

        const numberRange = range(shortest, longest)




    return(
        <div>
            <h1>Word Unscrambler</h1>
            <form onSubmit={handleSubmit}>
                <Label for="letters">Letters</Label>
                <br></br>
                <Input name='letters' required type='search' onChange={(e) => setLetters(e.target.value)}/>
                <br></br>
                <Inputs>
                <LeftLabel for="starts">Starts With</LeftLabel>
                <br></br>
                <LeftInput name='starts' type='search' onChange={(e) => setStarts(e.target.value)}/>
                <RightLabel for="ends">Ends With</RightLabel>
                <br></br>
                <RightInput name='ends' type='search' onChange={(e) => setEnds(e.target.value)}/>
                </Inputs>
                <Label for="length">Length</Label>
                <br></br>
                <Input name='length' type='search' onChange={(e) => setWordLength(e.target.value)}/>
                <br></br>
                <button className={'pushy__btn'} type='submit'>Show Words</button>
            </form>

            {wordsToDisplay[0] === '' ? null :
            
            numberRange.map((number) => {
                return(
                <div>
                <h1>{number} letters words</h1>
                <WordContainer>
                {wordsToDisplay.filter(word =>
                        word.length === number
                        ).map(word =>
                            <WordBox>
                            <Word key={word.id}>{word}</Word>
                            </WordBox>
                        )}
                        </WordContainer>
                </div>
                )
                        }
                )}

        </div>
    )
}

const WordContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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

const WordBox = styled.div`

text-transform: uppercase;
letter-spacing: 1px;
background-color: grey;
border: 1px solid black;
min-width: 20vw;
width: auto;
height: 5vh;
justify-content: center;
text-align: center;
align-items: center;
margin-left: 5vw;
margin-right: 5vw;
`;

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
border: 5px solid black
`;


export default Unscrambler
