const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ =>{
    //send a put request
    fetch('/quotes',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: "Brian O'Conner",
            quote:"Dude I almost had you",
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Brian O'Conner"
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'Brian is not here yet') {
          messageDiv.textContent = 'Brian is not here yet, try calling him so he could join the race'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
