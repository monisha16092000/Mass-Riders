document.querySelectorAll('.float-whatsapp, .float-call').forEach(btn => {
    btn.addEventListener('click', () => {
        if (navigator.vibrate) {
            navigator.vibrate(50); // short vibration
        }
    });
});
//Only allow letters in the phone input field
function AlphaOnly(e) {
    let key = e.key;

    // Block invalid keys
    if (!/^[a-zA-Z\s]$/.test(key) &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)) {
        e.preventDefault();
        return false;
    }

    // Convert to uppercase after input
    setTimeout(() => {
        e.target.value = e.target.value.toUpperCase();
    }, 0);

    return true;
}
//Only allow numbers in the phone input field
function NumberOnly(e) {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
        e.preventDefault();
    }
}
//Booking Car Amount Calculation
const rates = {
    Select: { oneWay: 0, roundTrip: 0 },
    Sedan: { oneWay: 14, roundTrip: 12 },
    CorollaAltis: { oneWay: 15, roundTrip: 13 },
    SUV: { oneWay: 20, roundTrip: 17 },
    Innova: { oneWay: 20, roundTrip: 17 },
    Tavera: { oneWay: 20, roundTrip: 17 },
    Xylo: { oneWay: 20, roundTrip: 17 }
};
function calculateAmount() {
    const carType = document.getElementById("carType").value;
    const Droptype = document.getElementById("Droptype").value;
    const distance = parseFloat(document.getElementById("distance").value || 0);

    let rate = 0;

    if (Droptype === "1") { // One Way
        rate = rates[carType].oneWay;
    } else if (Droptype === "2") { // Up & Down
        rate = rates[carType].roundTrip;
    }

    let amount1 = rate;
    document.getElementById("amount").value = amount1;
    if (distance) {
        calculateDistanceAmount();
    }
}
function calculateDistanceAmount() {

    const distance = parseFloat(document.getElementById("distance").value || 0);
    const amount = parseFloat(document.getElementById("amount").value || 0);

    if (distance <= 0 || amount <= 0) {
        document.getElementById("price").innerText = 0;
        return;
    }

    let Distanceamt = distance * amount;

    document.getElementById("price").innerText = Distanceamt;
}
function ConfirmBooking() {
    const form = document.getElementById("bookingForm");
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const carType = document.getElementById("carType").value;
    const Dropselect = document.getElementById("Droptype");
    const Droptype = Dropselect.options[Dropselect.selectedIndex].text;
    const distance = document.getElementById("distance").value;
    const amount = document.getElementById("amount").value;
    const price = document.getElementById("price").innerText;

    if (name === "" || phone === "" || pickup === "" || drop === "" || date === "" || time === "" || carType === "Select" || Droptype === "Select" || distance === "" || price === "0") {
        toast("Please fill in all the fields correctly before confirming the booking..!!", "error");
        return;
    }
    // Validate phone number
    if (!phone.startsWith("6") && !phone.startsWith("7") && !phone.startsWith("8") && !phone.startsWith("9")) {
        toast("Please enter a valid Phone number..!!", "error");
        return;
    }
    // Validate date & Time
    if (!validateDateTime(date, time)) {
        return;
    }

    let msg = `     Mass Rider Tours & Travels Booking Confirmation:

     Name: ${name}
     Phone: ${phone}
     Pickup: ${pickup}
     Drop: ${drop}
     Date: ${date}
     Time: ${time}
     Car: ${carType}
     Trip: ${Droptype}
     Distance: ${distance} km
     Fare: ₹${price}`;

    toast("Booking Details Collected..!! Open the Whatsapp app to confirm ✅", "success");

    setTimeout(() => {
        form.reset();
        document.getElementById("price").innerText = 0;
        /* WhatsApp message */
        window.open(
            "https://wa.me/917305362562?text=" + encodeURIComponent(msg),
            "_blank"
        );
    }, 1200);
}

/* TOAST */
function toast(Msg,type) {
    const t = document.getElementById("toastBox");
    t.style.display = "block";
    t.innerText = Msg;
    t.className = `${type}`;
    setTimeout(() => t.style.display = "none", 5000);
}

function validateDateTime(date, time) {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    // ❌ Past booking check
    if (selectedDateTime < now) {
        toast("Please select a valid Future date & time..!!", "error");
        return false;
    }
    // ❌ Must be at least 1 hour ahead
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    if (selectedDateTime < oneHourLater) {
        toast("Bookings must be at least 1 hour in advance..!!", "error");
        return false;
    }
    return true;
}