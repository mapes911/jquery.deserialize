function resetForm(el){
	$("input", el).each(function(index, element){
		$(element).val($(element).attr("default"))
	})
}

$(function(){
	module("core extension")

	test("requirements", function() {
		expect(1);
		ok(Array.prototype.toHash, "Array.toHash()")
	})

	test("conversion", function() {
		expect(3)
		same([].toHash(), {}, "empty array should produce empty hash")
		deepEqual(['a'].toHash(), {'a' : ''}, "toHash() should set values to ''")
		deepEqual(['a', 1].toHash(), {'a' : '', 1 : ''}, "toHash() should handle any kind of objects")
	})

	test("inclusion", function() {
		expect(3)
		equal(1 in [].toHash(), false, "empty hash should contains nothing")
		equal('a' in ['a'].toHash(), true, "hash should contain its elements")
		deepEqual(2 in ['a', 1].toHash(), false, "hash should contain only its elements")
	})

	module("jquery.deserialize")

	test("requirements", function() {
		expect(3);
		ok(jQuery, "jQuery");
		ok($, "$");
		ok($("#form").deserialize, "$.deserialize")
	})

	test("simple deserialization", function(){
		expect(4)
		var form = $("#form1")
		equal($("#one", form).val(), "123", "before setting one")
		equal($("#two", form).val(), "123", "before setting two")
		form.deserialize("one=abc")
		equal($("#one", form).val(), "abc", "one parameter should be set")
		equal($("#two", form).val(), "123", "two parameter should not be set")

		resetForm(form)
	})

	test("except option", function(){
		expect(4)
		var form = $("#form1")
		equal($("#one", form).val(), "123", "before setting one")
		equal($("#two", form).val(), "123", "before setting two")
		form.deserialize("one=abc&two=abc", { except : ['two'] })
		equal($("#one", form).val(), "abc", "one parameter should be set")
		equal($("#two", form).val(), "123", "two parameter should not be set")

		resetForm(form)
	})

	test("only option", function(){
		expect(4)
		var form = $("#form1")
		equal($("#one", form).val(), "123", "before setting one")
		equal($("#two", form).val(), "123", "before setting two")
		form.deserialize("one=abc&two=abc", { only : ['one'] })
		equal($("#one", form).val(), "abc", "one parameter should be set")
		equal($("#two", form).val(), "123", "two parameter should not be set")

		resetForm(form)
	})

	test("callback option", function(){
		expect(6)
		var form = $("#form1")
		equal($("#one", form).val(), "123", "before setting one")
		equal($("#two", form).val(), "123", "before setting two")
		form.deserialize("one=abc&two=abc", { callback : function(){
			ok(true, "function called")
		}})
		equal($("#one", form).val(), "abc", "one parameter should be set")
		equal($("#two", form).val(), "abc", "two parameter should not be set")

		resetForm(form)
	})

	test("callback_on option", function(){
		expect(7)
		var form = $("#form1")
		equal($("#one", form).val(), "123", "before setting one")
		equal($("#two", form).val(), "123", "before setting two")
		form.deserialize("one=abc&two=abc", {
			callback_on : ['one'],
			callback : function(_name, value){
				ok(true, "function called")
				equal(_name, "one", "should be called on one")
				equal(value, "abc", "should be called with value equal to 'abc'")
			}
		})
		equal($("#one", form).val(), "abc", "one parameter should be set")
		equal($("#two", form).val(), "abc", "two parameter should not be set")

		resetForm(form)
	})

	test("attribute option", function(){
		expect(4)
		var form = $("#form1")
		equal($("#one", form).val(), "123", "before setting one")
		equal($("#two", form).val(), "123", "before setting two")
		form.deserialize("oneone=abc&twotwo=abc", {attribute : "class"})
		equal($("#one", form).val(), "abc", "one parameter should be set")
		equal($("#two", form).val(), "abc", "two parameter should not be set")

		resetForm(form)
	})
})

