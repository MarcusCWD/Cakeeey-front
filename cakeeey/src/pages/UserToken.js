import jwt_decode from "jwt-decode";
import TokenContext from "./TokenContext";
import React from "react";
import axios from "axios";

export default class UserToken extends React.Component {
    state = {
        user: "",
        order: [],
    };
    // everytime a user refreshes his page, componenetDidMount will run
    // his browser will already have stored both access and refresh token
    // so we will just check if old token still valid 
    async componentDidMount() {
        console.log("Component did mount in context");
        // retrive the localstore accesstoken
        let token = localStorage.getItem("accessToken");
        // check if the token even exist or not
        if (token) {
            let tokenExpiry = jwt_decode(token).exp;
            let currentUnixTime = Math.round(new Date().getTime() / 1000);
            // compare the current time to token time
            if (currentUnixTime >= tokenExpiry) {
                console.log("Access token has expired. Getting a new token now.");
                // Token has expired, need to refresh
                const refreshToken = localStorage.getItem("refreshToken");
                let refreshResponse = await axios.post("https://cakeeey.herokuapp.com/api/user/refresh", {
                    refreshToken: refreshToken,
                });
                localStorage.setItem("accessToken", refreshResponse.data.accessToken);
                token = refreshResponse.data.accessToken;
            }
            let response = await axios.get("https://cakeeey.herokuapp.com/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.setState({
                user: response.data,
            });
        }
    }

    render = () => {

        const context = {
            user: this.state.user,
            order: this.state.order,
            // updateuser is used everytime we need to validate user auentication (not using refresh of browser)
            updateUser: () => {
                const internalFunction = async () => {
                    console.log("Calling update user");
                    let token = localStorage.getItem("accessToken");
                    
                    if (token) {
                        let tokenExpiry = jwt_decode(token).exp;
                        let currentUnixTime = Math.round(new Date().getTime() / 1000);
                        if (currentUnixTime >= tokenExpiry) {
                            console.log("Access token has expired. Getting a new token now.");
                            // Token has expired, need to refresh
                            const refreshToken = localStorage.getItem("refreshToken");
                            let refreshResponse = await axios.post("https://cakeeey.herokuapp.com/api/user/refresh", {
                                refreshToken: refreshToken,
                            });
                            localStorage.setItem("accessToken", refreshResponse.data.accessToken);
                            token = refreshResponse.data.accessToken;
                        }
                        let response = await axios.get("https://cakeeey.herokuapp.com/api/user/profile", {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        this.setState({
                            user: response.data,
                        });
                        
                    }
                }

                return internalFunction()
            },
            logoutUser: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                this.setState({
                    user: "",
                });
            },
            retriveOrder: () =>{
                const internalFunction = async () => {
                    console.log("Calling retrive orders");
                    let response = await axios.get("https://cakeeey.herokuapp.com/api/order/"+ this.state.user.id +"/user")
                    this.setState({
                        order: response.data
                    })
                }
                internalFunction()

            }
        };
        return <TokenContext.Provider value={context}>{this.props.children}</TokenContext.Provider>;
    };
}