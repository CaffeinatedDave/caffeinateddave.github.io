const cards = [
  {name: 'Visa', bin: ['44','45','47','49'], length: 16, img: '/img/visa_logo_7.gif'},
  {name: 'Visa Electron', bin: ['4026','417500','4508','4844','4913','4917'], length: 16, img: '/img/Visa_Electron.svg'},
  {name: 'MasterCard', bin: ['51','52','53','54','55'], length: 16, img: '/img/mastercard_logo_8.gif'},
  {name: 'American Express', bin: ['34', '37'], length: 15, img: '/img/american_express_logo_5.gif'},
  {name: 'Diners Club International', bin: ['36'], length: 14, img: '/img/diners_club.png'},
  {name: 'Diners Club Carte Blanche', bin: ['300','301','302','303','304','305'], length: 14, img: '/img/diners_club.png'}
]

populateCardTypes = () => {
  cards.forEach((card, i) => {
    $('#cardtype').append(`<option value="${i}">${card.name}</option>`)
  })
  $('#cardtype').append(`<option value="99999">Custom</option>`)
}

changeBinValue = (e) => {
  $('#binField').hide()
  if (e.target.value === '99999') {
    $('#binField').show()
  }
}

const odds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const evens = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]

luhnAdd = (acc, digit, idx) => {
  const option = (idx % 2 == 0) ? evens : odds
  return (acc + option[parseInt(digit)])
}

getLuhnNumber = (cardNumber) => {
  var answer = cardNumber.split('').reduce(luhnAdd, 0)
  return (answer * 9) % 10
}

generateCard = () => {
  let start, length, img
  const cardIdx = $('#cardtype')[0].value;
  if (cardIdx === '99999') {
    start = $('#bin')[0].value
    length = $('#length')[0].value - start.length - 1
    img = '/img/generic_card.png'
  } else {
    const possible = cards[cardIdx].bin
    start = possible[Math.floor(Math.random() * possible.length)]
    length = cards[cardIdx].length - start.length - 1
    img = cards[cardIdx].img
  }

  var rest = ''
  for (var i = 0; i < length; i++) {
    rest += [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() * 10)]
  }

  const newCardNumber = start + rest + getLuhnNumber(start+rest)

  const date = new Date();

  const vy = date.getFullYear() % 100
  const m = (date.getMonth() + 1 + "").padStart(2, 0)
  const ey = vy + 5

  $('#cardNumber').text(newCardNumber.split('').join(' ')).append("<span></span>")
  $('#validFrom').text(`${m}/${vy}`)
  $('#expiry').text(`${m}/${ey}`)
  $('#logo').attr('src', img)
  $('#card').show()

  $('#previousCards').prepend("<li><img src=\""+img+"\"/>"+newCardNumber+"</li>")
  $('#history>ul>li:nth-child(11)').remove()
}

$(document).ready(() => {
  populateCardTypes();
  $('#cardtype').change(changeBinValue)
})
