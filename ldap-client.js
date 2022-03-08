var ldap = require('ldapjs');

ldap_port = 389
ldap_admin_user = 'ccr\\sys_drsimon'
ldap_admin_password = 'cce@fhm@drsimon_2022_2'

function login(username, password) {
  if (!username || !password) {
    console.log("Both idsid and Password are required!")
  }

  console.log("username:", username)
  user_split = username.split("\\")
  console.log("user_split:", user_split)

  ldap_host = 'ldap://ccr.corp.intel.com'
  console.log(ldap_host)

  //create client
  var client = ldap.createClient({
    url: ldap_host,
    port: ldap_port
  })
  const dn = user_split[1] + '@ccr.corp.intel.com'
  console.log("dn:", dn)

  ldap_base_search='OU=Workers,DC=amr,DC=corp,DC=intel,DC=com'
  console.log("ldap_base_search:", ldap_base_search)

  var SearchSuccess = false
  //bind search account
  client.bind(dn, password, function (err, res1) {
    //client.bind(user_split[1], ldap_admin_password, function (err, res1) {
    if (err) {
      console.log("\nconnect error, bind error");
      console.log('Error is:', err)
    }
  })

  //user = 'maomaoli'
  user='aaahmed'

  /*
    var opts = {
      filter:'(&(memberOf=CN=FMTool-AD,OU=Managed,OU=Groups,DC=amr,DC=corp,DC=intel,DC=com)(sAMAccountName='+user+'))',
      scope: 'sub',     
      timeLimit: 500   
    }
  */
  var opts = {
    filter: '(sAMAccountName='+user+')',
    scope: 'sub',
    timeLimit: 500
  }

  client.search(ldap_base_search, opts, function (err, res2) {
    res2.on('searchEntry', function (entry) {
      SearchSuccess = true
      var user = entry.object
      console.log("user.dn:", user.dn)
    })

    //search error
    res2.on('error', function (err) {
      SearchSuccess = false
      client.unbind()
      console.log("not in LDAP")
    })

    //search end
    res2.on('end', function (result) {
      client.unbind()
      console.log("end")
    })
  })
}

username = ldap_admin_user
password = ldap_admin_password
login(username, password)