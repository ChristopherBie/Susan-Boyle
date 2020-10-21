// Add event on document ready
jQuery(document).ready(function($) {
	$.fn.isOnScreen = function() {
		var win = $(window);
		var viewport = {
			top: win.scrollTop(),
			left: win.scrollLeft()
		};
		viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();
		var bounds = this.offset();
		bounds.right = bounds.left + this.outerWidth();
		bounds.bottom = bounds.top + this.outerHeight();
		return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	};
	// Add event on document scroll
	$(window).scroll(function() {
		// Cycle through each counter
		$(".animatedcounters").each(function() {
			// Check if counter is visible
			if ($(this).isOnScreen()) {
				// Start counter
				startCounter($(this));
			}
			else {
				// Check if it has only just become non-visible
				if ($(this).hasClass("notVisible") == false) {
					// Stop animation
					$(this).stop();
					// Add nonVisible class
					$(this).addClass("notVisible");
					// This stops the user very briefly seeing the previous number before the counter restarts
					$(this).text("0");
				}
			}
		});
	});
	// On page load check if counter is visible
	$('.animatedcounters').each(function() {
		// Add notVisible class to all counters
		// It is removed within startCounter()
		$(this).addClass("notVisible");
		
		// Check if element is visible on page load
		if ($(this).isOnScreen() === true) {
			// If visible, start counter
			startCounter($(this));
		}
	});
});


//Run counter, separate function so we can call it from multiple places
function startCounter(counterElement) {
	// Check if it has only just become visible on this scroll
	if (counterElement.hasClass("notVisible")) {
		// Remove notVisible class
		counterElement.removeClass("notVisible");
		// Run your counter animation
		counterElement.prop('Counter', 0).animate({
			Counter: counterElement.attr("counter-lim")
		},
		{
			duration: parseInt(counterElement.attr('data-duration')),
			easing: 'swing',
			step: function(now) {
				counterElement.text(Math.ceil(now).toLocaleString());
			}
		});
	}
}