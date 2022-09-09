let postData = JSON.parse(localStorage.getItem("postData")) || [];

let clock = document.getElementById("clock");
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();

  let session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  let time = hh + ":" + mm + " " + session;
  clock.innerText = time;

  let t = setTimeout(function () {
    currentTime();
  }, 2000);
}
currentTime();

let sendMsg = document.getElementById("sendMsg");
let addMsg = document.getElementById("addMsg");
let sendMsgHtml = `<div id="addMsg1" class="rounded-xl">
<div id="msgnames" class="mt-3">
  <p
    id="msg"
    class="ml-10 text-[#2067b0] font-semibold text-[14px] mt-1"
  >
    MESSAGE
  </p>
  <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
    TASK
  </p>
  <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
    EVENT
  </p>
  <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
    POLL
  </p>
  <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
    MORE
  </p>
</div>
<textarea
  style="height: 190px; border: none; outline: 0; margin: 20px"
  id="userText"
>
</textarea>
<div class="likes flex flex-row mt-[10px] ml-[30px]">
  <!-- on hover change color -->
  <p
    class="font-light text-[14px] text-[gray] cursor-pointer hover:text-[black]"
  >
    File
  </p>
  <p
    class="ml-[20px] font-light text-[14px] text-[gray] cursor-pointer hover:text-[black]"
    id="video"
    >
    Video
  </p>
  <p
  class="ml-[20px] font-light text-[14px] text-[gray] cursor-pointer hover:text-[black]"
>
  New Document
</p>
  <p
    class="ml-[20px] font-light text-[14px] text-[gray] cursor-pointer hover:text-[black]"
  >
    Mention
  </p>
  <p
    class="ml-[20px] font-light text-[14px] text-[gray] cursor-pointer hover:text-[black]"
  >
    Quote
  </p>
</div>
<div id="ytInp" class="w-full mt-3 mb-3"> </div>
<div class="ml-[30px] mt-3 mb-4" >
  <button class="bg-[#2fc7f7] text-[#fff] py-3 px-6 text-[14px]" id="sendBtn" onclick="onClickBtn()">
    SEND
  </button>
  <button class="bg-[#fff] text-[#000] py-3 px-6 text-[14px]" id="cancelBtn" onclick="prev()">
    CANCEL
  </button>
</div>
</div>`;
let addExM = document.getElementById("addExM");
sendMsg.onclick = function () {
  addMsg.innerHTML = sendMsgHtml;
  // let sendBtn = document.getElementById("sendBtn");

  addExM.style.marginTop = 250 + "px";
  let videoInpt = ` <input
  id="ytLink"
  type="text"
  placeholder="Enter YouTube Link"
  class="w-[700px] ml-[20px] p-[5px] rounded-xl"
/>`;
  let video = document.getElementById("video");
  let ytInp = document.getElementById("ytInp");
  video.onclick = function () {
    ytInp.innerHTML = videoInpt;
  };
};

