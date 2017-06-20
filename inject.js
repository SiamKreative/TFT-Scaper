$(function () {
	if (jQuery().tableToJSON) {
		// Object
		var dishObj = {};
		var dishJSON;
		var heading;
		var headings = [];

		// Get Table Headings
		$('table.wikitable:first .headerSort').each(function (index, el) {
			heading = $(el).text().replace(/\s+/g, '_').toLowerCase();
			headings.push(heading);
		});

		// Clean HTML
		$('.hatnote').remove();
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
				textExtractor: {
					3: function (cellIndex, $cell) {
						// Get the image src attribute
						var imgUrl = $cell.find('a.image>img').attr('src');
						// Get bigger image URL
						if (imgUrl) {
							return imgUrl.replace('110px-', '640px-');
						}
					}
				}
			});

			// Merge all objects
			dishObj[categorySlug] = table;
			dishJSON = JSON.stringify(dishObj);
		});

		// Output to console
		console.log(dishJSON);
	}
});