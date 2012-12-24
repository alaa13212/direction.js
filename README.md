[Direction.js] (http://alaa13212.github.com/direction.js)
============
  هو ملف يقوم بإصلاح إتجاه الرموز في النصوص ثنائية الإتجاه
Is a file fixes the direction of the symbols in BiDirectional texts
##الإصدار
هذه نسخة **تجريبية** وقد يكون بها الكثير من الأخطاء يمكنك الإبلاغ عنها من [هنا] (https://github.com/alaa13212/direction.js/issues).  
This is **Beta** version may be a lot of mistakes can be reported [here] (https://github.com/alaa13212/direction.js/issues)
##الرخصة
  لا أحتكر هذا العمل القليل بل يمكن لأي أحد أن يحرره ويستخدمه بدون الإساءة للآخرين
this little work everyone can edit it and uses it without offending others
##العلل المكتشفة
‫   يجب أن لا يحوي الوسم المراد إصلاحه وسوم HTML أخرى
‫ must not contain the tag to be fix other HTML Tags
##طريقة الإستخدام
‫قبل وسم إغلاق جسم وثيقة HTML أضف كود تضمين الملف
```
		<script src="direction.js"></script>
	</body>
```
‫وبعده ضع كود JavaScrip التالي مع تغيير className للاسم الذي تريده
```
	Direction.js( 'className' );
```
‫ثم أضف لكل وسم HTML تريد إصلاحه الصنف "class" الذي وضعته مكان className


ثم أبلغ عن الأاخطاء التي تراها في الملف
