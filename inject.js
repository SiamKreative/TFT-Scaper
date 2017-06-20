$(function () {
	if (jQuery().tableToJSON) {
		// Object
		var dishObj = {};
		var dishJSON;

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
				headings: ['thai_name', 'thai_script', 'english_name', 'image', 'region', 'description'],
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