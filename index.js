const form = document.getElementById("my-form");

const candiesList = document.getElementById("candies");
document.addEventListener("DOMContentLoaded", function () {
  renderUserList();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const ChooseCandy = document.getElementById("ChooseCandy").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  const candy = { ChooseCandy, description, price, quantity };

  let candies = JSON.parse(localStorage.getItem("candies")) || [];

  candies.push(candy);

  axios
    .post(
      "https://crudcrud.com/api/d86ea6272f924ccf99d5852893933460/appData",
      candy
    )
    .then((response) => {
      renderUserList(response.data);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>something went wrong</h4>";
      console.log(err);
    });

  document.getElementById("ChooseCandy").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";

  //renderUserList();
});

function renderUserList() {
  axios
    .get("https://crudcrud.com/api/d86ea6272f924ccf99d5852893933460/appData")
    .then((response) => {
      const candies = response.data;
      candiesList.innerHTML = "";
      candies.forEach(function (candy) {
        const li = document.createElement("li");
        li.appendChild(
          document.createTextNode(
            `${candy.ChooseCandy} - ${candy.description} - ${candy.price} - ${candy.quantity}`
          )
        );
        candiesList.appendChild(li);

        const buyOneButton = document.createElement("button");
        buyOneButton.innerHTML = "Buy One";
        buyOneButton.addEventListener("click", function () {
          if (candy.quantity > 0) {
            updateDetails(
              candy._id,
              candy.ChooseCandy,
              candy.description,
              candy.quantity - 1,
              candy.price
            );
          }
        });
        li.appendChild(buyOneButton);

        const buyTwoButton = document.createElement("button");
        buyTwoButton.innerHTML = "Buy Two";
        buyTwoButton.addEventListener("click", function () {
          updateDetails(
            candy._id,
            candy.ChooseCandy,
            candy.description,
            candy.quantity - 2,
            candy.price
          );
        });
        li.appendChild(buyTwoButton);

        const buyThreeButton = document.createElement("button");
        buyThreeButton.innerHTML = "Buy Three";
        buyThreeButton.addEventListener("click", function () {
          updateDetails(
            candy._id,
            candy.ChooseCandy,
            candy.description,
            candy.quantity - 3,
            candy.price
          );
        });
        li.appendChild(buyThreeButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
          deleteUser(candy._id, li);
        });
        li.appendChild(deleteButton);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
function deleteUser(id, li) {
  axios
    .delete(
      `https://crudcrud.com/api/d86ea6272f924ccf99d5852893933460/appData/${id}`
    )
    .then((response) => {
      li.remove();
    })
    .catch((error) => console.log(error));
}
function updateDetails(id, ChooseCandy, description, quantity, price) {
  axios
    .put(
      `https://crudcrud.com/api/d86ea6272f924ccf99d5852893933460/appData/${id}`,
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
