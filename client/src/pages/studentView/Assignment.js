import React from 'react'
import Quiz from '../../components/assignment/Quiz'
import styled from 'styled-components'
import Countdown from 'react-countdown';
import ClipLoader from 'react-spinners/ClipLoader'


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
            duration: 0,
            currentQuiz: 0,
            quizzes: [],
            result : '',
            mark : '',
            asmSampleId: this.props.match.params.assignmentId
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
                    userChoice: value,
                    sampleId: obj._id
                }) : obj)
            )
        }))
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
        console.log(this.state.quizzes)
        const requestOptions = {
            method: 'POST',

            // Set headers
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },


            body: JSON.stringify({
                quizzes: this.state.quizzes,
                username: this.props.match.params.id,
                asmSampleId: this.props.match.params.assignmentId                
            })
        }

        fetch('http://localhost:5000/assignments/submit', requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    result: data.listOfResult,
                    asm_result: data.asm_result
                })
                console.log(data)
            })
        }
        

      // Submit the assignment if it reach the duration
      autoSubmit() {
      }

      componentDidMount() {
          fetch(`http://localhost:5000/sampleassignments/${this.props.match.params.assignmentId}`)
            .then(res => res.json())
            .then(data => {
                data.sampleQuizIds.map(q => {
                    fetch(`http://localhost:5000/samplequizzes/${q}`)
                        .then(res => res.json())
                        .then(quiz => this.setState(prevState => ({
                            quizzes: [...prevState.quizzes, quiz]
                        })))
                })
                this.setState({ 
                    duration: data.time
                })
                console.log(this.state.duration)
            })
      }



    render() {
        let quizData = this.state.quizzes ?  this.state.quizzes[this.state.currentQuiz] : ''
        return (
            
            <div style={{margin: '50px auto'}}>
            {this.state.quizzes && this.state.quizzes.length > 0 ?
                <div>
                <CountDownContainer>
                    <Countdown onComplete={this.autoSubmit.bind(this)} date={this.state.duration.toString()}></Countdown>
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
                <ClipLoader>
                    
                </ClipLoader>
                }
                
                {this.state.result && this.state.result.length > 0 ? 
                    <div>
                        {this.state.asm_result}
                    </div>
                : 
                    ''
                }
                
            </div>
        )
    }
}