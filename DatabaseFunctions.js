// Database Management
// About time tbh holy fuzzy

// Libraries
const FS = require("fs"); // File System

// Variables
	// uhhhhh guess theres nothing lmao

// ======================================================

// Write to file, given filename and data
exports.writeData = function(filename,data,callback) {
	if (typeof(callback) == "function") {
		FS.writeFile(filename,data,callback);
	} else {
		FS.writeFileSync(filename,data);
	}
}

// Write to file, given an object with key-value pairs from which the file data will be sourced
// Returns updated value of 'object', since that's easier than re-reading the file afterwards
exports.writeObjToJSON = function(filename,object,key,value,callback) {
	object[key] = value;
	let data = JSON.stringify(object,null,4);
	if (typeof(callback) == "function") {
		FS.writeFile(filename,data,callback);
	} else {
		FS.writeFileSync(filename,data);
	}
	return object;
}

// Read from file
exports.read = function(filename) {
	try {
		let data = FS.readFileSync(filename);
		return data;
	} catch(err) { return err; }
}