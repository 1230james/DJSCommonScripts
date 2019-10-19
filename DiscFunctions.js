// Variables
const Discord = require("discord.js");
const moment = require("moment");
const log = (msg) => { // Console log w/ timestamp
    console.log(`[${moment().format("MM-DD-YYYY HH:mm:ss")}] ${msg}`);
};

// ================================================

// Send Message
module.exports.sendMessage = function(message,msg,logm) {
    message.channel.send(msg)
    if (logm) { // If log (the parameter) is null, then don't log something in the console
	if (message.channel.type === 'text') { // Text channel vs DM check
	    log('[' + message.guild.name + ', @' + message.author.username + ', #' + message.channel.name + ']: ' + logm)
	} else if (message.channel.type === 'dm') {
	    log('[@' + message.author.username + ', a DM]: ' + logm)
	}
    }
}

// Send DM
module.exports.sendDM = function(message,msg,logm) {
    message.author.send(msg)
    if (logm) {
	if (message.channel.type === 'text') {
	    log('[' + message.guild.name + ', @' + message.author.username + ', #' + message.channel.name + ']: ' + logm)
	} else if (message.channel.type === 'dm') {
	    log('[@' + message.author.username + ', a DM]: ' + logm)
	}
    }
}

// Send File
module.exports.sendFile = function(message,filepath, logm) {
    var files = {}
    files.files = [filepath]
    message.channel.send(files)
    if (logm) {
	if (message.channel.type === 'text') {
	    log('[' + message.guild.name + ', @' + message.author.username + ', #' + message.channel.name + ']: ' + logm)
	} else if (message.channel.type === 'dm') {
	    log('[@' + message.author.username + ', a DM]: ' + logm)
	}
    }
}

// Set Roles
module.exports.setRoles = function(member,newRoles,oldRoles) { //newRoles and oldRoles must be ARRAYS with role ids to add/remove respectively
    console.log("Retrieving discord roles...");
    let userRoles = {};
    let rolesMap = member.roles;
    
    console.log("Filtering discord roles...");
    for (let [key, val] of rolesMap) { // This is for iterating Maps in JS. In this case, we're just spitting out all the keys into an array.
	userRoles[key] = true;
    }
    
    for (let oldRoleId of oldRoles) {
	userRoles[oldRoleId] = false;
    }
    console.log("Adding new discord roles...");
    for (let newRoleId of newRoles) {
	userRoles[newRoleId] = true;
    }
    
    console.log("Setting discord roles...");
    let userRolesArr = [];
    for (roleId in userRoles) {
	if (userRoles[roleId]) userRolesArr.push(roleId);
    }
    member.setRoles(userRolesArr);
}

// Get Role ID
module.exports.getRoleID = function(guild,roleName) { // roleName should be a string; returns role ID number of the given role
    let roles = guild.roles;
    for (let role of roles) {
	if (role.find("name",roleName)) {
	    return role.find("name",roleName).id;
	}
    }
    return;
}

// Check if they have role
module.exports.memberHasRole = function(member,arg) { // arg needs to be a string, but can either be role name or role id/snowflake
    let roles = member.roles;
    if (roles.find("name",arg) || roles.get(arg)) {
	return true;
    }
    return false;
}
