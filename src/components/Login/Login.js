import React from "react";
import axios from "axios";
import "./Login.css";

class Login extends React.Component{
    constructor(){
        super()
        this.state= {
            user: {},
            loginError: false
        }
    }

    handleEmail = (event) =>{
        this.setState({
            user:{
                ...this.state.user,
                email:  event.target.value
            }
        })

    }

    handlePassword = (event) =>{
        this.setState({
            user:{
                ...this.state.user,
                password:  event.target.value
            }
        })
    }

    login = (event)=>{
        console.log("called login", this.state.user)
        axios({
            url:"https://reqres.in/api/login",
            data: this.state.user,
            method: "post"
        }).then((response)=>{
            if(response.data.token){
                sessionStorage.isLoggedIn = true;
                this.props.history.push('/users');
            }else {
                console.log("invalid login");
            }
            
        },(error) => {
            this.setState({
                loginError: true
            })
            console.log("response error login", error)
        })

    }

    render(){
        let errorField=null;
        if(this.state.loginError) {
            errorField = <p className="error">Login Failed !!</p>
        }
        return(
        <div className="container login-container">
            <h1>Sign In</h1>
            <div className="login-email">
                <label htmlFor="email" className="placeholder"> Enter Email</label>
                <input type="text" onChange={this.handleEmail} id="email" placeholder="Email"  className="form-control" />
            </div>
            <div className="login-pwd">
                <label htmlFor="password" className="placeholder">Enter Password</label>
                <input type="password" onChange={this.handlePassword} id="password" placeholder="Password" className="form-control" />
                {errorField}
            </div>
            <div className="submit-btn">
                <button onClick={this.login} type="button">Login</button>
            </div>
        </div>
        )
    }
}

export default Login;