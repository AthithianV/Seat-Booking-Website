//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
// Use moviesList array for displaing the Name in the dropdown menu
const selectMovie = document.querySelector("#selectMovie");

moviesList.forEach((movie)=>{
  const movieSelectItem = document.createElement("option");
  movieSelectItem.classList.add("movieSelectItem");
  movieSelectItem.text = `${movie.movieName+" $"+movie.price}`;
  movieSelectItem.value = `${movie.movieName+" $ "+movie.price}`;
  selectMovie.appendChild(movieSelectItem);
});

selectMovie.onchange = function (){
  document.querySelector("#movieName").textContent = selectMovie.value.slice(0,-3);
  document.querySelector("#moviePrice").textContent = selectMovie.value.slice(-3);
  updatePrice();
};

//Add eventLister to each unoccupied seat
let seats = Array.from(document.querySelectorAll("#seatCont")[0].querySelectorAll(".seat"));
seats.forEach((seat)=>{
  seat.addEventListener('click', function (){
    seatFunction(seat);
  });
});

let noSelected = document.querySelector(".noSelected");
let noOfSeat = document.querySelector("#numberOfSeat");

function seatFunction(seat){
  if(!seat.classList.contains("occupied")){
    
    if(seat.classList.contains("selected")){
      seat.classList.remove("selected");
      
      noOfSeat.textContent = `${parseInt(noOfSeat.textContent)-1}`;
      
      const seatSelectedArr = Array.from(document.querySelectorAll(".selectedSeat"));
      seatSelectedArr.forEach((seatSelected)=>{
        if(seatSelected.textContent == seats.indexOf(seat)+1){
          seatSelected.remove();
        }
      });

      if(seatSelectedArr.length==1)
        document.querySelector(".selectedSeatsHolder").appendChild(noSelected);
    }
    else{
      seat.classList.add("selected");
      let selected = document.querySelectorAll("selectedSeatsHolder");
      
      if(noSelected)
        noSelected.remove();
      
      const selectedSeat = document.createElement("div");
      selectedSeat.textContent = `${parseInt(seats.indexOf(seat))+1}`;
      selectedSeat.classList.add("selectedSeat");
      document.querySelector("#selectedSeatsHolder").appendChild(selectedSeat);

      noOfSeat.textContent = `${parseInt(noOfSeat.textContent)+1}`;
      
    }
    updatePrice();
  }
}

function updatePrice(){
  let moviePricing = parseInt(selectMovie.value.slice(-1));
  const seatSelectedArr = document.querySelectorAll(".selectedSeat");
  let noOfSeat = Array.from(seatSelectedArr).length;
  setPrice(moviePricing*noOfSeat);
}


function setPrice(price){
  document.querySelector("#totalPrice").textContent = `$ ${price}`;

}

//Add eventLsiter to continue Button
const continuebtn = document.querySelector("#proceedBtn");
continuebtn.addEventListener("click", function(){
  proceed();
});

function proceed(){
  const seatSelectionArray = Array.from(document.querySelectorAll(".selectedSeat"));
  if(seatSelectionArray.length==0){
    alert("Oops no seat Selected");
  }
  else{
    alert("Yayy! Your Seats have been booked");
    clearSeatHolder();
    setPrice(0);
    clearSeats(true);
    resetSeatCount();
  }
}

function resetSeatCount(){
    document.querySelector(".selectedSeatsHolder").appendChild(noSelected);
    noOfSeat.textContent = "0";
}

function clearSeatHolder(){
  const seatSelectionArray = Array.from(document.querySelectorAll(".selectedSeat"));
  seatSelectionArray.forEach((seat)=>{
      seat.remove();
  });
}

function clearSeats(booked){
    const selectedSeats = Array.from(document.querySelectorAll("#seatCont")[0].querySelectorAll(".selected"));
    if(booked){
      selectedSeats.forEach((seat)=>{
        seat.classList.remove("selected");
        seat.classList.add("occupied");
      });
    }
    else{
      selectedSeats.forEach((seat)=>{
        seat.classList.remove("selected");
      });
    }
}



//Add eventListerner to Cancel Button
const cancelbtn = document.querySelector("#cancelBtn");
cancelbtn.addEventListener("click", function(){
  cancel();
});

function cancel(){
    clearSeatHolder();
    setPrice(0);
    clearSeats(false);
    resetSeatCount();

}