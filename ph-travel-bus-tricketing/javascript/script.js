const seats = document.getElementsByClassName("seat-button");

let seatsLeft = parseInt(getInnerText("seats-left"));
let seatCount = parseInt(getInnerText("seat-count"));

for (const seat of seats) {
  seat.addEventListener("click", function () {
    seatCount++;

    if (seatCount <= 4) {
      setInnerText("seat-count", seatCount);
      seatsLeft--;
      setInnerText("seats-left", seatsLeft);

      seat.classList.add("bg-[#1DD100]", "text-white", "selected");

      const table = document.getElementById("pricing-table");
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.innerText = seat.innerText;
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      td2.innerText = "Economy";
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerText = 550;
      tr.appendChild(td3);

      table.appendChild(tr);

      setInnerText("total", 550 * seatCount);
      setInnerText("grand-total", 550 * seatCount);
    } else alert("You can buy 4 tickets at a time");
  });
}

const coupon = document.getElementById("coupon");
coupon.addEventListener("keyup", function () {
  const applyButton = coupon.nextElementSibling;

  const total = getInnerText("total");
  convertedTotal = parseInt(total);

  if (seatCount > 0) {
    applyButton.removeAttribute("disabled");

    let discountRate = 0;
    if (coupon.value.toUpperCase() === "NEW15") {
      discountRate = 0.15;
    } else if (coupon.value.toUpperCase() === "COUPLE 20") {
      discountRate = 0.20;
    } else {
      applyButton.setAttribute("disabled", true);
    }

    if (discountRate > 0) {
      applyButton.addEventListener("click", function () {
        applyDiscount(discountRate);
      });
    }
  } else {
    alert('Select at least one seat');
  }
});

function applyDiscount(discountRate) {
  const discount = convertedTotal * discountRate;
  const grandTotal = convertedTotal - discount;
  setInnerText("grand-total", Math.round(grandTotal));
  document.getElementById("coupon-input").classList.add("hidden");

  const table = document.getElementById("t-foot");
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.classList.add('font-medium', 'text-black', 'text-base');
  td1.innerText = "Discount";
  tr.appendChild(td1);

  const td2 = document.createElement("td");
  tr.appendChild(td2);

  const td3 = document.createElement("td");
  td3.classList.add('font-medium', 'text-black', 'text-base');
  td3.innerText = "BDT" + discount;
  tr.appendChild(td3);

  table.appendChild(tr);
}


const confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", function (e) {
  const name = document.getElementById("name").value.trim();
  const number = document.getElementById("number").value.trim();


  if (seatCount>0) {
    if (name && number) {
      document.getElementById("congrats").classList.remove("hidden");
    } 
    else {
      alert("Please fill up the form");
    }
  }
  else{
    alert('Select at least one seat');
  }
  e.preventDefault();
});

function setInnerText(id, text) {
  document.getElementById(id).innerText = text;
}

function getInnerText(id) {
  return document.getElementById(id).innerText;
}