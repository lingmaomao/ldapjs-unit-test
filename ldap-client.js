//require "ldapjs"
var ldap = require('ldapjs');

ldap_port = 389
ldap_admin_user = 'ccr\\sys_drsimon'
ldap_admin_password = 'cce@fhm@drsimon_2022_2'

function login(username, password) {
	/*
  user_split = username.split("\\")
  console.log("user_split:", user_split)

  ldap_base_search = 'OU=Workers,DC='+user_split[0]+',DC=corp,DC=intel,DC=com'
  
    var admin_client = ldap.createClient({
      url: 'ldap://ccr.corp.intel.com'
      port: ldap_port
    })
    const dn = user_split[1]+'@ccr.corp.intel.com'
  	console.log("dn:", dn)
    var SearchSuccess = false
    //bind search account
    client.bind(dn, password, function (err, res1) {
      if (err) {
      console.log('Error is:', err)
        console.log("Incorrect username or password! (idsid, ccr\\maomaoli)");
    }
    })
	*/



  if (!username || !password) {
  	console.log("Both idsid and Password are required!")
  }

  console.log("username:", username)
  user_split = username.split("\\")
  console.log("user_split:", user_split)

  ldap_host = 'ldap://'+ user_split[0]+'.corp.intel.com'
  console.log(ldap_host)
  ldap_base_search = 'OU=Workers,DC='+user_split[0]+',DC=corp,DC=intel,DC=com'
  console.log("ldap_base_search:", ldap_base_search)
  
    //create client
    var client = ldap.createClient({
      url: ldap_host,
      port: ldap_port
    })
    const dn = user_split[1]+'@ccr.corp.intel.com'
  	console.log("dn:", dn)
    var SearchSuccess = false
    //bind search account
    client.bind(dn, password, function (err, res1) {
      if (err) {
      console.log('Error is:', err)
        console.log("Incorrect username or password! (idsid, ccr\\maomaoli)");
		  /*
      return reject({
        error: "WRONG_CREDENTIAL",
        message: `Incorrect username or password! (idsid, ccr\\maomaoli)`,
      })
	  */
    }
    })

	user='maomaoli'
    var opts = {
      filter:'(&(memberOf=CN=FMTool-AD,OU=Managed,OU=Groups,DC=amr,DC=corp,DC=intel,DC=com)(sAMAccountName='+user+'))',
      scope: 'sub',     
      timeLimit: 500   
    }

    client.search('ou=Workers,dc=ccr,dc=corp,dc=intel,dc=com', opts, function (err, res2) {
      res2.on('searchEntry', function (entry) {
        SearchSuccess = true
        var user = entry.object
		  console.log("user:", user)
      })

      //search error
      res2.on('error', function (err) {
        SearchSuccess = false
        client.unbind()
		  /*
        return reject({
          error: "WRONG_CREDENTIAL",
          message: `You are not a member of FMTool-access, please register in AGS!`,
        })
		*/
          console.log("You are not a member of FMTool-access, please register in AGS!")
      })

      //search end
      res2.on('end', function (result) {
        client.unbind()
          console.log("end")
      })
    })
}

username=ldap_admin_user
password=ldap_admin_password
login(username, password)
