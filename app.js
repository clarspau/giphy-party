console.log("Let's get this party started!");

const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const input = document.querySelector("#search");
const gifContainer = document.querySelector("#gif-container");
const removeBtn = document.querySelector("#remove");

// add and event listener when a keyword has been submitted
// use axios to make a request to giphy for info based on keyword submitted.

form.addEventListener('submit', async function (e) {
     e.preventDefault();

     let searchTerm = input.value;

     const res = await axios.get("https://api.giphy.com/v1/gifs/search",
          {
               params:
               {
                    q: searchTerm,
                    api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
               }
          });

     createGif(res.data);
     input.value = "";
})

function createGif(response) {
     let results = response.data.length;
     if (results) {
          let randomGif = Math.floor(Math.random() * results);
          let gifDiv = document.createElement('div');
          gifDiv.classList.add('col-4', 'p-1');
          let img = document.createElement('img');
          img.setAttribute('src', response.data[randomGif].images.original.url);
          img.classList.add('w-100', 'h-100');
          gifDiv.append(img);
          gifContainer.append(gifDiv);
     }
}

removeBtn.addEventListener('click', function (e) {
     gifContainer.innerHTML = '';
});