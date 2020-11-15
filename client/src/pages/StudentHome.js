import React from 'react'
import Home from './studentView/Home'
import styled from 'styled-components'

export default class Student extends React.Component {

    constructor() {
        super()
        this.state = {
            data : '',
            subjects: []
        }

    }

    componentDidMount() {
        fetch(`http://localhost:5000/users/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                data.subjectIds.map(s => {
                    fetch(`http://localhost:5000/subjects/${s}`)
                    .then(res => res.json())
                    .then(subject => this.setState(prevState => ({
                        subjects: [...prevState.subjects, subject]
                      })))
                })
                this.setState({data})
            })
    }

    render() {
        return (
            <div>
                {this.state.subjects && this.state.subjects.length > 0 ? 
                <Home data={this.state.data} subjects={this.state.subjects}  />

                :
                    ''
                }
            </div>
        )
    }
}