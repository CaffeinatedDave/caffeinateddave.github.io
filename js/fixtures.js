loadAllGames = () => {
  var gameList = []
  fixtures.fixtures.forEach((list) => {
    const comp = list.competition
    list.fixtures.forEach((game) => {
      var date = new Date(Date.parse(game.date + ' ' + game.time))
      sh = game.scoreH === undefined ? '' : game.scoreH
      sa = game.scoreA === undefined ? '' : game.scoreA

      gameList.push({date: date, competition: comp, home: game.home, away: game.away, scoreH: sh, scoreA: sa})
    })
  })
  return gameList.sort(function(a, b){return a.date-b.date;})
}

populateGames = () => {
  const gameList = loadAllGames();
  gameList.forEach((g) => {
    const date = ("00" + g.date.getDate()).slice(-2) + "/" +
      ("00" + (g.date.getMonth() + 1)).slice(-2) + "/" +
      g.date.getFullYear() + " " +
      ("00" + g.date.getHours()).slice(-2) + ":" +
      ("00" + g.date.getMinutes()).slice(-2)

    $('#fixtures tbody').append('<tr>' +
    '<td>' + g.competition + '</td>' +
    '<td><img src="/img/' + g.home + '.png"/></td>' +
    '<td class="score">' + g.scoreH + '</td>' +
    '<td class="fixture">' +
      '<span class="hidden-xs hidden-sm">' + fixtures.teams[g.home].name + ' vs ' + fixtures.teams[g.away].name + '</span>' +
      '<span class="hidden-md hidden-lg score">-</span>' +
    '</td>' +
    '<td class="score">' + g.scoreA + '</td>' +
    '<td><img src="/img/' + g.away + '.png"/></td>' +
    '<td>' + date + '</td></tr>');
  });
}

populateSearch = () => {
  $('#team1').append('<option value="--">---</option>')
  $('#team2').append('<option value="--">---</option>')
  for (var t in fixtures.teams) {
    $('#team1').append('<option value="'+t+'">'+fixtures.teams[t].name+'</option>')
    $('#team2').append('<option value="'+t+'">'+fixtures.teams[t].name+'</option>')
  };
}

fixtureSearch = () => {
  var search1 = $('#team1')[0].value
  var search2 = $('#team2')[0].value
  const gameList = loadAllGames().filter((x) => {
    var display = false

    if (search1 === '--'  && search2 === '--') display = true;
    if (search1 === x.home && search2 === '--') display = true;
    if (search1 === x.away && search2 === '--') display = true;
    if (search2 === x.home && search1 === '--') display = true;
    if (search2 === x.away && search1 === '--') display = true;
    if (search1 === x.home && search2 === x.away) display = true;
    if (search1 === x.away && search2 === x.home) display = true;

    return display;
  });

  $('#fixtures tbody').empty()

  gameList.forEach((g) => {
    const date = ("00" + g.date.getDate()).slice(-2) + "/" +
      ("00" + (g.date.getMonth() + 1)).slice(-2) + "/" +
      g.date.getFullYear() + " " +
      ("00" + g.date.getHours()).slice(-2) + ":" +
      ("00" + g.date.getMinutes()).slice(-2)

    $('#fixtures tbody').append('<tr>' +
    '<td>' + g.competition + '</td>' +
    '<td><img src="/img/' + g.home + '.png"/></td>' +
    '<td class="score">' + g.scoreH + '</td>' +
    '<td class="fixture">' +
      '<span class="hidden-xs hidden-sm">' + fixtures.teams[g.home].name + ' vs ' + fixtures.teams[g.away].name + '</span>' +
      '<span class="hidden-md hidden-lg score">-</span>' +
    '</td>' +
    '<td class="score">' + g.scoreA + '</td>' +
    '<td><img src="/img/' + g.away + '.png"/></td>' +
    '<td>' + date + '</td></tr>');
  });
}

$(document).ready(() => {
  populateGames();
  populateSearch();
  $('#team1').change(fixtureSearch)
  $('#team2').change(fixtureSearch)
})


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
