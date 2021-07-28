import React from "react";
import { Route } from "react-router-dom";
import MyPage from "./Main/MyPage";
import News from "./Main/News";
import Messages from "./Main/Messages";
import MyFriends from "./Main/MyFriends";
import Groups from "./Main/Groups";
import Photos from "./Main/Photos";
import Music from "./Main/Music";
import Videos from "./Main/Videos";



const Main = () => {
    return (
        <div className="main-content">
            <Route exact path="/user_profile" component={MyPage} />
            <Route exact path="/"             component={News} />
            <Route exact path="/Messenger"    component={Messages} />
            <Route exact path="/Friends"      component={MyFriends} />
            <Route exact path="/Groups"       component={Groups} />
            <Route exact path="/Photos"       component={Photos} />
            <Route exact path="/Music"        component={Music} />
            <Route exact path="/Videos"       component={Videos} />
        </div>
    )
}

export default Main