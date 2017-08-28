window.Game = {};

Game.version = "0.0.1"

Game.tickTime = 500;

Game.maxBarValue = 1;
Game.currentBarValue = 1;
Game.barIncrement = 0.1;

Game.materials = [
  {
    name: "money",
    displayName: "Money",
    show: false,
    price: 0
  },
  {
    name: "wood",
    displayName: "Wood",
    show: true,
    price: 1
  },
  {
    name: "stone",
    displayName: "Rock",
    show: true,
    price: 1
  },
  {
    name: "iron",
    displayName: "Metal",
    show: true,
    price: 5
  },
  {
    name: "chicken",
    displayName: "Food",
    show: true,
    price: 3
  }
];

Game.ownedMaterials = {
  money: 0,
  wood: 0,
}

Game.shop = [
  {
    name: "longerWood",
    displayName: "Bigger Wood Store",
    baseCost: 1,
    costUnit: "money",
    increment: function(x) {return Math.ceil(x+(x*0.25));},
    affects: "maxBarValue",
    amount: function(x) {return x + 1;},
    maxLevel: 19,
    requirements: function() {return Game.ownedMaterials.money > 0;},
  },
  {
    name: "fasterWood",
    displayName: "Wood Fills Faster",
    baseCost: 1,
    costUnit: "money",
    increment: function(x) {return Math.ceil(x*1.5);},
    affects: "barIncrement",
    amount: function(x) {return x + 0.1;},
    maxLevel: 29,
    requirements: function() {return Game.ownedMaterials.money > 0;},
  },
  {
    name: "fasterTick",
    displayName: "Time Goes Quicker",
    baseCost: 10,
    costUnit: "money",
    increment: function(x) {return x*10;},
    affects: "tickTime",
    amount: function(x) {return x*0.8;},
    maxLevel: 5,
    requirements: function() {return Game.ownedMaterials.money > 0;},
  },
];

Game.currentShop = {};

Game.redrawShop = function() {
  var shopHTML = "";
  Game.shop.forEach(x => {
    var shop = Game.currentShop[x.name];
    if (shop !== undefined || x.requirements()) {
      if (shop === undefined) {
        shop = Game.currentShop[x.name] = {
          level: 1,
          cost: x.baseCost,
          costUnit: x.costUnit,
          maxLevel: x.maxLevel,
        }
      }
      shopHTML += "<div>" +
        '<span class="shopName">' + x.displayName + '</span>' +
        '<button onclick="Game.buy(' + "'" + x.name + "'" + ')">Buy - cost ' + uniformNumber(shop.cost) + '</button>' +
      "</div>";
    }
  });

  $("#shopDisplay").html(shopHTML);
}

Game.sell = function(what, amount) {
  var selling = Game.ownedMaterials[what];
  if (selling >= amount) {
    Game.ownedMaterials[what] -= amount;
    Game.ownedMaterials.money += amount * Game.materials.filter(x => x.name == what)[0].price

    $("#mat-"+what).html(Game.ownedMaterials[what]);
    Game.redrawShop();
    Game.redrawMaterials();
  }
}

Game.buy = function(what) {
  var buying = Game.currentShop[what];
  if (buying !== undefined){

    // reduce the mats first
    var type = buying.costUnit;

    console.log("buying " + what + " with " + buying.cost + " " + buying.costUnit);
    console.log("Have " + Game.ownedMaterials[type]);

    if (Game.ownedMaterials[type] < buying.cost) {
      return;
    } else {
      Game.ownedMaterials[type] -= buying.cost;
    }
    // increment the shop
    buying.level += 1;
    buying.cost = Game.shop.filter(x => x.name == what)[0].increment(buying.cost);

    if (buying.level >= buying.maxLevel) {
      delete Game.currentShop[what];
    }

    // change the game
    var affects = Game.shop.filter(x => x.name == what)[0].affects;
    Game[affects] = Game.shop.filter(x => x.name == what)[0].amount(Game[affects])

    // redraw for good measure
    Game.redrawShop();
    Game.redrawMaterials();
  } else {
    console.log("Couldn't buy " + what);
  }
}

Game.redrawMaterials = function() {
  var materialHTML = "";
  Game.materials.forEach(x => {
    var mats = Game.ownedMaterials[x.name];
    if (mats !== undefined && x.show) {
      materialHTML += "<div>" +
        '<span class="matName">' + x.displayName + ': </span><span class="matAmount" id="mat-'+x.name+'">' + uniformNumber(mats) + '</span>'+
        '<button onclick="Game.sell(' + "'" + x.name + "'" + ', 1)">Sell 1</button>' +
        '<button onclick="Game.sell(' + "'" + x.name + "'" + ', '+mats+')">Sell All</button>' +
      "</div>";
    }
  });

  $("#materialDisplay").html(materialHTML);
}

Game.useBar = function() {
  const amount = Math.floor(Game.currentBarValue ** 2);
  Game.ownedMaterials.wood += amount;
  Game.currentBarValue = 0;
  $("#waitingBar").css({width: "0%"});

  Game.redrawShop();
}

Game.tick = function() {
  Game.currentBarValue += Game.barIncrement;
  Game.currentBarValue = Math.min(Game.currentBarValue, Game.maxBarValue);

  var percent = parseInt((Game.currentBarValue / Game.maxBarValue) * 10000) / 100;
  $("#waitingBar").css({width: "" + percent + "%"});

  var get = uniformNumber(Math.floor(Game.currentBarValue ** 2));
  $("#claimAmount").html(get);

  Game.materials.forEach(x => {
    $("#mat-"+x.name).html(Game.ownedMaterials[x.name]);
  })

  $("#currentMoney").html(uniformNumber(Game.ownedMaterials.money));

  setTimeout(function(){Game.tick();}, Game.tickTime);
}


$(document).ready(function(){
  $("#getStuffButton").on("click", function(){Game.useBar();});
  Game.redrawMaterials();
  Game.redrawShop();

  setTimeout(function(){Game.tick();}, Game.tickTime);
});