function showPost() {
  let addExM = document.getElementById("postaddi");

  let getdata = async () => {
    try {
      let res = await fetch("http://localhost:3000/posts");
      data = await res.json();

      console.log(data, "josn");
      data.forEach((el) => {
        let postHtml = `
        <div
                class="w-[746px] bg-[#fff] h-[auto] mt-5 mb-[50px] rounded-xl rounded-xl"
              >
                <div class="flex flex-row">
                  <img
                    class="ml-[20px] pt-[20px]"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAD0ElEQVRoge3aPYxVRRjG8R8srCiaoOtuJIsS/KTUSjQUflAbkMKPykQFE1wlMeJHLIw2xrhCbayJ2tkYY4ONumhELUwwojZqkJWCZUlY2d1rMfcmcDnn3HNn5ly2uP9kmj33zPM+55yZfd+ZYciQIUOGrFxWNdz/TXgI92IrbsUYrm1fn8dp/I7jmMERnGw4rqyM4QV8h1Zk+xZT7b5WLJtwCOfEG+1u8ziIyQH66MlavIiz8hntbufwJq4akKdS7sKPmjPa3X7AnQNxVsBuzb7VsjaHXQPwdwlP4UJi4CltEc817rLN3gEYqtumGvZqt/B0r7TRi9/0zqbM3o4zK8BkdzsrJDVZGZU+G8/gGeHBrcc1eBhHM5g+Jvx7zMarCcEsCZlXWRo7ii+wnKDRwsu5zE4KGU9sIK/V1NkkGE/5tDemGO1wKCGI41jTh9Z1+CtBbzraZZsxabnxgQjNdxL05vUoOFb3EH9SmFxi+TLink8T9NbjiYT7k0q8FjZEaE4mah6N0ESYAFJnzn7Gb4fRRM1lTJR1XvVJPyB9RSSmgL8+UXMVHiy7WGV4W6Iw3Dege7opjb3KcI507ZaIezZn0I2K/TdpY6mF8QjdiQy6v5Z1XvWGY2bYbm4e0D3dRM0DC9Kf9GGs60NzHT7KoHv+Shlu4ZU+NFOKlGTDpzOJ/4yRGnoj7d/m0JyNMXwik3gL+2vo7c+oVzppVfF5xgAWsKNCa4d8Q6iFz8qEqmbpXyqu9csotldc397+TS5KY68yPJMxgEHzTdmFKsNHhM8jF1Xj6kRGnZa4shRhFy91PC0JKxFVhchqYdNsKYNe6dutw1Sk6LKwD/SW/vLarXhb2grpvkivCOVdPwt4J/G6PAXAZryBf/rQ77nEU4eDNcU+kCf/7mYDPqwZw3s5BOss076bQ6gH0z1imBOOWGThQIXQMfVSx1RG8FNFHC/lFFsrGCsSamwzq4BHS2L4Xs2tll7LtB0u4HFhdb+b/2r2kYOFgr/N4TEhxuzscvl26Xk83YRYF3tdnm8v4pGmhfco/qwO48YG9MbxSYHeMp5tQK+QPYo3xk8JZV6O0zZXCxPRvwU6iwZotsNOYfwUve0/hWNGWyL6vU3Itv4u6fuMhM84daH9DnyMe0qud1LMr/C1UCTMCm+NMATG2/3cL5SJd1fEdUyYoHIWG32zRjiYVva2c7TOwbScNXMyG/G+tM3zotx4WsYMqgnG8LywgBCzGbcslHj7cEPu4Jo+PjwhbGxtE0q/LcKYvfj48Cz+cOnx4VMNxzVkyJAhQ1Yk/wPpCQGDQkClsAAAAABJRU5ErkJggg=="
                  />
                  <div class="flex flex-col">
                    <p class="text-[#2067b0] font-bold mt-[28px] ml-[10px]">
                      User Name
                    </p>
                    <p class="text-[gray] font-light text-[12px] ml-[10px]">
                      3 September 12:48 pm
                    </p>
                    <!-- <p class="font-bold p-2">Welcome to Bitrix24!</p> -->
                  </div>
                </div>
               
                <div class="flex flex-col ml-[83px] mt-[20px]">
                  <iframe
                    width="630"
                    height="380"
                    src="https://www.youtube.com/embed/${el.ytLink}"
                  >
                  </iframe>
                  <p class="pr-[20px] mt-[20px] text-[15px] font-light mb-9">
                   ${el.userText}
                  </p>
                  <div id="border-bottom"></div>
                  <div class="likes flex flex-row mt-[20px]">
                    <p id="likeBtn" class="font-light text-[14px] text-[gray] cursor-pointer">
                      Like
                    </p>
                    <p
                      class="ml-[10px] font-light text-[14px] text-[gray] cursor-pointer"
                    >
                      Comment
                    </p>
                    <p
                      class="ml-[10px] font-light text-[14px] text-[gray] cursor-pointer"
                    >
                      Unfollow
                    </p>
                    <p
                      class="ml-[10px] font-light text-[14px] text-[gray] cursor-pointer"
                    >
                      More
                    </p>
                  </div>
                  <div class="comment-box flex flex-row mb-[20px]">
                    <img
                      class="ml-[5px] pt-[20px]"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACeElEQVRYhe3Yu2sUQQDH8U80YowaBRWjNiqeiI9EK2sDCpJaOwVBrawtRAQbhZBOEBTzT2i00sRGExvfj0Z8omKiIKjE+CAWeweXvb1jZveCCPnBVDvzne/uzszOLLOZzb9NS4G2HehFD7qxFkvL177gFe5jCFfxtUBfUdmIAXzHVGD5jksozaTYAvTjV4RYuvxEH9qaLVfCowJi6TKCVc2S24GxJspVylt0FZUrzZBctWRnXrkF4l7rS8lsvYmJiHYjmJ9HsD+wgzHsTbXdIHk6oZKnY+U2Cputv7GzDqMFxwIFv4p81QOB4MEA1nAg63yoXIfwRfhUAO94IOsbFqUbz8kA9qI98GZeB9T5EMhaWO57WrIEewKBsCKgzsoIXk3fWYLdEcBNTapTt+8swXURwLsBde5F8Gr6zhLsiADuxrwG1+dhTwRvSUilSXGfqwMNWAcjWT9CBMcjoY9lz/p2PIlkfQwRvBMJncK5DM65HJyRNCRrDD4IuYtUspaSmOWlbt9ZgkM5wDV3jtEcnBshlRYL+9RN4DL2NWDtxxVh26/MT129XGoAeocj4pajDhzF+wbcixE8JckBJw15iGUxoFSWS2Z9mjuJ9bGwvhTkD7YUkKtka5lVzT6bB9QmGfwVyFO0NkGwFc+quLfk3PKTHA2rt+7XsbqA3BrJKlHhvVHg0FRJl+mS4ziEuRGMVhzGp5TctqJylXSa/rqn8BwnsFn2P54WyZg9iReptrc14cmlM19y+vqmdhZ+kizMg+Uyis8Z9SZxRoExF5JOyQEnS7TRInxBjqWkyO+3RZIzxC5sl2w2q3+/vZRsVodxrSw5m9n8d/kL+vqsO8eROt0AAAAASUVORK5CYII="
                    />
                    <div class="mt-6 ml-[10px] mr-[30px] comment-input border">
                      <input id="commentEtr" class="ml-3 mt-[2px] font-light text-[13px]" placeholder="Add Comment" style=" border: none; outline: 0">
                        
                      </input>
                      <p id="add-comment" class="pl-[350px] mt-2 cursor-pointer" >Add</p>
                    </div>
                    
                  </div>
                  
                  <div id="addCommentIdx"></div>
                  
                </div>
              </div>`;

        addExM.innerHTML += postHtml;
        let likeBtn = document.getElementById("likeBtn");
        let addCommentIdx = document.getElementById("addCommentIdx");

        let add_comment = document.getElementById("add-comment");

        function addHtmlToComment() {
          let commentEtr = document.getElementById("commentEtr").value;
          console.log("first");
          let add_comment_html = `<div
            class="h-[80px] w-[600px]  ml-12 flex flex-row   rounded-b-xl"
          >
          <img
          class="ml-[5px] py-[20px]"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACeElEQVRYhe3Yu2sUQQDH8U80YowaBRWjNiqeiI9EK2sDCpJaOwVBrawtRAQbhZBOEBTzT2i00sRGExvfj0Z8omKiIKjE+CAWeweXvb1jZveCCPnBVDvzne/uzszOLLOZzb9NS4G2HehFD7qxFkvL177gFe5jCFfxtUBfUdmIAXzHVGD5jksozaTYAvTjV4RYuvxEH9qaLVfCowJi6TKCVc2S24GxJspVylt0FZUrzZBctWRnXrkF4l7rS8lsvYmJiHYjmJ9HsD+wgzHsTbXdIHk6oZKnY+U2Cputv7GzDqMFxwIFv4p81QOB4MEA1nAg63yoXIfwRfhUAO94IOsbFqUbz8kA9qI98GZeB9T5EMhaWO57WrIEewKBsCKgzsoIXk3fWYLdEcBNTapTt+8swXURwLsBde5F8Gr6zhLsiADuxrwG1+dhTwRvSUilSXGfqwMNWAcjWT9CBMcjoY9lz/p2PIlkfQwRvBMJncK5DM65HJyRNCRrDD4IuYtUspaSmOWlbt9ZgkM5wDV3jtEcnBshlRYL+9RN4DL2NWDtxxVh26/MT129XGoAeocj4pajDhzF+wbcixE8JckBJw15iGUxoFSWS2Z9mjuJ9bGwvhTkD7YUkKtka5lVzT6bB9QmGfwVyFO0NkGwFc+quLfk3PKTHA2rt+7XsbqA3BrJKlHhvVHg0FRJl+mS4ziEuRGMVhzGp5TctqJylXSa/rqn8BwnsFn2P54WyZg9iReptrc14cmlM19y+vqmdhZ+kizMg+Uyis8Z9SZxRoExF5JOyQEnS7TRInxBjqWkyO+3RZIzxC5sl2w2q3+/vZRsVodxrSw5m9n8d/kL+vqsO8eROt0AAAAASUVORK5CYII="
        />
            <div class="flex flex-col mt-2">
              <p
                class="text-[#2067b0] font-bold text-[14px] mt-[10px] ml-[1px]"
              >
               User Name
              </p>
              <p class="text-[black] font-light text-[14px] ml-[5px]">
                ${commentEtr}
              </p>
              <!-- <p class="font-bold p-2">Welcome to Bitrix24!</p> -->
            </div>
          </div>`;

          addCommentIdx.innerHTML = add_comment_html;
        }
        add_comment.addEventListener("click", addHtmlToComment);

        function likeBtnf() {
          likeBtn.innerHTML = `Like ${1}`;
          likeBtn.style.color = "Black";
        }
        likeBtn.addEventListener("click", likeBtnf);
      });
    } catch (error) {}
  };
  getdata();
  addExM.innerHTML = "";
}

