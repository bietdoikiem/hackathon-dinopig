import React from 'react'
import CourseCard from '../components/student/CourseCard'
import styled from 'styled-components'

const CardContainer = styled.div`
    width: 27%;
`

export default class StudentHome extends React.Component {

    constructor() {
        super()
        this.state = {
            course: {}
        }
    }

    render() {
        return (
            <div>
                <div class="row no-gutters" style={{padding:'40px'}}>
                    <CardContainer className="col-3 no-gutters">
                        <CourseCard></CourseCard>
                    </CardContainer>
                    <CardContainer className="col-3 no-gutters">
                        <CourseCard></CourseCard>
                    </CardContainer>
                    <CardContainer className="col-3 no-gutters">
                        <CourseCard></CourseCard>
                    </CardContainer>
                    <CardContainer className="col-3 no-gutters">
                        <CourseCard></CourseCard>
                    </CardContainer>
                </div>
            </div>
        )
    }
}