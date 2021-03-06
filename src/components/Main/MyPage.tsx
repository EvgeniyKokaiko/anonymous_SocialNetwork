import React, {useContext, useEffect, useState} from "react";
import {Dispatcher, userInfo, userPosts} from "../../interfaces/interface";
import {connect} from "react-redux";
import {DeletePost, Login, MyAddPost, MyFriendList} from "../../redux/actions";
import {ChangeUserData} from "../../redux/actions";
import Context from "../Context/Context";
import { Link } from "react-router-dom";



interface IProps {
    SignReducer: userInfo
    ChangeUserData(login: string,about: string, city: string, country: string, userphoto: string):any
    MyAddPost(login: string, editValues: userPosts[]) : any
    DeletePost(login: string, posts: userPosts[], deletedPost: userPosts): any
    MyFriendList(friendId: string[]): any
    Login(login: string, password: string | undefined): any
    getFriendsReducer: userInfo[]

}

const MyPage = (props: IProps) => {
    const context = useContext(Context)
    const friends: userInfo[] = props.getFriendsReducer
    console.log(props)
    const [deletePost, setDeletePost] = useState(-1)
    const [isChange, setChange] = useState(false)
    let User: userInfo = props.SignReducer
    const [thinks, setThinks] = useState(User?.about);
    const [city, setCity] = useState(User?.city);
    const [country, setCountry] = useState(User?.country);
    const [photo, changePhoto] = useState(User?.userphoto);


    useEffect(() => {
        props.Login(User.id, User.password)
    }, [props.DeletePost, props.MyAddPost])

    useEffect(() => {
        getFriends()
    }, [props.SignReducer])

    const getFriends =  () => {
        if (User.friendList === undefined) {

        }
        props.MyFriendList(User.friendList)
    }

const InfoChanger = () => {
        return (
            <>
                <button onClick={ChangeData} className="ui inverted violet button">Change</button>
            </>
        )
}


const RenderFriends = () => {
        return friends.map<JSX.Element>(el => {
            return (
                <div className="friendList_miniature">
                <div key={el.id}  className="item">
                    <Link  to={`/user_profile/${el.id}`}>
                    <img
                        alt="fas"
                        className="friendList_photo"
                        src={el.userphoto}
                    />
                    </Link>
                    <div className="content">
                        <div className="header thumb_header">{el.name} {el.surname}</div>
                    </div>
                </div>
                </div>
            )
        })
}





const ChangeData = () => {
    setChange(prev=> !prev);

    if (isChange === true) {
        props.ChangeUserData(props.SignReducer.id, thinks, city, country, photo)
    }
}


    const AddPost = () => {
        const random = Math.random()
        const value = postVal === "" ? "Anonymous" : postVal
        setRerender([...rerender, {userphoto: User.userphoto,nameId: User.id, name: `${User.name} ${User.surname}`,id:random, value: value, date: DateParser()}])
       props.MyAddPost(props.SignReducer.id, [...User?.posts, {userphoto: User.userphoto,nameId: User.id, name: `${User.name} ${User.surname}`,id:random, value: value, date: DateParser()}])
        console.log(rerender)
        console.log(User.posts)
    }



const RenderPosts = () => {
        console.log(User.posts, context)
    if (rerender === undefined) {
        setRerender(context)
    }
       return User?.posts?.map((el, index) => {
            return (
                <div key={el.id} className="ui comments">
                    <div className="comment" onMouseEnter={() => setDeletePost(index)} onMouseLeave={() => setDeletePost(-1)}>
                        {index === deletePost ? <button onClick={() => props.DeletePost(User.id,User.posts, el)} className="ui right floated red button">Delete</button> : ""}
                        <span className="avatar">
                            <img className="avatar_img" src={el.userphoto} alt="UserPhoto" />
                        </span>
                        <div className="content">
                            <span className="author">{el.name}</span>
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

    return year + "/" + month + "/" + day
}
const [rerender, setRerender] = useState(User?.posts)


let [postVal, setPostVal] = useState("")


    return (
        <div className="profile_container">
            <div className="image_container">
                <div className="ui card">
                    <div className="image">
                        {isChange === false ? <img className="avatar_img" src={User?.userphoto} alt="UserPhoto"/> : <input onChange={e => changePhoto(e.target.value)} value={photo} type="text" placeholder="Change Photo"/>}
                    </div>
                </div>
            </div>
            <div className="user_information">
                <div className="ui segment black">
                    <h2>{User?.name} {User?.surname}</h2>
                    {isChange === false ? <h3>{User?.about}</h3>: <input onChange={e => setThinks(e.target.value)} value={thinks} type="text" placeholder="Change Thinks"/>}
                    <hr/>
                    <h3>{InfoChanger()}</h3>
                <hr/>
                    {isChange === false ?<h4>My city: {User?.city}</h4> : <input onChange={e => setCity(e.target.value)} value={city} type="text" placeholder="Change City"/>}
                    {isChange === false ? <h4>My country: {User?.country}</h4> : <input onChange={e => setCountry(e.target.value)} value={country} type="text" placeholder="Change Country"/>}
                    <div className="ui buttons flexible">
                        <Link to="/Friends" className="ui button">Friends: {User?.friends}</Link>
                        <Link to="/Friends" className="ui button">Subscribers: {User?.subscribers}</Link>
                        <button className="ui button">Photos: {User?.photos}</button>
                        <button className="ui button">Videos: {User?.videos}</button>
                    </div>
                </div>
            </div>
            <div className="user_photos">
            <div className="ui segment">

            </div>
            </div>

            <div className="my_user_posts">
            <div className="ui segment">
                <div className="ui icon input post_input">
                    <input type="text" value={postVal} onChange={(e) => {setPostVal(e.target.value)}} placeholder="Write something..." />
                        <i className="circular plus link icon" onClick={AddPost} />
                </div>
                {RenderPosts()}
            </div>

            </div>

            <div className="user_friends">
                    {RenderFriends()}
            </div>
        </div>
    )
}

const mapStateToProps = (state: object) => {
    return state
}


export default connect(mapStateToProps , {MyAddPost, ChangeUserData, Login, MyFriendList, DeletePost})(MyPage)