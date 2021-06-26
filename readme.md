# API DOC

### GET scheduled
send all scheduled mails

### GET scheduled:id
send only the scheduled mail with this id

### POST schedule
add the mail to the database so it gets listed in GET scheduled and GET scheduled:id

### GET sent
send all the sent mails

### GET sent:id
send only the sent mail with this id

### POST send
add the mail to the databse so it gets listed in GET sent and GET sent:id

### POST login
if the user is valid send the JWT token

### POST register
if the user can be added. add the user to the database and send the JWT token
