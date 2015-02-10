/*
 * Javascript Infinite Wall
 * Copyright (c) 2015 Hao Liu (http://liuhao.im)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 */

(function($) {

    $.fn.wall = function(options) {
        // define vars
        var self = this;
        var dataset;
        var wall = $('<div id="wall"></div>');

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            data: [],
            width: 100,
            height: 100,
        }, options);

        // get data
        $(document).ready(function() {
            var x = Math.ceil(self.width() / settings.width);
            var y = Math.ceil(self.height() / settings.height);
            dataset = data;
            init();
            center_wall(Math.ceil(x / 2), Math.ceil(y / 2));
        });


        // resize window
        $(window).resize(function() {
            var x = Math.ceil(self.width() / settings.width);
            var y = Math.ceil(self.height() / settings.height);
            center_wall(Math.ceil(x / 2), Math.ceil(y / 2));
        });

        function init() {
            // create a new wall
            self.append(wall);

            var x = Math.ceil(self.width() / settings.width);
            var y = Math.ceil(self.height() / settings.height);
            console.log(x, y);
            for (var i = 0; i < x; i++) {
                for (var j = 0; j < y; j++) {
                    create_tile(i, j);
                };
            };
        }

        function create_tile(i, j) {
            var randIdx = Math.floor(Math.random() * dataset.length);
            var rand = dataset[randIdx];

            var tile = $('<div class="tile"></div>');
            tile.css({
                "top": settings.height * j,
                "left": settings.width * i,
                "background-image": "url('" + rand.avatar + "')",
                "width": settings.width,
                "height": settings.height,
            });
            tile.attr("data-x", i);
            tile.attr("data-y", j);
            tile.attr("data-idx", randIdx);
            wall.append(tile);
        }

        function center_wall(i, j) {
            refill_wall(i, j); // first refill the wall and then center the i,j

            var target = $('[data-x="' + i + '"][data-y="' + j + '"]');

            $("#viewport #wall .tile").each(function() {
                var tile = $(this);
                tile.removeClass("active");
            });

            target.addClass("active");

            var originX = (self.width() - settings.width) / 2 + self.offset().left;
            var originY = (self.height() - settings.height) / 2 + self.offset().top;
            var delX = target.offset().left - originX;
            var delY = target.offset().top - originY;

            wall.css({
                "left": parseInt(wall.css("left")) - delX,
                "top": parseInt(wall.css("top")) - delY - 100
            });

            var comment = dataset[target.data("idx")].comment;
            var name = dataset[target.data("idx")].name;
            var twitter = dataset[target.data("idx")].twitter;
            $("#viewport #viewport-title h1").text(comment);
            $("#viewport #viewport-title h2").text('-' + name);
            $("#viewport #viewport-title p a").text(twitter);
            $("#viewport #viewport-title p a").attr("href", "http://twitter.com/" + twitter);
        }

        function refill_wall(i, j) {
            var x = Math.ceil(self.width() / settings.width), // get x and y
                y = Math.ceil(self.height() / settings.height),
                x1 = Math.ceil(i - x / 2),
                x2 = Math.ceil(i + x / 2 + 2),
                y1 = Math.ceil(j - y / 2),
                y2 = Math.ceil(j + y / 2 + 2);
            for (var m = x1; m < x2; m++) { // +1 because to offset remain
                for (var n = y1; n < y2; n++) { // because not really center but center top, so add another 2 rows
                    if ($('[data-x="' + m + '"][data-y="' + n + '"]').length == 0) {
                        create_tile(m, n);
                    };
                };
            };
            remove_tile(x1, x2, y1, y2);
        }

        // used to remove tiles which are not in x1-x2-y1-y2 area
        function remove_tile(x1, x2, y1, y2) {
            for (var i = x1 - 10; i < x1 + 10; i++) {
                for (var j = y1 - 10; j < y1 + 10; j++) {
                    if (i < x1 - 1 || i > x2 + 1 || j < y1 - 1 || j > y2 + 1) {
                        $('[data-x="' + i + '"][data-y="' + j + '"]').remove();
                    };
                };
            };
        }

        $(document).on('click', "#viewport #wall .tile", function() {
            var clickTile = $(this);
            center_wall(clickTile.data("x"), clickTile.data("y"));
        });

        return this;
    };


}(jQuery));