const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
};

fetchData();

const showLatestPosts=(data)=>{
  
}