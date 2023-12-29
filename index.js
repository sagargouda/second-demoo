const form = document.getElementById("my-form");

const candiesList = document.getElementById("candies");
//?? render user list every time when browser starts
document.addEventListener("DOMContentLoaded", function () {
  renderUserList();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  //?? gett the vales from form inputs
  const ChooseCandy = document.getElementById("ChooseCandy").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  //?? storing inputs in form of an  object
  const candy = { ChooseCandy, description, price, quantity };

  //?? storing in crud crud typical backend stuf by sending it our candy object
  axios
    .post(
      "https://crudcrud.com/api/688270cf1b86490b834aa16e66c678c7/appData",
      candy
    )
    .then((response) => {
      //?? also showing the response in screen
      renderUserList(response.data);
      console.log(response);
    })
    .catch((err) => {
      //?? handling errors if endpoints expires
      document.body.innerHTML += "error hai bhai";
      console.log(err);
    });
  //?? clear form input values for new values
  document.getElementById("ChooseCandy").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
});
//?? this is where main thing happens
function renderUserList() {
  //?? fetching data from crud crud using get request
  axios
    .get("https://crudcrud.com/api/688270cf1b86490b834aa16e66c678c7/appData")
    .then((response) => {
      const candies = response.data;
      candiesList.innerHTML = "";
      //?? iterating over candies using a for each loop
      candies.forEach(function (candy) {
        //?? creating a i element
        const li = document.createElement("li");
        //?? appended a text node for it
        li.appendChild(
          document.createTextNode(
            `${candy.ChooseCandy} - ${candy.description} - ${candy.price} - ${candy.quantity}`
          )
        );
        //?? appending it to candies list which is an ul element
        candiesList.appendChild(li);
        //?? creating buy one element
        const buyOneButton = document.createElement("button");
        buyOneButton.innerHTML = "Buy One";
        buyOneButton.addEventListener("click", function () {
          if (candy.quantity > 0) {
            //?? we reduce a candy every time we order something
            updateDetails(
              candy._id,
              candy.ChooseCandy,
              candy.description,
              candy.quantity - 1,
              candy.price
            );
          }
        });
        if (candy.quantity > 0) {
          li.appendChild(buyOneButton);
        }

        const buyTwoButton = document.createElement("button");
        buyTwoButton.innerHTML = "Buy Two";
        buyTwoButton.addEventListener("click", function () {
          if (candy.quantity > 0) {
            updateDetails(
              candy._id,
              candy.ChooseCandy,
              candy.description,
              candy.quantity - 2,
              candy.price
            );
          }
        });
        if (candy.quantity > 0) {
          li.appendChild(buyTwoButton);
        }

        const buyThreeButton = document.createElement("button");
        buyThreeButton.innerHTML = "Buy Three";
        buyThreeButton.addEventListener("click", function () {
          if (candy.quantity > 0) {
            updateDetails(
              candy._id,
              candy.ChooseCandy,
              candy.description,
              candy.quantity - 3,
              candy.price
            );
          }
        });
        if (candy.quantity > 0) {
          li.appendChild(buyThreeButton);
        }

        //?? delete functionality
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
          //?? so candy._id so important
          deleteUser(candy._id, li);
        });
        li.appendChild(deleteButton);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
//?? main delktete fucntionality
function deleteUser(id, li) {
  axios
    .delete(
      `https://crudcrud.com/api/688270cf1b86490b834aa16e66c678c7/appData/${id}`
    )
    .then((response) => {
      li.remove();
    })
    .catch((error) => console.log(error));
}
//?? updating details
function updateDetails(id, ChooseCandy, description, quantity, price) {
  axios
    .put(
      `https://crudcrud.com/api/688270cf1b86490b834aa16e66c678c7/appData/${id}`,
      { ChooseCandy, description, price, quantity }
    )
    .then((response) => {
      console.log(response);
      renderUserList();
    })
    .catch((error) => {
      console.log(error);
    });
}
