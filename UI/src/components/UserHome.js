import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../style/UserHome.css'
import $ from 'jquery'


class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editExid: '',
            userEmail: '',
            userEx: [],
        }
        this.Delete = this.Delete.bind(this);
        this.Edit = this.Edit.bind(this);
        this.Logout = this.Logout.bind(this);
        this.AddEx = this.AddEx.bind(this);
        this.OpenAdd = this.OpenAdd.bind(this);
        this.ExChange = this.ExChange.bind(this);
        this.OpenEdit = this.OpenEdit.bind(this);
    }
    componentDidMount() {
        this.setState({
            userEmail: this.props.User.email,
            userEx: this.props.User.exercises

        })
    }
    Logout(e) {
        e.preventDefault()
        this.props.SignOut()
    }
    Delete(data) {
        let exid = data
        let email = this.props.User.email;
        let sent = { email, exid }
        console.log(sent, 'req in delete() in UserHome')
        let url = 'http://localhost:8000/deleteEx'
        axios.delete(url, { data: sent })
            .then(res => {
                console.log(res, 'res from delete() in UserHome')
                this.ExChange(res.data.exercises)
            }).catch(err => console.log(err, 'err from delete() in UserHome'))
    }
    OpenEdit(data) {
        console.log(data)
        document.getElementById('openAddBtn').style.display = 'none'
        $('#editExBox').slideToggle('slow')
        $('#addExForm').slideUp('slow')

        this.setState({
            editExid: data
        })

    }
    Edit(e) {
        e.preventDefault()
        console.log(this.state.editExid, 'editExid')
        $('#editExForm').slideUp('slow');
        let date = document.getElementById('editExDate').value;
        let type = document.getElementById('editExType').value;
        let sets = document.getElementById('editExSets').value;
        let reps = document.getElementById('editExReps').value;
        let time = document.getElementById('editExTime').value;
        let exid = this.state.editExid
        sets = sets / 1;
        reps = reps / 1;
        let exercise = {
            date: date,
            exercise: type,
            sets: sets,
            reps: reps,
            durration: time,
            exid: exid
        }
        let email = this.state.userEmail;
        let data = { email, exercise };
        let url = 'http://localhost:8000/editEx';
        axios.put(url, data)
            .then(res => {
                console.log(res.data.exercises, 'res.data.ex from editEx() in UserHome')
                this.ExChange(res.data.exercises)
            }).catch(err => { console.log(err, 'err from editEx() in UserHome') })

    }
    ExChange(data) {
        this.setState({
            userEx: data
        })
    }
    OpenAdd() {
        document.getElementById('openAddBtn').style.display = 'none'
        $('#addExForm').slideToggle('slow');
        $('#editExBox').slideUp('slow')


    }
    AddEx(e) {
        e.preventDefault()
        $('#addExForm').slideUp('slow');
        let date = document.getElementById('addExDate').value;
        let type = document.getElementById('addExType').value;
        let sets = document.getElementById('addExSets').value;
        let reps = document.getElementById('addExReps').value;
        let time = document.getElementById('addExTime').value;
        let exid = this.state.userEx.length + 1
        sets = sets / 1;
        reps = reps / 1;
        let exercise = {
            date: date,
            exercise: type,
            sets: sets,
            reps: reps,
            durration: time,
            exid: exid
        }
        let email = this.state.userEmail;
        let data = { email, exercise };
        let url = 'http://localhost:8000/addEx';
        console.log(data, 'data im sending from addEx() in UserHome')
        axios.put(url, data)
            .then(res => {
                console.log(res.data.exercises, 'res.data.ex from addEx() in UserHome')
                this.ExChange(res.data.exercises)
            }).catch(err => { console.log(err, 'err from addEx() in UserHome') })
    }


    render() {
        console.log(this.props.User, 'from UserHome')
        const userExercises = this.props.User
            ? this.state.userEx.map((ex) => {
                return <tr>
                    <td onClick={() => this.OpenEdit(ex.exid)} id='penIcon'><i className='fas fa-edit'></i></td>
                    <td>{ex.date}</td>
                    <td>{ex.exercise}</td>
                    <td>{ex.sets}</td>
                    <td>{ex.reps}</td>
                    <td>{ex.durration}</td>
                    <td onClick={() => this.OpenAdd(ex.exid)} id='plusSign'><i className='fas fa-plus-square'></i></td>
                    <td onClick={() => this.Delete(ex.exid)} id='xIcon'><i className='fas fa-minus-square' ></i></td>


                </tr>

            })
            : null
        return (
            <>
                <span className='row' id='welcome'>
                    <h1 className='col-5' >Hello! {this.props.User.name}</h1>
                    <div className='col-5'></div>
                    <Link id='logout' to='/' onClick={this.Logout}>LOGOUT</Link>
                </span>
                <div className='col-9' id='EXcontainer'>
                    <table>
                        <tr>
                            <th>Edit</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Time</th>
                            <th>Add</th>
                            <th>Delete</th>
                        </tr>
                        {userExercises}
                    </table>
                </div>
                <div>
                    <div id='editExBox'>
                        <span className='row'>
                            <form className='row col-12'>
                                <div className='col-1'></div>
                                <input type='date' className='col-1 form-control input' id='editExDate'></input>
                                <input placeholder='TYPE' type='text' className='col-2 form-control input' id='editExType'></input>
                                <input placeholder='SETS' type='number' className='col-2 form-control input' id='editExSets'></input>
                                <input placeholder='REPS' type='number' className='col-2 form-control input' id='editExReps'></input>
                                <input placeholder='TIME' type='text' className='col-2 form-control input' id='editExTime'></input>
                                <button className='BTN' onClick={this.Edit}>EDIT EX</button>
                            </form>

                        </span>
                    </div>
                    <button className='BTN' id='openAddBtn' onClick={this.OpenAdd}>ADD EX</button>
                    <div id='addExForm'>
                        <span className='row'>
                            <form className='row col-12'>
                                <div className='col-1'></div>
                                <input type='date' className='col-1 form-control input' id='addExDate'></input>
                                <input placeholder='TYPE' type='text' className='col-2 form-control input' id='addExType'></input>
                                <input placeholder='SETS' type='number' className='col-2 form-control input' id='addExSets'></input>
                                <input placeholder='REPS' type='number' className='col-2 form-control input' id='addExReps'></input>
                                <input placeholder='TIME' type='text' className='col-2 form-control input' id='addExTime'></input>
                                <button className='BTN' id='addExBtn' onClick={this.AddEx}>ADD EX</button>
                            </form>
                        </span>
                    </div>
                </div>
            </>
        )
    }
}
export default UserHome