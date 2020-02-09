import React, {Component} from 'react';
import Axios from 'axios';
import PaginationControl from '../Pagination/PaginationControl';
import "./Users.css";

class Users extends Component{
	state = {
		page: 1,
		userData: [],
		isLoading: false
	}

	fetchData() {
		this.setState({
			isLoading: true
		})
		const {page} = this.state,
			   url = "https://reqres.in/api/users?page=";

		Axios.get(url + page)
			.then(res => {
				console.log(res.data.data);
				this.setState({
					userData: res.data.data,
					isLoading: false
				});

			});
	}

	paginationBtnClick = (e) => {
		this.setState({
			page: e.target.innerText,
			userData: []
		},() => {
			this.fetchData();
		});
		
	}

	componentDidMount() {
		if(!sessionStorage.isLoggedIn) {
			this.props.history.push('/login');	
		}
		this.fetchData();
	}

	userClickHandler = (userId) => {
		this.props.history.push( '/users/' + userId );
	}


	render(){
		const usersData = this.state.userData.map((user) => {
			return (
				<li key={user.id} onClick={() => this.userClickHandler(user.id)}>
					<h3>{user.first_name}{user.last_name}</h3>
				</li>
			)
		})

		if(this.state.isLoading) {
			return (
				<p>Loading .. </p>
			)
		}
		return(
			<div className="container dashboard-page">
				<h1>Dashboard</h1>
				<ul className="user-list">
					{usersData}
				</ul>
				<PaginationControl value="1" onClick={(e) => this.paginationBtnClick(e)}/>
				<PaginationControl value="2" onClick={(e) => this.paginationBtnClick(e)}/>
				
			</div>	
		);
	}
}

export default Users;	