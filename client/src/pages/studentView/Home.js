import React from 'react'
import CourseCard from '../../components/course/CourseCard'
import styled from 'styled-components'

const CardContainer = styled.div`
    width: 10%;
    margin: 0 10px;
`

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div class="row no-gutters" style={{ margin: '40px' }}>
                {this.props.subjects.map(s => (
                <CardContainer className="col-lg-3 col-12">
                    <CourseCard data={this.props.data} subject_data={s}></CourseCard>
                </CardContainer>
                ))}
            </div>
        )
    }
}