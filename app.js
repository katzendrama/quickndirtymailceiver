const SMTPServer = require("smtp-server").SMTPServer
const parser = require("mailparser").simpleParser
const fs = require('fs')

const server = new SMTPServer({
  onData(stream, session, callback) {
    parser(stream, {}, (err, parsed) => {
      if (err)
        console.log("Fehler:" , err)
      var filename = new Date().toISOString().split('T')[0] + "_" + new Date().toISOString().split('T')[1].split('.')[0] + "_mail"
      fs.writeFile("mails/" + filename, JSON.stringify(parsed,null, 2), function(err) {
        if(err) throw err
        console.log('Mail gespeichert')
      })
      //console.log(parsed)
      stream.on("end", callback)
    })

  },
  disabledCommands: ['AUTH']
});

server.listen(25, "0.0.0.0")
