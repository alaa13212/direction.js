<?php
	/**
	 * Copyright :
	 *  Cliprz model view controller framework.
	 *  Copyright (C) 2012 - 2013 By Yousef Ismaeil.
	 *
	 * Framework information :
	 *  Version 1.0.0 - Stability Stable.
	 *  Official website http://www.cliprz.org .
	 *
	 * File information :
	 *  File path BASE_PATH/cliprz_application/libraries/direction/ .
	 *  File name direction.php .
	 *  Created date 20/01/2012 04:00 PM
	 *  Last modification date 23/01/2013 6:04 PM.
	 *
	 * Description :
	 *  direction library class.
	 *    @category    : library
	 *    @drivers     : direction
	 *    @package     : Cliprz::Framework
	 * Licenses :
	 *  This program is released as free software under the Affero GPL license. You
	 * can redistribute it and/or
	 *  modify it under the terms of this license which you can read by viewing the
	 * included agpl.txt or online
	 *  at www.gnu.org/licenses/agpl.html. Removal of this copyright header is
	 * strictly prohibited without
	 *  written permission from the original author(s).
	 * @author علي آل براك.
	 * @works in Cliprz Programming team.
	 *
	 *  \x{0020} = \u0020 = space = " "
	 */

	if ( !defined("IN_CLIPRZ"))
		die('Access Denied');

	class library_direction {
		/**
		 * @var (array) $regexp Array of needed RegExp
		 * @access public
		 */
		public $regexp = array();

		/**
		 * @var (string) $rtl List of Right-To-Left characters (أ ب ت)
		 * @access public
		 */
		public $rtl = '\x{0591}-\x{07FF}\x{FB1D}-\x{FDFD}\x{FE70}-\x{FEFC}';

		/**
		 * @var (string) $ltr List of Left-To-Right characters
		 * @access public
		 */
		public $ltr = 'A-Za-z\x{00C0}-\x{00D6}\x{00D8}-\x{00F6}\x{00F8}-\x{02B8}\x{0300}-\x{0590}\x{0800}-\x{1FFF}\x{2C00}-\x{FB1C}\x{FDFE}-\x{FE6F}\x{FEFD}-\x{FFFF}';

		/**
		 * @var (string) $daul List of dual characters without Bracket
		 * @access public
		 */
		public $dual = '!#-&+-\\/*:;=?@^_~\\|\\\\';

		/**
		 * @var (string) $daul List of Bracket characters
		 * @access public
		 */
		public $dual2 = '"\'\-)<>\\[\\]\\{\\}';

		/**
		 * Set the needed RegExp
		 */
		public function __construct() {
			$this -> regexp['testRtl'] = "/^[^{$this->ltr}]*[{$this->rtl}]/mu";
			$this -> regexp['testLtr'] = "/^[^{$this->rtl}]*[{$this->ltr}]/mu";
			// 1( 2( ) 3( ) )	4( 5( ) 6( ) )
			$this -> regexp['fixRtl'] = "/(([{$this->ltr}\x{0020}]{2,}[{$this->dual}]+)([{$this->dual2}\x{0020}]*[{$this->rtl}]))" .
										"|(([{$this->rtl}][{$this->dual2}\x{0020}]*)([{$this->dual}]+[{$this->ltr}\x{0020}]{2,}))/u";

			$this -> regexp['fixLtr'] = "/(([{$this->rtl}\x{0020}]{2,}[{$this->dual}]+)([{$this->dual2}\x{0020}]*[{$this->ltr}]))" .
										"|(([{$this->ltr}][{$this->dual2}\x{0020}]*)([{$this->dual}]+[{$this->rtl}\x{0020}]{2,}))/u";

			// 1() 2()
			$this -> regexp['fixRtl2'] = "/([{$this->rtl}\x{0020}]{2,}[{$this->dual2}]+)([{$this->ltr}\x{0020}])/u";
			$this -> regexp['fixLtr2'] = "/([{$this->ltr}\x{0020}]{2,}[{$this->dual2}]+)([{$this->rtl}\x{0020}])/u";

			// 1()
			$this -> regexp['embedRtl'] = "/^([{$this->ltr} ]*[{$this->rtl}])/mu";
			$this -> regexp['embedLtr'] = "/^([{$this->rtl} ]*[{$this->ltr}])/mu";

		}

		/**
		 * Fix the text
		 *
		 * @param (string) $text Text that you want repaired it
		 * @param (string) $dir The direction of your website (<body dir="??">)
		 * @return (string) the repaired Text
		 */
		public function bidi($text = '', $dir = 'dual') {
			$textDir = (preg_match($this -> regexp['testRtl'], $text)) ? (preg_match($this -> regexp['testLtr'], $text)) ? 'dual' : 'rtl' : 'ltr';

			if ($dir == $textDir) {
				if ($dir == 'dual') {
					$text = preg_replace($this -> regexp['fixRtl'], '$2$5' . c_utf8('200E') . '$3$6', $text);
					$text = preg_replace($this -> regexp['fixLtr'], '$2$5' . c_utf8('200F') . '$3$6', $text);
					$text = preg_replace($this -> regexp['fixRtl2'], '$1' . c_utf8('200F') . '$2', $text);
					$text = preg_replace($this -> regexp['fixLtr2'], '$1' . c_utf8('200E') . '$2', $text);

					$text = preg_replace($this -> regexp['embedRtl'], c_utf8('202B') . '$1', $text);
					$text = preg_replace($this -> regexp['embedLtr'], c_utf8('202A') . '$1', $text);
				} elseif ($dir == 'rtl') {
					$text = preg_replace($this -> regexp['fixRtl'], '$2$5' . c_utf8('200E') . '$3$6', $text);
					$text = preg_replace($this -> regexp['fixRtl2'], '$1' . c_utf8('200F') . '$2', $text);
				} else {
					$text = preg_replace($this -> regexp['fixLtr'], '$2$5' . c_utf8('200F') . '$3$6', $text);
					$text = preg_replace($this -> regexp['fixLtr2'], '$1' . c_utf8('200E') . '$2', $text);
				}

			} elseif ($textDir == 'rtl') {
				$text = preg_replace($this -> regexp['fixRtl'], '$2$5' . c_utf8('200E') . '$3$6', $text);
				$text = preg_replace($this -> regexp['fixRtl2'], '$1' . c_utf8('200F') . '$2', $text);
				$text = preg_replace($this -> regexp['embedRtl'], c_utf8('202B') . '$1', $text);
			} else {
				$text = preg_replace($this -> regexp['fixLtr'], '$2$5' . c_utf8('200F') . '$3$6', $text);
				$text = preg_replace($this -> regexp['fixLtr2'], '$1' . c_utf8('200E') . '$2', $text);
				$text = preg_replace($this -> regexp['embedLtr'], c_utf8('202A') . '$1', $text);
			}
			return $text;
		}

	}

	/**
	 * تحول أرقام الرموز السدس عشرية إلى رموز
	 * ‫هذه الدالة ليست من إنشائي بل وجدتها في stackoverflow معلوماتها
	 * @author vstm {http://stackoverflow.com/a/7709863/1592847}
	 * @param {string} $ewchar - the hex number of char
	 * @return {string} char
	 */
	function c_utf8($ewchar) {
		$binwchar = hexdec($ewchar);
		$wchar = chr(($binwchar>>8) & 0xFF) . chr(($binwchar) & 0xFF);
		return iconv("unicodebig", "utf-8", $wchar);
	}
?>