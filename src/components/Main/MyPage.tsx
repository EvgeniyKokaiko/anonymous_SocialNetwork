import React, {useMemo, useState} from "react";
import {userInfo} from "../../interfaces/interface";


const MyPage = () => {


    const User: userInfo = {
        userphoto: "https://sun6-21.userapi.com/s/v1/ig2/k0PzyoIMKN4XwcNOZ85ncawCKc7DMMoaBXrgoB8gnR000sWP1sQnWmnoLNwQsTP7mKQhragvDcBfJOz6Ldtu7V5p.jpg?size=200x0&quality=96&crop=0,0,768,1080&ava=1",
        name: "Evgeniy",
        about: "bark",
        surname: "Kokaiko",
        city: "Uzhgorod",
        country: "Ukraine",
        friends: 200,
        subscribers: 500,
        photos: 136,
        videos: 151,
        uid: 1,
        isAdmin: true,
        posts: [
        {id: 1,
        value: "Hello World",
        date:"Today"
    }
        ],
        friendList: []
    }

const InfoChanger = () => {
        return (
            <>
                <button className="ui inverted violet button">Change</button>
            </>
        )
}

    const AddPost = () => {
        const random = Math.random()
       // User.posts.push({id:random, value: postVal, date: DateParser()})
        const value = postVal === "" ? "Anonymous" : postVal
        setRerender([...rerender, {id:random, value: value, date: DateParser()}])
        console.log(rerender)
        console.log(User.posts)
    }



const RenderPosts = () => {
        User.posts = rerender
        console.log(User.posts)
       return User.posts.map(el => {
            return (
                <div key={el.id} className="ui comments">
                    <div className="comment">
                        <a className="avatar">
                            <img src={User.userphoto} />
                        </a>
                        <div className="content">
                            <a className="author">{User.name}{User.surname}</a>
                            <div className="metadata">
                                <div className="date">{el.date}</div>
                            </div>
                            <div className="text">
                                {el.value}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
}


const DateParser = () => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate: string = year + "/" + month + "/" + day;
    return newdate
}
const [rerender, setRerender] = useState(User.posts)


let [postVal, setPostVal] = useState("")


    return (
        <div className="profile_container">
            <div className="image_container">
                <div className="ui card">
                    <div className="image">
                        <img src={User.userphoto}/>
                    </div>
                </div>
            </div>
            <div className="user_information">
                <div className="ui segment black">
                    <h2>{User.name} {User.surname}</h2>
                    <h3>Thinks: {User.about}</h3>
                    <h3>{InfoChanger()}</h3>
                <hr/>
                <h4>My city: {User.city}</h4>
                    <h4>My country: {User.country}</h4>
                    <div className="ui buttons">
                        <button className="ui button">Friends: {User.friends}</button>
                        <button className="ui button">Subscribers: {User.subscribers}</button>
                        <button className="ui button">Photos: {User.photos}</button>
                        <button className="ui button">Videos: {User.videos}</button>
                    </div>
                </div>
            </div>
            <div className="user_photos">
            <div className="ui segment">

            </div>
            </div>

            <div className="user_posts">
            <div className="ui segment">
                <div className="ui icon input post_input">
                    <input type="text" value={postVal} onChange={(e) => {setPostVal(e.target.value)}} placeholder="Write something..." />
                        <i className="circular plus link icon" onClick={AddPost} />
                </div>
                {RenderPosts()}
            </div>

            </div>

            <div className="user_friends">
                <div className="ui segment">

            </div>
            </div>
        </div>
    )
}


export default MyPage