
import { User } from "./user.js";
import { Subscriber } from "./subscriber.js";


function onEvent(event, selector, callback){
    return selector.addEventListener(event, callback);
}

function select(selector){
    return document.querySelector(selector);
}

function create(element){
    return document.createElement(element);
}

const addImg = select('.addImg');
const fileInput = select('#fileInput');
addImg.addEventListener('click', ()=>{
    fileInput.click();
})

let imgData = null;
fileInput.addEventListener('change', function (event) {
    const filename = select('.fileName');
    filename.innerText = event.target.files[0].name;
    const reader = new FileReader();

    reader.onload = function (e) {
        imgData = e.target.result;
    }
});

const btnPost = select('#post');
onEvent('click', btnPost, publishPost);
const txtPostMsg = select('#postMsg');
const postList = select('.postList');
const fileName = select('.fileName');
txtPostMsg.value = '';
fileName.innerText = '';
function publishPost(){
    if(txtPostMsg.value.trim().length == 0 && imgData == null){
        return;
    }
    let newPostMsgHTML = '<div>';
    newPostMsgHTML += '<div class="postTitle">';
    newPostMsgHTML += '<div class="subPostTitle">';
    newPostMsgHTML += '<div class="userInfo"></div>';
    newPostMsgHTML += '<p>Ken Liu</p>';
    newPostMsgHTML += '</div>';
    newPostMsgHTML += `<p>${formatDate(new Date())}</p>`;
    newPostMsgHTML += '</div>';
    newPostMsgHTML += '<div class="postContent">';
    newPostMsgHTML += `<p>${txtPostMsg.value.trim()}</p>`;
    newPostMsgHTML += '<div id="postPic"></div>';
    newPostMsgHTML += '</div>';
    newPostMsgHTML += '</div>';
    const newDiv = create('div');
    newDiv.innerHTML = newPostMsgHTML;
    console.log(imgData);
    if(imgData != null){
        const postPicElement = newDiv.querySelector('#postPic');
        postPicElement.classList.add('postPic');
        postPicElement.style.backgroundImage = 'url(imgData)';
        imgData = null;
    }
    postList.prepend(newDiv);
    txtPostMsg.value = '';
    fileName.innerText = '';
}

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

//show info
const userInfo = new User('123', 'Ken Liu', 'kenliu', 'ken@gmail.com');
const subscriber = new Subscriber('123', 'Ken Liu', 'kenliu', 'ken@gmail.com', 'page1024', 'Group 1', true)
const userInfoIcon = select('.userInfo');
onEvent('click', userInfoIcon, showInfo);
function showInfo(){
    const userInfo = userInfo.getInfo();
    let infoHTML = '<h2>User Info</h2>';
    infoHTML = `<p><span>User ID: </span>${userInfo.id}</p>`;
    infoHTML += `<p><span>Name</span>: ${userInfo.name}</p>`;
    infoHTML += `<p><span>UserName</span>: ${userInfo.userName}</p>`;
    infoHTML += `<p><span>Email</span>: ${userInfo.email}</p>`;
    infoHTML += '<h2>Subscriber Info</h2>';
    infoHTML += `<p><span>Pages: ${subscriber.page}</span></p>`;
    infoHTML += `<p><span>Groups: ${subscriber.groups}</span></p>`;
    infoHTML += `<p><span>Monetize: ${subscriber.canMonetize? 'Yes':'No'}</span></p>`;
    const infoDiv = create('div');
    infoDiv.classList.add('userInfoDiv');
    document.body.appendChild(infoDiv);
    infoDiv.addEventListener(()=>{
        document.body.removeChild(infoDiv);
    })
}