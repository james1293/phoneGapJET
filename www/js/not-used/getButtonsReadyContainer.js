define(function () {
	var localVarTest = "no way";
	var localFuncTest = function () {
		localVarTest += "more stuff";
		alert(localVarTest);
	};
    return {
        getButtonsReady: function () {
			var myEl = document.getElementById('testingbutton');

			myEl.addEventListener('click', function() {
				localFuncTest();
			}, false);

			myEl.addEventListener('click', function() {
				alert('Hello world again!!!');
			}, false);
        },
    };
});


