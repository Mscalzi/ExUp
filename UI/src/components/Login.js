import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import '../style/Login.css'

const DownArrow = <i id='DownArrow' className='fas fa-angle-double-down'></i>
const UpArrow = <i id='UpArrow' className='fas fa-angle-double-up'></i>
const welcomeStatement = `
    Hello fellow workout junkies THANK YOU for finding your way to our quick and easy to use exercise tracking application!
    Create a new account or sign in and keep a log all of your workouts for FREE! Go get your money fit family!
`

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInBtn: DownArrow,
            signUpBtn: DownArrow
        }
        this.toggleSignIn = this.toggleSignIn.bind(this)
        this.toggleSignUp = this.toggleSignUp.bind(this)
        this.Logon = this.Logon.bind(this)
        this.createNew = this.createNew.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
    }
    // makes sure our props come through
    componentDidMount() {
        console.log(this.props)
    }
    // shows our sign in and sign up boxes and changes the arrow icon
    toggleSignIn(e) {
        e.preventDefault()
        $('#SignIn').slideToggle('slow');
        $('#SignUp').slideUp('slow')
        if (this.state.signInBtn === DownArrow) {
            this.setState({
                signInBtn: UpArrow,
                signUpBtn: DownArrow
            })
        } else {
            this.setState({
                signInBtn: DownArrow
            })
        }
    }
    toggleSignUp(e) {
        e.preventDefault()
        $('#SignUp').slideToggle('slow')
        $('#SignIn').slideUp('slow')
        if (this.state.signUpBtn === DownArrow) {
            this.setState({
                signUpBtn: UpArrow,
                signInBtn: DownArrow
            })
        } else {
            this.setState({
                signUpBtn: DownArrow
            })
        }
    }
    checkPassword(e) {
        let cpsw = document.getElementById('pass2').value;
        let psw = document.getElementById('pass1').value;
        if (psw !== cpsw) {
            let pswVal = document.getElementById('pass1');
            let cpswVal = document.getElementById('pass2');
            pswVal.value = ''
            cpswVal.value = ''
            pswVal.style.border = '2px solid red'
            cpswVal.style.border = '2px solid red'
            alert('Passwords must match')
        }
    }
    createNew(e) {
        e.preventDefault()
        let userName = document.getElementById('signUpName').value;
        let userEmail = document.getElementById('signUpEmail').value;
        let userPassword = document.getElementById('pass1').value;
        let url = 'http://localhost:8000/newAccount';
        let user = {
            name: userName,
            email: userEmail,
            password: userPassword
        };
        console.log(user, 'from createNew() in Login')
        axios.post(url, user)
            .then(res => {
                console.log(res, 'from Login.js axios.post')
                if (res.data !== null) {
                    this.props.SignIn(res.data)
                }
            }).catch(err => console.log(err ,'err from createNew()'))
           
    }
    // takes user input and sense it to backend for validation
    Logon(e) {
        e.preventDefault()
        const email = document.getElementById('SignInEmail').value;
        const password = document.getElementById('SignInPassword').value;
        let url = `http://localhost:8000/login?email=${email}&password=${password}`
        axios.get(url)
            .then(res => {
                console.log(res.data, 'res from logon() axios get')
                if (res.data.response !== 'Password Incorrect') {
                    this.props.SignIn(res.data)
                } else {
                    console.log('FAILED in Logon() axios get')
                }
            }).catch(err => { console.log(err, 'err from logon() .catch') })
    }
    render() {
        return (
            <>
                <div className='container-fluid'>
                    <span id='topBar' className='row'>
                        <h2 id='logo'>X TrKr</h2>
                        <div className='col-4'></div>
                        <a id='link1' onClick={this.toggleSignIn} className='col-s-2 col-2'>{this.state.signInBtn}SIGN IN</a>
                        <a id='link2' onClick={this.toggleSignUp} className='col-s-2 col-2'>SIGN UP{this.state.signUpBtn}</a>
                    </span>
                    <div id='infoBox' className='col-12'>
                        <h1 id='infoHeader'>Welcome</h1>
                        <p id='infoText'>{welcomeStatement}</p>
                    </div>
    {/* section for sign in form */}
                    <div className='row'>
                        <div className='col-7'></div>
                        <div className='col-4' id='SignIn'>
                            <form>
                                <label><u>Email:</u></label>
                                <input type="email" className="form-control input" placeholder="Enter Email" id="SignInEmail" />
                                <label>Password:</label>
                                <input type="password" className="form-control input" placeholder="Enter Password" id="SignInPassword" />
                                <br />
                                <span className='row'>
                                    <div className='col-9'></div>
                                    <button onClick={this.Logon} className='headerBtn' id='signInBtn'><Redirect to={this.props.LoggedOn == true ? '/UserHome' : '/'} />SIGN IN</button>
                                </span>
                            </form>
                        </div>  
                    </div>
    {/* section for sign up form */}
                    <div className='row'>
                        <div className='col-7'></div>
                        <div className='col-4' id='SignUp'>
                            <form>
                                <label>Name:</label>
                                <input type='text' className='form-control input' placeholder='Enter Name' id='signUpName' />
                                <label>Email:</label>
                                <input type='email' className='form-control input' placeholder='Enter Email' id='signUpEmail' />
                                <label>Password:</label>
                                <input type='password' className='form-control input' placeholder='Enter Password' id='pass1' />
                                <label>Confirm Password:</label>
                                <input type='password' className="form-control input"  placeholder='Confirm Password' id='pass2' />
                                <br />
                                <span className='row'>
                                    <div className='col-9'></div>
                                    <button className='headerBtn' type='submit' id='signUpBtn' onClick={this.createNew} onMouseOver={this.checkPassword}>
                                    <Redirect to={this.props.LoggedOn == true ? '/UserHome' : '/'} />
                                    SIGN UP</button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login