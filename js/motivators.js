const motivators = Array();
const explanations = Array();

function buildMotivator(name) {
  char = name.split("")[0].toLowerCase();
  toRet = "<li class=\"motivator mot-md\" id=\"mot-"+char+"\">";
  toRet += '<div class="heading"><h5>';
  toRet += name
  toRet += "</h5></div>";
  //"<img src=\"/img/motivators/"+char+".jpeg\">";
  toRet += "</li>";

  return toRet
}

$( function() {
  motivators["c"] = (buildMotivator("Curiosity"));
  explanations["c"] = "<p><b>Curiosity:</b> I have plenty of things to investigate and think about.</p>";
  motivators["h"] = (buildMotivator("Honour"));
  explanations["h"] = "<p><b>Honour:</b> I feel proud that my personal values are reflected in how I work.</p>";
  motivators["a"] = (buildMotivator("Acceptance"));
  explanations["a"] = "<p><b>Acceptance:</b> The people around me approve of what I do and who I am.</p>";
  motivators["m"] = (buildMotivator("Mastery"));
  explanations["m"] = "<p><b>Mastery:</b> My work challenges my competence but is still within my abilities.</p>";
  motivators["p"] = (buildMotivator("Power"));
  explanations["p"] = "<p><b>Power:</b> There's enough room for me to influence what happens around me.</p>";
  motivators["f"] = (buildMotivator("Freedom"));
  explanations["f"] = "<p><b>Freedom:</b> I am independant of others with my own work and responsibilities.</p>";
  motivators["r"] = (buildMotivator("Relatedness"));
  explanations["r"] = "<p><b>Relatedness:</b> I have good social contacts with the people in and around my work.</p>";
  motivators["o"] = (buildMotivator("Order"));
  explanations["o"] = "<p><b>Order:</b> There are enough rules and policies for a stable environment.</p>";
  motivators["g"] = (buildMotivator("Goal"));
  explanations["g"] = "<p><b>Goal:</b> My purpose in life is reflected in the work that I do.</p>";
  motivators["s"] = (buildMotivator("Status"));
  explanations["s"] = "<p><b>Status:</b> My position is good and recognised by the people who work with me.</p>";
  drawMotivators();

  $( "#sortable" ).sortable({
    stop: function() {
      updateMotivators(this);
    }
  });
  $( "ul, li" ).disableSelection();
} );

function switchMode(ordered) {

  const up = "<div class=\"up\">UP</div>";
  const down = "<div class=\"down\">DOWN</div>";

  if (ordered) {
    $(".motivator").each(function () {
      this.prepend(up)
      this.append(down)
    })

    $(".up").click(function() {
      this.css("padding-top", "0px");
    });

    $(".down").click(function() {
      this.css("padding-top", "60px");
    });

  } else {
    $("#sortable").empty();
    drawMotivators();
  }
}

function canUseCookie(cookie) {
  if (cookie == undefined) {
    return false;
  } else {
    return [...cookie].sort().join("") == "acfghmoprs";
  }
}

function drawMotivators() {
  var use = [];
  var cookie = Cookies.get("motivators");

  if (!canUseCookie(cookie)) {
    use = "champfrogs".split("");
  } else {
    use = cookie.split("");
  }

  use.forEach(e =>
    $("#sortable").append(motivators[e])
  );

  $(".motivator")
    .mouseover(function() {
      const id = $(this).attr("id").substr(4,1);
      $("#explain").append(explanations[id]);
      $("#explain").show();
      $("#default").hide();

  }).mouseout(function() {
      $("#explain").hide();
      $("#default").show();
      $("#explain").empty();
  })
}


function updateMotivators(e) {
  var IDs = $(e).find("li").map(function() { return this.id.substr(4,1); }).get();
  Cookies.set("motivators", IDs.join(""), { expires: 3650 });
}
