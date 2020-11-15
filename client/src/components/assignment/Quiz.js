import React from 'react'
import './Quiz.css'
export default class Quiz extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            choice : ''
        }
        this.handleChooseAnswer = this.handleChooseAnswer.bind(this)
    }

    handleChooseAnswer(e) {
        this.props.handleChoose(this.props.data.id, e.target.name)
    }


    render() {
        console.log(this.props.data)
        return (
            <div className="question-box">
                <div className="question">
                    <p>{this.props.data.question}</p>
                </div>
                {this.props.data.choices.map((text, index) => (
                    <button
                        key={index}
                        name={text}
                        className={this.props.data.userChoice === text ? "answer-btn choosed" : "answer-btn"}
                        onClick={this.handleChooseAnswer}
                        > {text}
                    </button>
                ))}
            </div>
        )
    }

}