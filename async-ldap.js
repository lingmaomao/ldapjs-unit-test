/*
import Ldap from 'ldap-async'
export const ldap = new Ldap({
	// either
  url: 'ldap://yourhost:10389',
	// or
  host: 'yourhost',
  port: 10389,
  secure: false,

	// optional pool size (default is 5 simultaneous connections)
  poolSize: 5,

	// then your login and password
  bindDN: 'cn=root',
  bindCredentials: 'secret',

	// and any other options supported by ldapjs
  timeout: 30000
})

async function main() {
  const person = await ldap.get('cn=you,ou=people,dc=yourdomain,dc=com')
}
main().catch(e => console.error(e))
*/

//var Ldap=require('ldap-async')
const Ldap = require('ldap-async').default

ldap_port = 389
ldap_admin_user = 'ccr\\sys_drsimon'
ldap_admin_password = 'cce@fhm@drsimon_2022_2'

async function login(username, password) {
	if (!username || !password) {
		console.log("Both idsid and Password are required!")
	}

	console.log("username:", username)
	user_split = username.split("\\")
	console.log("user_split:", user_split)

	//ldap_host = 'ldap://'+ user_split[0]+'.corp.intel.com'
	ldap_host = 'ldap://amr.corp.intel.com'
	console.log(ldap_host)
	ldap_base_search = 'OU=Workers,DC=amr,DC=corp,DC=intel,DC=com'
	console.log("ldap_base_search:", ldap_base_search)

	const user_dn = user_split[1]+'@amr.corp.intel.com'
	console.log("dn:", user_dn)

	const ldap = new Ldap({
		// either
		url: ldap_host,
		port: ldap_port,
		secure: false,

		// optional pool size (default is 5 simultaneous connections)
		poolSize: 5,

		// then your login and password
		bindDN: user_dn,
		bindCredentials: password,

		// and any other options supported by ldapjs
		timeout: 3000
	})
	console.log("ldap:", ldap)


	//user='maomaoli'
	user='aaahmed'
	// const person = await ldap.get('cn=you,ou=people,dc=yourdomain,dc=com')
	//filter:'(&(memberOf=CN=FMTool-AD,OU=Managed,OU=Groups,DC=amr,DC=corp,DC=intel,DC=com)())',
	DN='ou=Workers,dc=amr,dc=corp,dc=intel,dc=com'
	console.log("DN:", DN)
	try {
		var people = await ldap.search(DN, {
			scope: 'sub',
			filter: ldap.filter`sAMAccountName=${user}`
		})
	} catch(err){
		console.log("err:")
		console.log(err)
		console.log("err end!")
		//return err msg
	}

	/*
	console.log("people:", people[0].dn)

	//password
	const dn = 'maomaoli'+'@ccr.corp.intel.com'
	passwd='Aa'
	const user_ldap = new Ldap({
		// either
		url: ldap_host,
		port: ldap_port,
		secure: false,

		// optional pool size (default is 5 simultaneous connections)
		poolSize: 5,

		// then your login and password
		bindDN: dn,
		bindCredentials: passwd,

		// and any other options supported by ldapjs
		timeout: 3000
	})
	console.log("user_ldap:", user_ldap)
	try{
		people = await user_ldap.search(DN, {
			scope: 'sub',
			filter: ldap.filter`sAMAccountName=${user}`
		})
	} catch(err){
		console.log("err:")
		console.log(err)
		console.log("err end!")
		//return err msg
	}

	//console.log("people:", people)
	*/

	return people
}

username=ldap_admin_user
password=ldap_admin_password
//login(username, password)
console.log("start")
login(username, password).catch(e => console.error(e))
console.log("end")


