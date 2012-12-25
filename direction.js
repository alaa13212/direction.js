/**
 * @projectDescription a small file that is used to fix the direction of HTML documents
 * @author Ali Al Brrak alaa13212@gmail.com
 * @version 0.1
 */

/** 
 * an array using to using file like {Direction.js( className )}
 * @type {Array}
 */
var Direction = [];
/**
 * fix the direction of HTML elements
 * @param {String} [className] the name of target's class
 */
Direction['js'] = function (className) {
	// \u0020 == space
	/**
	 * RTL characters ex: أ ب ت
	 * @type {String}
	 */
	var rtl = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
	/**
	 * LTR characters ex: a b c
	 * @type {String}
	 */
	var ltr = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
	/**
	 * two direction characters ex: ! @ # $
	 * @type {String}
	 */
	var dual = '!#-&+-/*:;=?@^_~\\\\|';
	/**
	 * brackets characters ex ( [ < ' " {
	 * 	@type {String}
	 */
	var dual2 = '"\'-)<>\\[\\]\\{\\}';
	/**
	 * test if the string is right to left or not
	 * @type {RegExp}
	 */
	var rtlRegx = new RegExp('^[^' + ltr + ']*[' + rtl + ' ]', 'm');
	/**
	 * test if the string is left to right or not
	 * @type {RegExp}
	 */
	var ltrRegx = new RegExp('^[^' + rtl + ']*[' + ltr + ' ]', 'm');
	/**
	 * RegExp to add "&lrm;" in right to left string after left to right string
	 * @type {RegExp}
	 */
	var inRtl = new RegExp('(([' + ltr + '\u0020]{2,}[' + dual + ']+)([' + dual2 + '\u0020]*[' + rtl + ']))|(([' + rtl + '][' + dual2 + '\u0020]*)([' + dual + ']+[' + ltr + '\u0020]{2,}))', 'gm');
	/**
	 * RegExp to add "&rlm;" in left to right string after right to left string
	 * @type {RegExp}
	 */
	var inLtr = new RegExp('(([' + rtl + '\u0020]{2,}[' + dual + ']+)([' + dual2 + '\u0020]*[' + ltr + ']))|(([' + ltr + '][' + dual2 + '\u0020]*)([' + dual + ']+[' + rtl + '\u0020]{2,}))', 'gm');
	/**
	 * RegExp to add "&lrm;" in left to right string inside right to left string
	 * @type {RegExp}
	 */
	var inRtl2 = new RegExp('([' + ltr + '\u0020]{2,}[' + dual2 + ']+)([' + ltr + '\u0020]{2,})', 'gm');
	/**
	 * RegExp to add "&rlm;" in right to left string inside left to right string
	 * @type {RegExp}
	 */
	var inLtr2 = new RegExp('([' + rtl + '\u0020]{2,}[' + dual2 + ']+)([' + rtl + '\u0020]{2,})', 'gm');
	/**
	 * the direction of the body
	 * @type {String}
	 */
	var BodyDir = document.body.dir;
	/**
	 * change direction of HTML element and add "&lrm;" or "&rlm;"
	 * @this {HTMLElement}
	 */
	function direction() {
		/**
		 * self is this
		 * @type {HTMLElement}
		 */
		var self = this;
		/**
		 * the inner text of the element
		 * @type {String}
		 */
		var text = self.innerText;
		/**
		 * the inner HTML of the element
		 * @type {String}
		 */
		var html = self.innerHTML;
		/**
		 * test if the element direction of inner text is right to left or not
		 * @type {Boolean}
		 */
		isRtl = rtlRegx.test(text) ? true : ltrRegx.test(text) ? false : null;
		if (isRtl === true) {
			// if element direction is RTL make it LTR
			if (BodyDir != 'rtl' || self.dir == 'ltr'){
				self.style.direction = 'rtl';
			}
			// add &rlm; and &lrm;
			html = html.replace(inRtl, '$2$5&lrm;$3$6');
			html = html.replace(inRtl2, '$1&rlm;$2');
			self.innerHTML = html;
		} else if (isRtl === false) {
			if (BodyDir != 'ltr' || self.dir == 'rtl'){
				self.style.direction = 'ltr';
			}
			html = html.replace(inLtr, '$2$5&rlm;$3$6');
			html = html.replace(inLtr2, '$1&lrm;$2');
			self.innerHTML = html;
		}
	}

	/**
	 * the list of elements that need to fixed
	 * @type {NodeList}
	 */
	var dirEl = document.body.getElementsByClassName(className);
	/**
	 * length of the elements list for using in loop
	 * @type {Number}
	 */
	var length = dirEl.length;
	// the faster loop
	while (length--) {
		// call the direction funtion but make (this = dirEl[length]) inside the function
		direction.call(dirEl[length]);
	}
};