var createObjectURL;

if(self.URL) {
	createObjectURL = URL.createObjectURL.bind(URL);
} else if(self.webkitURL) {
	createObjectURL = webkitURL.createObjectURL.bind(webkitURL);
} else {
	createObjectURL = function() {
		return '';
	};
}

module.exports = createObjectURL;