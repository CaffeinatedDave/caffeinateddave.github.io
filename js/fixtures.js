loadAllGames = () => {
  var gameList = []
  fixtures.fixtures.forEach((list) => {
    const comp = list.competition
    list.fixtures.forEach((game) => {
      var date = new Date(Date.parse(game.date + ' ' + game.time))

      gameList.push({date: date, competition: comp, home: game.home, away: game.away})
    })
  })
  return gameList.sort(function(a, b){return a.date-b.date;})
}

populateGames = () => {
  const gameList = loadAllGames()
  gameList.forEach((g) => {
    const date = ("00" + g.date.getDate()).slice(-2) + "/" +
      ("00" + (g.date.getMonth() + 1)).slice(-2) + "/" +
      g.date.getFullYear() + " " +
      ("00" + g.date.getHours()).slice(-2) + ":" +
      ("00" + g.date.getMinutes()).slice(-2)
    $('#fixtures tbody').append('<tr>'+
    '<td>' + g.competition + '</td>'+
    '<td><img src="/img/' + g.home + '.png"/></td>'+
    '<td>' + fixtures.teams[g.home].name + ' vs ' + fixtures.teams[g.away].name + '</td>'+
    '<td><img src="/img/' + g.away + '.png"/></td>'+
    '<td>' + date + '</td></tr>');
  })
}

populateSearch = () => {

}

$(document).ready(() => {
  populateGames();
  populateSearch();
})


function fixtureSearch() {
  // const filter = $('#Search')[0].value.toUpperCase();
  // const trs = $('tbody > tr');
  //
  // trs.each((i) => {
  //   if (trs[i].innerText.toUpperCase().indexOf(filter) > -1) {
  //     trs[i].style.display = '';
  //   } else {
  //     trs[i].style.display = 'none';
  //   }
  // })
}


/**
var date = ''
var gamelist = []
jQuery('section.container>div').each((e) => {
  const j = jQuery('section.container>div:nth('+e+')')
  const elem = j[0]
  if (elem.classList.contains('date-row')) {
    date = j.find('h2').html().trim()
  } else {
    j.find('.game-row').each((g) => {
      const h = j.find('.game-row:nth('+g+') .home-team').html().trim();
      const a = j.find('.game-row:nth('+g+') .away-team').html().trim();
      const t = j.find('.game-row:nth('+g+') .score').html().trim();
      obj = {date: date, home: h, away: a, time: t}

      gameList << obj;
    })
  }
})
console.log(JSON.stringify(gameList));
*/
