$(function () {
	if (jQuery().tableToJSON) {
		// Object
		var dishObj = {};
		var heading;
		var headings = [];

		// Get Table Headings
		$('table.wikitable:first .headerSort').each(function (index, el) {
			heading = $(el).text().replace(/\s+/g, '_').toLowerCase();
			headings.push(heading);
		});

		// Clean HTML
		$('.hatnote').remove();

		// Turn tables into structured object
		$('table.wikitable').each(function (index, el) {

			// Get category name
			var category = $(el).prev('h3').find('span.mw-headline').text();
			if (!category) {
				category = $(el).prev('h2').find('span.mw-headline').text();
			}
			var categorySlug = category.replace(/\s+/g, '_').toLowerCase();

			// Table to JSON
			var table = $(el).tableToJSON({
				ignoreEmptyRows: true,
				headings: headings,
				extractor: {
					3: function (cellIndex, $cell) {
						var $img = $cell.find('img');
						var $imgSrc = $img.attr('src');
						if ($imgSrc) {
							var ratio = $img.data('file-width') / $img.data('file-height');
							var largeWidth = 640;
							return {
								thumbnailUrl: $imgSrc,
								thumbnailWidth: $img.width(),
								thumbnailHeight: $img.height(),
								largeUrl: $imgSrc.replace('110px-', largeWidth + 'px-'),
								largeWidth: largeWidth,
								largeHeight: Math.round(largeWidth / ratio)
							};
						}
					}
				}
			});

			// Merge all objects
			dishObj[categorySlug] = table;
		});

		if (!$('.button-download').length && !$('.modal-backdrop').length) {
			// Append download button
			$('<a />', {
				class: 'button-download',
				text: 'Download JSON',
				download: 'data.json',
				href: 'data:application/json,' + encodeURIComponent(JSON.stringify(dishObj))
			}).css({
				position: 'fixed',
				top: '5%',
				right: '5%',
				zIndex: 1050,
				background: '#fff',
				padding: '1em 2em',
				boxShadow: '0 0 1em rgba(0,0,0,.25)'
			}).appendTo('body');

			// Append modal backdrop
			$('<div />', {
				class: 'modal-backdrop'
			}).css({
				position: 'fixed',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: 1040,
				backgroundColor: '#000',
				opacity: 0.5
			}).appendTo('body');
		}
	}
});