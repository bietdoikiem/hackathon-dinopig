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

    constructor(props) {
        super(props)
        this.state = { 
            duration: Date.now() + 5000,
            currentQuiz: 0,
            quizzes: [
                {   
                    id: '1',
                    question: 'dlakjdljqwjq;eqejq',
                    choices: ['eqweqeqeqeq', 'Bwqeqeqeqweq', 'Ceqsdadqweqeq', 'Deqdsadqdqdqq'],
                    studentChoice: ''
                },
                {
                    id: '2',
                    question: 'Ispum',
                    choices: ['E', 'F', 'G', 'H'],
                    studentChoice: ''
                },
            ],
            result : '',
            asmSampleId: this.props.match.params.id
        }
        this.handleChoose = this.handleChoose.bind(this)
        this.handleNextQuestion = this.handleNextQuestion.bind(this)
        this.handleLastQuestion = this.handleLastQuestion.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChoose(id, value) {
        this.setState( prevState => ({
            quizzes: prevState.quizzes.map(
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

    handleSubmit() {
        const requestOptions = {
            method: 'POST',

            // Set headers
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({
                quizzes: this.state.quizzes
                
            })
        }
        fetch('https://jsonplaceholder.typicode.com/todos', requestOptions)
            .then(res => res.json())
            .then(data => this.setState({
                result: [
                    {
                        id: '1',
                        result: true,
                        mark: 50
                    },
                    {
                        id: '2',
                        result: false,
                        mark: 0
                    }
                ]
            }))
            setTimeout(() => {
                console.log(this.state.result)

            }, 10000);
        }

      // Submit the assignment if it reach the duration
      autoSubmit() {
        console.log('submit')
      }



    render() {
        let quizData = this.state.quizzes[this.state.currentQuiz]
        console.log(this.state.result)
        return (
            
            <div style={{margin: '50px auto'}}>
                {this.state.result == '' ? 
                <div>
                <CountDownContainer>
                    <Countdown onComplete={this.autoSubmit.bind(this)} date={this.state.duration}></Countdown>
                </CountDownContainer>
                <Quiz data={quizData} handleChoose={this.handleChoose} />
                {this.state.currentQuiz > 0 ? 
                    <NaviQuiz onClick={this.handleLastQuestion}>Back</NaviQuiz>
                    : ''
                }
                {this.state.currentQuiz < this.state.quizzes.length - 1 ? 
                    <NaviQuiz onClick={this.handleNextQuestion}>Next</NaviQuiz>
                    :
                    <NaviQuiz onClick={this.handleSubmit}>Submit</NaviQuiz>
                }
            </div>
                :
                <div>
                    hello
                </div>
                }
                
                
            </div>
        )
    }
}