function loadBooks() {
  $.getJSON('/ref/reading.json')
  .done(function(data) {
    window.readingList = data.sort((a,b) => (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0);
    bookSearch();
  })
  .fail(function(x, text, error) {
    console.log(error);
  })
}

function bookSearch() {
  const filter = $('#bookSearch')[0].value.toUpperCase();
  $('tbody').empty();

  window.readingList.forEach((b) => {
    if (b.title.toUpperCase().indexOf(filter) > -1 || b.author.toUpperCase().indexOf(filter) > -1) {

      var row = $('<tr></tr>');

      $('<td>'+b.title+'</td>').appendTo(row);
      $('<td>'+b.author+'</td>').appendTo(row);

      var links = $('<td></td>');

      b.links.forEach((link) => {
        links.append('<a href="'+link.link+'">'+link.type+'</a>');
      })

      links.appendTo(row);
      $('tbody').append(row)
    }
  })
}

function twitterWindow() {
  const url = "https://twitter.com/intent/tweet?related=CaffeinatedDave&text=@CaffeinatedDave%20A%20suggestion%20for%20your%20reading%20list%20-%20&hashtags=readingList"
  const height = 260;
  const width = 640;
  window.open(url , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
}

$(document).ready(() => {
  loadBooks();
})
