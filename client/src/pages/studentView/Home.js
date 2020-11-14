import React from 'react'
import CourseCard from '../../components/course/CourseCard'
import styled from 'styled-components'

const CardContainer = styled.div`
    width: 10%;
    margin: 0 10px;
`

export default class Home extends React.Component {

    render() {
        return (
            <div class="row no-gutters" style={{margin:'40px'}}>
                <CardContainer className="col-lg-3 col-12">
                    <CourseCard></CourseCard>
                </CardContainer>
                <CardContainer className="col-lg-3 col-12">
                    <CourseCard></CourseCard>
                </CardContainer>
                <CardContainer className="col-lg-3 col-12">
                    <CourseCard></CourseCard>
                </CardContainer>
                <CardContainer className="col-lg-3 col-12">
                    <CourseCard></CourseCard>
                </CardContainer>
            </div>
        )
    }
}