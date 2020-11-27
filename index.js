
const profile_pic = document.getElementById('profile_pic');
const my_name = document.getElementById('name');
const username = document.getElementById('username');
const status_pic = document.getElementById('status_pic');
const status_msg = document.getElementById('status_msg');
const bio = document.getElementById('bio');
const followers_num = document.getElementById('followers_num');
const following_num = document.getElementById('following_num');
const starred_num = document.getElementById('starred_num');
const twitter_username = document.getElementById('twitter_username');
const repo_list = document.getElementById('repo_list');
let my_data;
let my_data2;

const github_data = {
    "token": "fe59c836297ccb8ecffcacc0061ca80204f2c4e1",
    "username": "miriam-samuels",
};

const repos = {
    "query": `
    query{
      user(login: "${github_data['username']}"){
        repositories(first:13, orderBy:{field:CREATED_AT direction:ASC}){
          totalCount
          nodes {
            name
            description
            updatedAt
            forkCount
            stargazerCount
            languages(first:1){
              nodes{
                name
                color
                }
              }
            }
          }
        }
    }
    `
};


const base_url = "https://api.github.com/graphql";
const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + github_data["token"]
}

fetch(base_url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(repos)
})
    .then(res => res.json())
    .then((json) => {
        data_1(json.data.user.repositories);
        // console.log(json.data.user.repositories.nodes);
    })
    .catch(err => console.log(JSON.stringify(err)));


function data_1(one) {
    my_data = one;
    let check = true;
    // console.log(my_data);
    const repo = my_data.nodes;
    repo.map(item => {
        console.log(item.updatedAt)
        let div = document.createElement('div');
        div.className = "repo";
        repo_list.appendChild(div);
        let h3 = document.createElement('h3');
        h3.className = "repo_title";
        h3.innerHTML = item.name;
        div.appendChild(h3);
        let p = document.createElement('p');
        p.className = "repo_description";
        p.innerHTML = item.description;
        div.append(p);
        let b = document.createElement('b');
        b.className = "repo_color";
        b.style.backgroundColor = item.languages.nodes.map(im => im.color);
        div.append(b);
        let span = document.createElement('span');
        span.className = "repo_language";
        span.innerHTML = item.languages.nodes.map(im => im.name);
        div.append(span);
        let span1 = document.createElement('span');
        span1.className = "fork_count";
        span1.innerHTML = item.forkCount;
        div.append(span1);
        let span2 = document.createElement('span');
        span2.className = "time_updated";
        span2.innerHTML = item.updatedAt;
        div.append(span2);
        let button = document.createElement('button');
        button.className = "time_updated";
        button.innerHTML = "&#9734; Star";
        button.addEventListener('click', () => {
            if (check === false) {
                button.innerHTML = "&#9734; Star";
                check = true

            } else {
                button.innerHTML = "&#9733; Unstar"
                check = false
            }
        })
        div.append(button);
    })

}

const profile = {
    query: `
      query{
        user(login: "${github_data['username']}"){
          avatarUrl
          status{
            emojiHTML
            message
          }
          name
          login
          bio
          twitterUsername
          followers{
            totalCount
          }
          following{
            totalCount
          }
          starredRepositories{
            totalCount
          }
        }
      } `
};


fetch(base_url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(profile)
})
    .then(res => res.json())
    .then(json => {
        data_2(json.data.user)
    })
    .catch(err => console.log(JSON.stringify(err)));

function data_2(two) {
    my_data2 = two;
    // console.log(my_data2);
    profile_pic.src = my_data2.avatarUrl;
    my_name.innerHTML = my_data2.name;
    username.innerHTML = my_data2.login;
    status_pic.innerHTML = my_data2.status.emojiHTML;
    status_msg.innerHTML = my_data2.status.message;
    bio.innerHTML = my_data2.bio;
    followers_num.innerHTML = my_data2.followers.totalCount;
    following_num.innerHTML = my_data2.following.totalCount;
    starred_num.innerHTML = my_data2.starredRepositories.totalCount;
    twitter_username.innerHTML = my_data2.twitterUsername
}
