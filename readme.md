## To Do

| Task | Description | Status |
| :----| :-----------| :------|
| POST register | if the user can be added. add the user to the database and send the JWT token | ✔️  |
| POST login | if the user is valid send the JWT token | ✔️ |
| POST send | add the mail to the databse so it gets listed in GET sent and GET sent/:id | ✔️ |
| GET sent | send all the sent mails in response | ✔️ |
| GET sent/:id | send only the sent mail with this id in response | ✔️ |
| POST schedule | add the mail to the database so it gets listed in GET scheduled and GET scheduled/:id | 🚧 |
| GET scheduled | send all scheduled mails in response | 🚧 |
| GET scheduled/:id | send only the scheduled mail with this id in response | 🚧 |
| POST recurring | add the mail to the database so it gets listed in GET recurring and GET recurring/:id | 🚧 |
| GET recurring | send all recurring mails in response | 🚧 |
| GET recurring/:id | send only the recurring mail with this id in response | 🚧 |

🚧 - Routes are working, mails can be added/retrieved to/from the database, but the application lacks the functionality of scheduling and recurring (we are working on it right now), also need to figure out a way to actually send _mails_ to the recipients.

## API Reference
Note: Parameters are to be included in the name attribute of respective input elements.
<br>Note: Except for `/register` and `/login`, for all other routes, it is expected to have token in the request header as <br>`token:<the-token>` .
#### Register

```http
  POST /api/register
```

| Parameters  | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `username`  | `string` | **Required**.              |
| `password`  | `string` | **Required**               |

Returns a token in response (valid for time specified in`JWT_EXPIRE_IN`)

#### Login

```http
  POST /api/login
```

| Parameters  | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `username`  | `string` | **Required**.              |
| `password`  | `string` | **Required**               |

Returns a token in response (valid for time specified in`JWT_EXPIRE_IN`)

#### Send mail

```http
  POST /api/send/mail/send
```

| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `to`       | `string` | **Required**.<br>A valid email address    |
| `cc`       | `string` | if more than one, a `,` seperated string<br>e.g. `'abc@gmail.com,def@gmail.com'`|
| `bcc`      | `string` | if more than one, a `,` seperated string<br>e.g. `'abc@gmail.com,def@gmail.com'`|
| `subject`  | `string` | **Required**.<br>Should be less than 30 characters |
| `body`     | `string` | **Required**.                     |

Returns the id of the just stored mail

### Get all mails that are sent
```http
 GET /api/send/mail/sent
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

Returns all the mails, that are sent

### Get the mail that is sent with id
```http
 GET /api/send/mail/sent/${id}
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

For example to get a mail with id 4, send a `GET` request at `/api/send/mail/sent/4`
<br>Returns only the required mail

#### Schedule a mail

```http
  POST /api/schedule/mail/schedule
```

| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `to`       | `string` | **Required**.<br>A valid email address    |
| `cc`       | `string` | if more than one, a `,` seperated string<br>e.g. `'abc@gmail.com,def@gmail.com'`|
| `bcc`      | `string` | if more than one, a `,` seperated string<br>e.g. `'abc@gmail.com,def@gmail.com'`|
| `subject`  | `string` | **Required**.<br>Should be less than 30 characters |
| `body`     | `string` | **Required**.                     |
| `scheduledTo`| `Date` | **Required**.<br>A valid Date to send the mail on |

Returns the id of the just stored mail (that was just scheduled)

### Get all mails that are scheduled
```http
 GET /api/schedule/mail/scheduled
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

Returns all the mails, that are scheduled

### Get the mail that is scheduled with id
```http
 GET /api/schedule/mail/scheduled/${id}
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

For example to get a mail with id 4, send a `GET` request at `/api/schedule/mail/scheduled/4`
<br>Returns only the required mail

#### Send a mail that is meant to be recurring

```http
  POST /api/recurr/mail/recurring
```

| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `to`       | `string` | **Required**.<br>A valid email address    |
| `cc`       | `string` | if more than one, a `,` seperated string<br>e.g. `'abc@gmail.com,def@gmail.com'`|
| `bcc`      | `string` | if more than one, a `,` seperated string<br>e.g. `'abc@gmail.com,def@gmail.com'`|
| `subject`  | `string` | **Required**.<br>Should be less than 30 characters |
| `body`     | `string` | **Required**.                     |
| `recurringPeriod` | `string` | **Required** |

Returns the id of the just stored mail (that was just stored to send according to the `recurringPeriod`)

### Get all mails that are meant to be recurring
```http
 GET /api/recurr/mail/recurring
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

Returns all the mails, that are meant to be recurring

### Get the mail that is meant to be recurring with id
```http
 GET /api/recurr/mail/recurring/${id}
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

For example to get a mail with id 4, send a `GET` request at `/api/recurr/mail/recurring/4`
<br>Returns only the required mail