showPost();

function onClickBtn() {
  let data = {};
  let ytLink = document.getElementById("ytLink").value;
  let userText = document.getElementById("userText").value;
  let YTR = ytLink.split("https://www.youtube.com/watch?v=").join("");
  let setData = async () => {
    try {
      let res = await fetch("http://localhost:3000/posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ytLink: YTR, userText: userText }),
      });
      // let data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  setData();

  console.log(YTR, "ytr");

  data.ytLink = YTR;
  data.userText = userText;

  postData.push(data);
  localStorage.setItem("postData", JSON.stringify(postData));
  console.log(localStorage.getItem("postData"), "ls");
  console.log(postData);
  showPost();
  // console.log(userText);
}

function prev() {
  addMsg.innerHTML = ` <div id="addMsg" class="rounded-xl">
  <div id="msgnames" class="mt-2">
    <p
      id="msg"
      class="ml-10 text-[#2067b0] font-semibold text-[14px] mt-1"
    >
      MESSAGE
    </p>
    <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
      TASK
    </p>
    <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
      EVENT
    </p>
    <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
      POLL
    </p>
    <p class="ml-14 text-[gray] font-semibold text-[14px] mt-1">
      MORE
    </p>
  </div>
  <p
    class="mt-[20px] ml-[30px] text-[20px] font-light text-[gray]"
    id="sendMsg"
  >
    Send message …
  </p>
</div>
`;
  sendMsg = document.getElementById("sendMsg");
  addMsg = document.getElementById("addMsg");
  sendMsg.onclick = function () {
    addMsg.innerHTML = sendMsgHtml;
    addExM.style.marginTop = 260 + "px";
    let videoInpt = `<input
    type="text"
    placeholder="Enter YouTube Link"
    class="w-[700px] ml-[20px] p-[5px] rounded-xl"
  />`;
    let video = document.getElementById("video");
    let ytInp = document.getElementById("ytInp");
    video.onclick = function () {
      ytInp.innerHTML = videoInpt;
    };
  };

  addExM.style.marginTop = 10 + "px";
}
