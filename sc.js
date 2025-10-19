const seatContainer = document.querySelector('.seats');
const selectedCount = document.getElementById('selected');
const totalFare = document.getElementById('total');
const returnAmount = document.getElementById('return');
const routeSelect = document.getElementById('route');
const busType = document.getElementById('busType');
const givenAmount = document.getElementById('givenAmount');
const printBtn = document.getElementById('printBtn');
const ticketDiv = document.getElementById('ticket');

const rows = ['A','B','C','D','E','F','G','H','I','J'];
const cols = 4;
const maxSeats = 5;
const bookedSeats = ['A4','B1','C2','E3'];

function createSeats() {
  rows.forEach(row => {
    for (let i = 1; i <= cols + 1; i++) {
      if (i === 3) {
        const aisle = document.createElement('div');
        aisle.classList.add('aisle');
        seatContainer.appendChild(aisle);
        continue;
      }
      const seatNumber = i < 3 ? i : i - 1;
      const seatId = row + seatNumber;
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.innerHTML = `<i class="fas fa-chair"></i>${seatId}`;
      if (bookedSeats.includes(seatId)) seat.classList.add('booked');

      seat.addEventListener('click', () => {
        if (seat.classList.contains('booked')) return;
        const selectedSeats = document.querySelectorAll('.seat.selected');
        if (!seat.classList.contains('selected') && selectedSeats.length >= maxSeats) {
          alert(`❌ You can select maximum ${maxSeats} seats.`);
          return;
        }
        seat.classList.toggle('selected');
        updateFare();
      });

      seatContainer.appendChild(seat);
    }
  });
}

function updateFare() {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const seatCount = selectedSeats.length;
  selectedCount.innerText = seatCount;

  const fare = busType.value === 'AC' ? 450 : 310;
  const total = fare * seatCount;
  totalFare.innerText = total;

  const given = parseInt(givenAmount.value) || 0;
  const change = given - total;
  returnAmount.innerText = change >= 0 ? change : 0;
}

busType.addEventListener('change', updateFare);
givenAmount.addEventListener('change', updateFare);
createSeats();

// Print Ticket
printBtn.addEventListener('click', () => {
  const selectedSeats = [...document.querySelectorAll('.seat.selected')].map(seat => seat.textContent.trim());
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat!");
    return;
  }

  const route = routeSelect.value;
  const bus = busType.value;
  const fare = bus === 'AC' ? 450 : 310;
  const total = selectedSeats.length * fare;
  const given = parseInt(givenAmount.value);
  const change = given - total;

  ticketDiv.style.display = 'block';
  ticketDiv.innerHTML = `
    <h3>🎟 Hanif Enterprise Ticket</h3>
    <p><strong>Route:</strong> ${route}</p>
    <p><strong>Bus Type:</strong> ${bus}</p>
    <p><strong>Fare (per person):</strong> ৳${fare}</p>
    <p><strong>Selected Seats:</strong> ${selectedSeats.join(', ')}</p>
    <p><strong>Total Fare:</strong> ৳${total}</p>
    <p><strong>Given Amount:</strong> ৳${given}</p>
    <p><strong>Return Amount:</strong> ৳${change}</p>
    <p><em>Thank you for choosing Hanif Enterprise!</em></p>
  `;

  // Print
  window.print();
});
