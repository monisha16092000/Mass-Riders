
const form = document.getElementById("bookingForm");
const btn = document.getElementById("submitBtn");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const pickup = document.getElementById("pickup");
const drop = document.getElementById("drop");
const date = document.getElementById("date");
const time = document.getElementById("time");
const carType = document.getElementById("carType");
const distance = document.getElementById("distance");
const price = document.getElementById("price");

/* PRICE CALC */
function calc() {
    price.innerText = (distance.value * carType.value) || 0;
}
distance.oninput = calc;
carType.onchange = calc;

/* PHONE ONLY NUMBERS */
phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/[^0-9]/g, '');
});

/* UPI PAYMENT */
document.getElementById("upiPay").onclick = () => {
    let amt = price.innerText;

    window.location.href =
        `upi://pay?pa=9566710585@ybl&pn=MassTravels&am=${amt}&cu=INR`;
};

/* TOAST */
function toast() {
    const t = document.getElementById("toastBox");
    t.style.display = "block";
    setTimeout(() => t.style.display = "none", 2000);
}

/* SUBMIT */
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    btn.classList.add("btn-loading");
    btn.innerText = "Processing...";

    let msg = `🚖 Mass Travels Booking
Name: ${name.value}
Phone: ${phone.value}
Pickup: ${pickup.value}
Drop: ${drop.value}
Date: ${date.value}
Time: ${time.value}
Fare: ₹${price.innerText}`;

    /* WhatsApp message */
    window.open(
        "https://wa.me/919566710585?text=" + encodeURIComponent(msg),
        "_blank"
    );

    toast();

    setTimeout(() => {
        form.reset();
        price.innerText = 0;
        btn.classList.remove("btn-loading");
        btn.innerText = "Confirm Booking";
    }, 1200);
});
