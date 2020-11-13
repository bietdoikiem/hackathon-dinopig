import React from 'react'
import './CourseCard.css'

export default class CourseCard extends React.Component {



    render() {
        return (
            <div class="">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <img class="card-img-top" src="https://images.unsplash.com/photo-1445452916036-9022dfd33aa8?auto=format&fit=crop&w=1053&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" />
                        <div class="card-block course-info">
                            {/* Course name */}
                            <div class="card-course-info" id="course-name">
                                <p>Mathematics For Computing</p>
                            </div>

                            {/* Show how many assignment has been completed */}
                            <div class="card-course-info">
                                <div>
                                    <i class="fas fa-book"></i>
                                </div>
                                <div>
                                    <p>3/5</p>
                                </div>
                            </div>
                            {/* Ending date of the course */}
                            <div class="card-course-info">
                                <div>
                                    <i class="far fa-calendar-alt"></i>
                                </div>
                                <div>
                                    <p>15/11/2020</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-block card-bottom">
                            <button className='btn'><a>View</a></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}