var rnd = (min,max)=>Math.floor(Math.random() * (max - min) ) + min;
async function game() {
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
  var nums = ['0','1',"2","3","4","5","6","7","8","9"]

  answer = nums.splice(rnd(0,nums.length),1)[0]+nums.splice(rnd(0,nums.length),1)[0]+nums.splice(rnd(0,nums.length),1)[0]
  
  answer = parseFloat(answer)

  
  var win = false
  const submit = async (e) => {
      e.preventDefault()
      if(win===true){
        alert("You already won! Press the new game button to restart!")
        return
      }
      if (guess >= 8) {
        alert("No more guesses! The answer was: "+answer)
        return
      }
      let input = document.getElementById("guess").value
      if(input.length !== 3){1
        alert("Guess must be 3 digits exactly!")
        return
      }
    
      rows[guess][0] = input
    let i = 0
    answer.toString().split("").forEach((d)=>{
        if(input.toString().includes(d))rows[guess][1]++
        if(input.toString()[i]==d)rows[guess][2]++
        i++
      })


      rows[guess][3].querySelectorAll("td")[0].textContent = rows[guess][0]
      rows[guess][3].querySelectorAll("td")[1].textContent = rows[guess][1]
      rows[guess][3].querySelectorAll("td")[2].textContent = rows[guess][2]

      if(input==answer){
        rows[guess][3].classList.add("won")
 
        alert("You win!")
        win = true
     
        return
      }
    
      guess++
      document.getElementById("guess").value=""
      document.getElementById("form").onsubmit = ()=>{}
      setTimeout(() => {
        document.getElementById("form").onsubmit = submit
      }, 50)
    }
  document.getElementById("form").onsubmit = submit
}
document.getElementById("new").onclick=()=>{
  game()
}
game()
