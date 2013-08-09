
var LoadingView = Backbone.View.extend({
	el: '#loading'
});

var ContactView = Backbone.View.extend({
	el: '#contact'
});

var PlayerView = Backbone.View.extend({
	el: '#player'
});

var BuyView = Backbone.View.extend({
	el: '#buy'
});

var ScheduleView = Backbone.View.extend({
	el: '#schedule'
});

var ShareView = Backbone.View.extend({
	el: '#share'
});

var MoreView = Backbone.View.extend({
	el: '#more'
});

var FifthRecordsApp = Backbone.Router.extend({
	routes: {
		"": "index",
		"loading": "loading",
		"play": "play",
		"buy": "buy",
		"contact": "contact",
		"schedule": "schedule",
		"share": "share",
		"more": "more"
	},
	initialize: function() {
		this.views = {
			"loading": new LoadingView(),
			"contact": new ContactView(),
			"play": new PlayerView(),
			"buy": new BuyView(),
			"schedule": new ScheduleView(),
			"share": new ShareView(),
			"more": new MoreView()
		};
	},
	start: function() {
		Backbone.history.start();
	},
	showPage: function(page) {
		_.each(this.views, function(view) {
			view.$el.hide();
		});
		this.views[page].$el.show();
	},
	index: function() {
		this.navigate("play", {trigger: true});
	},
	play: function() {
		this.showPage('play');
	},
	buy: function() {
		this.showPage('buy');
	},
	contact: function() {
		this.showPage('contact');
	},
	schedule: function() {
		this.showPage('schedule');
	},
	share: function() {
		this.showPage('share');
	},
	more: function() {
		this.showPage('more');
	}
});

var app;

$(document).ready(function() {
	var $players = $('.audio-player');
	var $toggle = $('#play-pause-toggle');
	var $previous_audio = $('#previous-audio');
	var $next_audio = $('#next-audio');

	var playing = false;

	/*
	function checkBuffer() {
		var buffer = $player[0].buffered;
		if(buffer.length) {
			console.log(buffer);
			console.log(buffer.start(0), buffer.end(0));
		}
		setTimeout(checkBuffer, 1000);
	}
	
	checkBuffer();
	*/

	function pauseAll() {
		$players.each(function() {
			this.pause();
		});

	}

	function playCurrentAudio() {
		var $current_player = $players.filter('.current')
		$current_player.each(function() {
			this.play();
		});
		showCurrentTitle($current_player);
	}

	function showCurrentTitle($player) {
		var title = $player.data('title');
		$('.song-title').text(title);
	}

	function showAsPlaying() {
		$toggle.text("Pause");
	}

	function showAsPaused() {
		$toggle.text("Play");
	}

	function togglePlayPauseButton() {
		if ( $toggle.hasClass('disabled') ) {
			return;
		}

		playing = ! playing;
		
		if (playing) {
			playCurrentAudio();
			showAsPlaying();
		} else {
			pauseAll();
			showAsPaused();
		}
	}

	$toggle.on('click', function() {
		togglePlayPauseButton();
	});

	$next_audio.on('click', function() {
		pauseAll();

		var $nextPlayer = $players.filter('.current').next();
		if($nextPlayer.length == 0) {
			$nextPlayer = $players.first();
		}

		$players.removeClass('current')
		$nextPlayer.addClass('current')

		
		playCurrentAudio();
	});

	setTimeout(function() {
		$('.audio-control').removeClass('disabled');
	}, 1000);

	/* Backbone initialization */
	app = new FifthRecordsApp();
	app.start();
});


