var rnd = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const urlParams = new URLSearchParams(window.location.search);
const seedParam = urlParams.get('seed');

function stringToCharCodes(str) {
  let codes = "_"
  for (i in str) {
    codes += str.charCodeAt(i)
  }
  return codes
}

async function game(seedStart = rnd(0, 10000)) {
  var seed = seedStart
  let random = () => {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }


  var rndSeed = (min, max) => Math.floor(random() * (max - min)) + min;

  if (seedParam !== null) {
    seed = parseFloat(stringToCharCodes(seedParam))
  }



  var rowsEl = document.getElementById("rows")
  rowsEl.innerHTML = ""
  var rows = []
  for (let i = 0; i < 8; i++) {
    let row = document.createElement("tr")
    row.innerHTML = `<td>‎ </td>
      <td>‎ </td>
      <td>‎ </td>`
    rowsEl.appendChild(row)
    rows.push([0, 0, 0, row])
  }

  var guess = 0
  var answer = ""
  var nums = ['0', '1', "2", "3", "4", "5", "6", "7", "8", "9"]

  while (answer.replaceAll("a", "").length != 3) {
    answer += nums.splice(rndSeed(0, nums.length), 1)[0] + "a"
    console.lo
  }
  answer = answer.replaceAll("a", "")
  console.log(answer.length)


  answer = parseFloat(answer)


  var win = false
  const submit = async (e) => {
    e.preventDefault()
    if (win === true) {
      alert("You already won! Press the new game button to restart!")
      return
    }
    if (guess >= 8) {
      alert("No more guesses! The answer was: " + answer)
      return
    }
    let input = document.getElementById("guess").value
    if (input.length !== 3) {
      1
      alert("Guess must be 3 digits exactly!")
      return
    }
    if (!/^\d+$/.test(input.toString())) {
      alert("Guess must be a positive number!")
      return
    }

    rows[guess][0] = input
    let i = 0
    answer.toString().split("").forEach((d) => {
      if (input.toString().includes(d)) rows[guess][1]++
      if (input.toString()[i] == d) rows[guess][2]++
      i++
    })


    rows[guess][3].querySelectorAll("td")[0].textContent = rows[guess][0]
    rows[guess][3].querySelectorAll("td")[1].textContent = rows[guess][1]
    rows[guess][3].querySelectorAll("td")[2].textContent = rows[guess][2]

    if (input == answer) {
      rows[guess][3].classList.add("won")

      alert("You win!")
      win = true

      return
    }

    guess++
    document.getElementById("guess").value = ""
    document.getElementById("form").onsubmit = () => { }
    setTimeout(() => {
      document.getElementById("form").onsubmit = submit
    }, 50)
  }
  document.getElementById("form").onsubmit = submit
}
document.getElementById("new").onclick = () => {
  let a = prompt("Are you sure you want to start a new game? (y/n)")
  if (a.toLowerCase()[0] === "y") game()
}
game()

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key == "i") {
    (function() {
      var x = document.createElement("script");
      x.src = "https://cdn.jsdelivr.net/gh/SnowLord7/devconsole@master/main.js";
      x.onload = alert("Loaded Developer Console!");
      document.head.appendChild(x);
    })()
  }
})
