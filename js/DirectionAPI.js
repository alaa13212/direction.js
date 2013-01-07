/**
 * @projectDescription a small file that is used to fix the direction of HTML documents
 * @author Ali Al Brrak alaa13212@gmail.com
 * @version 0.2
 */

/**
 * an array using to using file like {Direction.js( className )}
 * @type {Array}
 */
var Direction = {};
/**
 * class for fixed text
 * @class
 * @param {String} text
 * @param {Boolean} isRtl
 */
Direction.FixedText = function(text, isRtl) {
    this.text = text || "?? ????";
    this.isRtl = isRtl || true;
    this.toString = function() {
        return this.text;
    };
};
/**
 * the list of needed RegEep
 * @type {object}
 */
Direction.regexp = (function() {
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
     * object has all RegExp
     * @type {object}
     */
    var regexp = {};
    /**
     * test if the string is right to left or not
     * @type {RegExp}
     */
    regexp.rtlRegx = new RegExp('^[^' + ltr + ']*[' + rtl + ' ]', 'm');
    /**
     * test if the string is left to right or not
     * @type {RegExp}
     */
    regexp.ltrRegx = new RegExp('^[^' + rtl + ']*[' + ltr + ' ]', 'm');
    /**
     * RegExp to add "&lrm;" in right to left string after left to right string
     * @type {RegExp}
     */
    regexp.inRtl = new RegExp('(([' + ltr + '\u0020]{2,}[' + dual + ']+)([' + dual2 + '\u0020]*[' + rtl + ']))|(([' + rtl + '][' + dual2 + '\u0020]*)([' + dual + ']+[' + ltr + '\u0020]{2,}))', 'gm');
    /**
     * RegExp to add "&rlm;" in left to right string after right to left string
     * @type {RegExp}
     */
    regexp.inLtr = new RegExp('(([' + rtl + '\u0020]{2,}[' + dual + ']+)([' + dual2 + '\u0020]*[' + ltr + ']))|(([' + ltr + '][' + dual2 + '\u0020]*)([' + dual + ']+[' + rtl + '\u0020]{2,}))', 'gm');
    /**
     * RegExp to add "&lrm;" in left to right string inside right to left string
     * @type {RegExp}
     */
    regexp.inRtl2 = new RegExp('([' + ltr + '\u0020]{2,}[' + dual2 + ']+)([' + ltr + '\u0020]{2,})', 'gm');
    /**
     * RegExp to add "&rlm;" in right to left string inside left to right string
     * @type {RegExp}
     */
    regexp.inLtr2 = new RegExp('([' + rtl + '\u0020]{2,}[' + dual2 + ']+)([' + rtl + '\u0020]{2,})', 'gm');

    return regexp;
})();

/**
 * the direction of the body
 * @type {String}
 */
Direction.BodyDir = document.body.dir;
/**
 * the list of fixing class
 * @type {Array}
 */
Direction.classList = [];

/**
 * add class to classList and fix it
 * @param {String} className The name of class for fixing element
 * @return {viod}
 */
Direction.js = function(className) {
    this.classList.push(className);
};

/**
 *
 * @param {String} text text to fix
 * @return {Object} fixed text and is RTL {text, isRtl}
 */
Direction.dirText = function(text) {

    var isRtl = this.regexp.rtlRegx.test(text) ? true : !this.regexp.ltrRegx.test(text);
    if (isRtl) {
        text = text.replace(this.regexp.inRtl, '$2$5\u200E$3$6');
        text = text.replace(this.regexp.inRtl2, '$1\u200F$2');
    } else if (!isRtl) {
        text = text.replace(this.regexp.inLtr, '$2$5\u200F$3$6');
        text = text.replace(this.regexp.inLtr2, '$1\u200E$2');
    }

    return new Direction.FixedText(text, isRtl);
};
/**
 * @param {HTMLElement} elem Element to fix
 * @return {String} fixed text
 */
Direction.dirElem = function(elem) {
    var html = elem.value;
    var fixedHtml = this.dirText(html);
    if (fixedHtml.isRTL && this.bodyDir !== 'rtl') {
        elem.dir = 'rtl';
    }
    if (!fixedHtml.isRTL && !(this.bodyDir !== 'rtl')) {
        elem.dir = 'rtl';
    }
    elem.value = fixedHtml.text;
};

Direction.dirElemLoop = function() {
    var i = this.classList.length;
    while (i--) {
        var elems = document.getElementByClassName(this.classList[i]);
        j = elems.length;
        while (j--) {
            this.dirElem(elems[j]);
        }
    }
};