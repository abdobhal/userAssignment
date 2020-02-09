import React, {Component} from 'react';
import axios from 'axios';
import "./UserInfo.css";

class UserInfo extends Component{
	state = {
        loadedUser: null,
        isUserLoaded: false
    }

    componentDidMount () {
        if(!sessionStorage.isLoggedIn) {
            this.props.history.push('/login');  
        }
        this.loadData();
    }

    loadData () {
        const url = "https://reqres.in/api/users/";

        axios.get( url + this.props.match.params.userId )
        .then( response => {
            // console.log(response);
            this.setState( 
            	{ 
            		loadedUser: response.data.data,
            		isUserLoaded: true

            	} 
        	);
        });
    }

    render() {
    	let userData = "";
    	if(this.state.isUserLoaded){
    		userData = <p>Loading ...</p>
    	}
    	if(this.state.loadedUser){
    		userData = (
    			<div className="container user-section">
                    <img className="avatar-image" src={this.state.loadedUser.avatar} alt="img"/>
    				<h1 className="user-name">{this.state.loadedUser.first_name} {this.state.loadedUser.last_name}</h1>
    				<h4 className="email">{this.state.loadedUser.email}</h4>
    			</div>
    		)
    	}
    	return userData;
     }
	
}

export default UserInfo;