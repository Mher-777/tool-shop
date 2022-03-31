import { config } from "../config";

var button = {
	selector: ".js-btn",
	circle: ".b-circle",

	end: (e) => {
		let $this = $(e.currentTarget);

		if ($this.hasClass("b-circle_pause"))
			$this.removeAttr("style").removeClass("js-start b-circle_pause");
	},

	mouseenter: (e) => {
		if ($(window).width() < 1024) return false;

		let $this = $(e.currentTarget);

		let $circles = $this.find(button.circle);

		if ($circles.hasClass("js-dont-change")) return false;

		$circles.each((i, circle) => {
			var left = config.getRandomInt(
					-$(circle).parent().width() / 2,
					$(circle).parent().outerWidth()
				),
				top = config.getRandomInt(
					-$(circle).parent().outerHeight() / 2,
					$(circle).parent().outerHeight()
				);

			$(circle)
				.removeAttr("style")
				.removeClass("b-circle_pause")
				.css({
					"margin-left": left + "px",
					"margin-top": top + "px",
					transform: "scale(13)",
				})
				.addClass("js-start");
		});
	},

	mouseleave: (e) => {
		if ($(window).width() < 1024) return false;

		let $this = $(e.currentTarget);

		let $circles = $this.find(button.circle);

		if (!$circles.hasClass("js-dont-change"))
			$circles.addClass("b-circle_pause");
	},

	run: (selector) => {
		let count = $(selector).find(".b-circle").length;

		if (count == 0) {
			for (let i = 0; i < config.getRandomInt(2, 5); i++) {
				let left = config.getRandomInt(0, $(selector).outerWidth()),
					top = config.getRandomInt(0, $(selector).outerHeight());

				$(selector)
					.find(".js-circles")
					.append(
						'<i class="b-circle" style="margin-left:' +
							left +
							"px; margin-top:" +
							top +
							'px;"></i>'
					);
			}
		}

		$(selector).on("mouseenter", button.mouseenter);
		$(selector).on("mouseleave", button.mouseleave);
	},

	init: () => {
		if (!$(button.selector).length) return false;

		$(button.selector).each((i, el) => {
			button.run(el);
		});

		$(button.circle).on(config.transitionEnd, button.end);
	},
};

export { button };
