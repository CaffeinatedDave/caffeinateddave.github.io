loadAllGames = () => {
  var gameList = []
  fixtures.fixtures.forEach((list) => {
    const comp = list.competition
    list.fixtures.forEach((game) => {
      const time = game.time === undefined ? '' : game.time
      const date = new Date(Date.parse(game.date + ' ' + time))
      sh = game.scoreH === undefined ? '' : game.scoreH
      sa = game.scoreA === undefined ? '' : game.scoreA
      sho = game.scoreHOT === undefined ? '' : game.scoreHOT
      sao = game.scoreAOT === undefined ? '' : game.scoreAOT

      gameList.push({date: date, competition: comp, home: game.home, away: game.away, scoreH: sh, scoreA: sa, scoreHOT: sho, scoreAOT: sao})
    })
  })
  return gameList.sort(function(a, b){return a.date-b.date;})
}

rebuildTable = (games) => {
  $('#fixtures tbody').empty()

  games.forEach((g) => {
    const date = ("00" + g.date.getDate()).slice(-2) + "/" +
      ("00" + (g.date.getMonth() + 1)).slice(-2) + "/" +
      g.date.getFullYear()
    const t =
      ("00" + g.date.getHours()).slice(-2) + ":" +
      ("00" + g.date.getMinutes()).slice(-2)
    const time = (t === '00:00') ? '' : t

    var table = $('<tr></tr>');

    $('<td>' + g.competition + '</td>').appendTo(table);
    if (fixtures.teams[g.home].logo !== undefined) {
      $('<td><img src="/fixtures-ref/imgs/' + fixtures.teams[g.home].logo + '"/></td>').appendTo(table);
    } else {
      $('<td><img src="/fixtures-ref/imgs/' + g.home + '.png"/></td>').appendTo(table);
    }
    if (g.scoreH === '' && g.scoreA === '') {
      $('<td></td>').appendTo(table);
    } else if (g.scoreHOT === '' && g.scoreAOT === '') {
      $('<td><span class="score">' + g.scoreH + '</span></td>').appendTo(table);
    } else {
      const rtH = (g.scoreHOT === '') ? g.scoreH : g.scoreHOT
      $('<td><span class="score">' + rtH + '</span><span>('+g.scoreH+')</span></td>').appendTo(table);
    }
    var mid = '<td class="fixture">' +
      '<span class="hidden-xs hidden-sm">' +
        fixtures.teams[g.home].name +
          ' vs ' +
        fixtures.teams[g.away].name +
      '</span>' +
      '<span class="hidden-md hidden-lg score">:</span>' +
      '</td>';
    $(mid).appendTo(table);
    if (g.scoreH === '' && g.scoreA === '') {
      $('<td></td>').appendTo(table);
    } else if (g.scoreHOT === '' && g.scoreAOT === '') {
      $('<td><span class="score">' + g.scoreA + '</span></td>').appendTo(table);
    } else {
      const rtA = (g.scoreAOT === '') ? g.scoreA : g.scoreAOT
      $('<td><span class="score">' + rtA + '</span><span>('+g.scoreA+')</span></td>').appendTo(table);
    }
    if (fixtures.teams[g.away].logo !== undefined) {
      $('<td><img src="/fixtures-ref/imgs/' + fixtures.teams[g.away].logo + '"/></td>').appendTo(table);
    } else {
      $('<td><img src="/fixtures-ref/imgs/' + g.away + '.png"/></td>').appendTo(table);
    }
    $('<td>' + date + ' ' + time + '</td>').appendTo(table);

    $('#fixtures tbody').append(table);
  });
}

populateGames = () => {
  rebuildTable(loadAllGames())
}

populateSearch = () => {
  $('#competition').hide();
  $('#team1').append('<option value="--">---</option>');
  $('#team2').append('<option value="--">---</option>');
  $('#competition').append('<option value="--">---</option>');
  for (var t in fixtures.teams) {
    $('#team1').append('<option value="'+t+'">'+fixtures.teams[t].name+'</option>');
    $('#team2').append('<option value="'+t+'">'+fixtures.teams[t].name+'</option>');
  };
  for (var c in fixtures.competitions) {
    $('#competition').append('<option value="'+c+'">'+fixtures.competitions[c].name+'</option>');
  }
  if (fixtures.competitions.length > 1) {
    $('#competition').display();
  }
}

fixtureSearch = () => {
  var search1 = $('#team1')[0].value
  var search2 = $('#team2')[0].value
  var competition = $('#competition')[0].value
  const gameList = loadAllGames().filter((x) => {
    var display = false

    if (search1 === '--'  && search2 === '--') display = true;
    if (search1 === x.home && search2 === '--') display = true;
    if (search1 === x.away && search2 === '--') display = true;
    if (search2 === x.home && search1 === '--') display = true;
    if (search2 === x.away && search1 === '--') display = true;
    if (search1 === x.home && search2 === x.away) display = true;
    if (search1 === x.away && search2 === x.home) display = true;

    if (competition !== '--') {
      if (x.competition !== competition) display = false;
    }

    return display;
  });

  rebuildTable(gameList)
}

loadFixtures = () => {
  $('#team1').empty();
  $('#team2').empty();
  $('#competition').empty();
  $('#fixtures tbody').empty();
  $('#fixtures tbody').append('<tr><td colspan="7"><img class="spinner" src="/img/loading.gif"/></td></tr>');

  file = $('#fixtureListChoice')[0].value
  $.getJSON('/fixtures-ref/'+file+'.json')
  .done(function(data) {
    window.fixtures = data;
    populateGames();
    populateSearch();
  })
  .fail(function(x, text, error) {
    if (x.status == '404') {
      console.log("Can't find requested fixture list.")
      $('#fixtureListChoice').val('EIHL1819')
      loadFixtures()
    } else {
      console.log(error);
    }
  })
}

$(document).ready(() => {
  var urlParams = new URLSearchParams(window.location.search)

  $.getJSON('/fixtures-ref/metadata.json')
  .done(function(data) {
    data.available.forEach((t) => {
      $('#fixtureListChoice').append('<option disabled="disabled">-- ' + t.title + ' --</option>')
      t.lists.forEach((l) => {
        $('#fixtureListChoice').append('<option value="'+l.link+'">' + l.name + '</option>')
      })
    })

    var fixtures = urlParams.get('fixtures') === null ? 'EIHL1819' : urlParams.get('fixtures')
    $('#fixtureListChoice').val(fixtures)
    loadFixtures()
  })
  .fail(function(x, text, error) {
    console.log(error);
  })

  $('#team1').change(fixtureSearch)
  $('#team2').change(fixtureSearch)
  $('#competition').change(fixtureSearch)
  $('#fixtureListChoice').change(loadFixtures)
})


/**
var date = ''
var gameList = []
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

      gameList.push(obj);
    })
  }
})
console.log(JSON.stringify(gameList));
*/
