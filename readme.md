## To Do

| Task | Description | Status |
| :----| :-----------| :------|
| POST register | if the user can be added. add the user to the database and send the JWT token | :heavy_check_mark: |
| POST login | if the user is valid send the JWT token | :heavy_check_mark: |
| POST send | add the mail to the databse so it gets listed in GET sent and GET sent/:id | :heavy_check_mark: |
| GET sent | send all the sent mails in response | :heavy_check_mark: |
| GET sent/:id | send only the sent mail with this id in response | :heavy_check_mark: |
| POST schedule | add the mail to the database so it gets listed in GET scheduled and GET scheduled/:id | :x: |
| GET scheduled | send all scheduled mails in response | :x: |
| GET scheduled/:id | send only the scheduled mail with this id in response | :x: |
| POST recurring | add the mail to the database so it gets listed in GET recurring and GET recurring/:id | :x: |
| GET recurring | send all recurring mails in response | :x: |
| GET recurring/:id | send only the recurring mail with this id in response | :x: |

## API Reference
Note: Parameters are to be included in the name attribute of respective input elements.
Note: Except `/register` and `/logins` for all other routes, it is expected to have token in the request header.
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
Returns all the mails

### Get the mail that is sent with id
```http
 GET /api/send/mail/sent/${id}
```
| Parameters | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| -- | -- | -- |

For example to get a mail with id 4, send a `GET` request at `/api/send/mail/sent/4`
<br>Returns only the required mail
