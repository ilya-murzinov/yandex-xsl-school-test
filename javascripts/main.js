function toggleProblem(number) {
    var element = document.getElementById("problem" + number);
    if (element.style.display != "block") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
};

function showCode(number) {
    var element = document.getElementById("code" + number);
    if (element.style.display != "block") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
};

function showParsedUrl() {
	var object = toObject(document.getElementById("url").value);
	showObject(object, document.getElementById("result"));
};

function showObject(object, parent) {
	parent.innerHTML = "<p>Result: Object" + toString(object) + "</p>";
};

function equateForms() {
    document.getElementById("firstName2").value = 
        document.getElementById("firstName1").value;
    document.getElementById("lastName2").value = 
        document.getElementById("lastName1").value;
    return false;
};

function compareForms() {
    var form1 = {
        "firstName": document.getElementById("firstName1").value,
        "lastName": document.getElementById("lastName1").value,
        "login": document.getElementById("login").value
    }
    var form2 = {
        "firstName": document.getElementById("firstName2").value,
        "lastName": document.getElementById("lastName2").value,
        "email": document.getElementById("email").value
    }
    document.getElementById("comparationResult").innerHTML =
    	"<p>Result: Object" + toString(compare(form1, form2)) + "</p>";
	return false;
};

function toString(object) {
	var result = "{<br>";
	for (var parameter in object) {
        if (object.hasOwnProperty(parameter)) {
        	if (typeof object[parameter] != 'object') {
	        	result += parameter + ": \"" + object[parameter] + "\";<br>";
        	} else {
        		result += parameter + ": " + toString(object[parameter]) + ";<br>";
        	}
        }
    }
    result += "}";
    return result;
}

/*
Parse URL into object.
*/
function toObject(url) {
    var parameters = url.split('?')[1];
    if (parameters != '') {
        var result = {};
        var keyValue = parameters.split('&');
        for (i = 0; i < keyValue.length; i++) {
            var key = keyValue[i].split('=')[0];
            var value = keyValue[i].split('=').splice(1, keyValue.length).join('=');
            result[key] = value;
        }
        return result;
    }
};

/*
Serialize object to query.
*/
function toQuery(object) {
    var result = [];
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            result.push(key + '=' + object[key]);
        }
    }
    return result.join('&');
};

/*
Add query to URL.
Parameter replaceExisting is true by default.
*/
function addQuery(baseUrl, query, replaceExisting) {
    if (replaceExisting || typeof(replaceExisting) == 'undefined') {
        baseUrl = baseUrl.split('?')[0].concat('?' + query);
        return baseUrl + query;
    } else {
        baseUrl = baseUrl.concat('&' + query);
        return baseUrl + query;
    }
};

/*
Compare pair of objects.
*/
function compare(form1, form2) {
    var result = {};
    for (var parameter in form1) {
        if (form1.hasOwnProperty(parameter)) {
            if (typeof form2[parameter] != 'undefined') {
                if (form1[parameter] == form2[parameter]) {
                    delete form1[parameter];
                    delete form2[parameter];
                } else {
                    result[parameter] = {
                        'status': 'changed',
                        'oldValue': form1[parameter],
                        'newValue': form2[parameter]
                    };
                }
            } else {
                result[parameter] = {
                    'status': 'removed',
                    'value': form1[parameter]
                };
            }
        }        
    }
    for (var parameter in form2) {
        if (form2.hasOwnProperty(parameter)) {
            if (typeof form1[parameter] == 'undefined') {
                result[parameter] = {
                    'status': 'added',
                    'value': form2[parameter]
                };
            }
        }
    }
    return result;
};

/*
Compare pair of queries.
*/
function compareQueries(query1, query2) {
    var form1 = toObject(query1);
    var form2 = toObject(query2);
    return compare(form1, form2);
};
