const sessionidToUser=new Map()

function setuser(id,user){
    sessionidToUser.set(id,user)
}

function getuser(id){
    return sessionidToUser.get(id)
}

module.exports={
    setuser,
    getuser,
}