import React from 'react'
import Quiz from '../../components/assignment/Quiz'
import styled from 'styled-components'
import Countdown from 'react-countdown';


const NaviQuiz = styled.button `
    border-color: #99f3bd;
    padding: 7px 40px;
    margin: 20px;
    color: #fff;
    background-color: #99f3bd;
    border-style: solid;
    outline: none !important;
    font-weight: 600;
    &:hover {
        background-color: #28df99;
        
    }
`

const CountDownContainer = styled.div`
    font-size: 2rem;
    margin-bottom: 50px;
    
`


export default class Assignment extends React.Component {

    constructor() {
        super()
        this.state = { 
            duration: Date.now() + 5000,
            currentQuiz: 0,
            quiz: [
                {   
                    id: '1',
                    question: 'Lorem',
                    choices: ['A', 'B', 'C', 'D'],
                    studentChoice: ''
                },
                {
                    id: '2',
                    question: 'Ispum',
                    choices: ['E', 'F', 'G', 'H'],
                    studentChoice: ''
                },
            ]
        }
        this.handleChoose = this.handleChoose.bind(this)
        this.handleNextQuestion = this.handleNextQuestion.bind(this)
        this.handleLastQuestion = this.handleLastQuestion.bind(this)
        this.shuffleAnswer = this.shuffleAnswer.bind(this)
    }

    handleChoose(id, value) {
        this.setState( prevState => ({
            quiz: prevState.quiz.map(
                obj => (obj.id === id ? Object.assign(obj, {
                    choosed: value
                }) : obj)
            )
        }))
        console.log(id)
    }

    handleNextQuestion = () => {
        const nextQuiz = this.state.currentQuiz + 1;
        this.setState({
            currentQuiz: nextQuiz
        })
    };

    handleLastQuestion = () => {
        if (this.state.currentQuiz - 1 < 0) {
            console.log('Cannot go back')
        } else {
            const lastQuiz = this.state.currentQuiz - 1;
            this.setState({
                currentQuiz: lastQuiz
            })
        }
    }


    shuffleAnswer(answer) {
        let i = answer.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = answer[i];
          answer[i] = answer[j];
          answer[j] = temp;
        }
        return answer;
      }

      // Submit the assignment if it reach the duration
      autoSubmit() {
        console.log('submit')
      }

    render() {
        let quizData = this.state.quiz[this.state.currentQuiz]
        return (
            
            <div style={{margin: '50px auto'}}>
                <CountDownContainer>
                    <Countdown onComplete={this.autoSubmit.bind(this)} date={this.state.duration}></Countdown>
                </CountDownContainer>
                <Quiz data={quizData} handleChoose={this.handleChoose} />
                {this.state.currentQuiz > 0 ? 
                    <NaviQuiz onClick={this.handleLastQuestion}>Back</NaviQuiz>
                    : ''
                }
                {this.state.currentQuiz < this.state.quiz.length - 1 ? 
                    <NaviQuiz onClick={this.handleNextQuestion}>Next</NaviQuiz>
                    : 
                    <NaviQuiz>Submit</NaviQuiz>
                }
            </div>
        )
    }
}