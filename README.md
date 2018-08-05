# Greenfix
## Incentivisation system for adopting packaging sustainability.

GreenFix is a decentralized dApp that incentivizes the packaging industry to adopt more sustainable industrial activities and discourage non-sustainable activities through a token based incentive model.

#### Testing with contracts

1. Creating new entry into the addressbook/Registering a new user entity
```bash
$ cleos push action addressbook create '["gopal", 12548123365, "Gopal Gautam", 27.1212, 88.4565, "mypass", "Kathmandu Nepal", "Software engineer"]' -p gopal@active
```

2. Checking/Verifying if the newly created user can login or not
```bash
$ cleos push action addressbook canlogin '["gopal", "mypass"]' -p gopal@active
```
This will return 1 or 0 to specify if particular user and password is in the table or not

3. Get userdetails from SSN No.
ActionName: getuser, Parameter: ssn number
```bash
$ cleos push action addressbook getuser '[12548123365]' -p gopal@active
```
Output
```javascript
{  ssn: "12312548123365",  user: "7289753845817671680", fullname: "Gopal Gautam", lat: "27.1212",  lon: "88.4565",  address: "Kathmandu Nepal",  profession: "Software engineer", }
```

4. Creating a new incident report
```bash
$ cleos push action reportchain create '["reportchain", "this is", 111, 121, 123, "path_to_image"]' -p reportchain@active
$ cleos get table reportchain reportchain reportd
```
```javascript
{
  "rows": [{
      "id": 0,
      "description": "this is",
      "lat": 111,
      "lon": 121,
      "reportstage": 1,
      "_created_timestamp": 1533416467,
      "_verified_timestamp": 0,
      "_resolved_timestamp": 0,
      "reporter_ssn": 123,
      "verifier_ssn": 0,
      "resolver_ssn": 0,
      "image": "path_to_image"
    }
  ],
  "more": false
}
```

5. Verifying the reported incident
```bash
$ cleos push action reportchain verify '["reportchain", 0, 123]' -p reportchain@active
$ cleos get table reportchain reportchain reportd
```
```javascript
{
  "rows": [{
      "id": 0,
      "description": "this is",
      "lat": 111,
      "lon": 121,
      "reportstage": 2,
      "_created_timestamp": 1533416467,
      "_verified_timestamp": 1533416563,
      "_resolved_timestamp": 0,
      "reporter_ssn": 123,
      "verifier_ssn": 123,
      "resolver_ssn": 0,
      "image": "path_to_image"
    }
  ],
  "more": false
}
```

6. Resolving the reported incident
```bash
$ cleos push action reportchain resolve '["reportchain", 0, 123]' -p reportchain@active
$ cleos get table reportchain reportchain reportd
```
```javascript
{
  "rows": [{
      "id": 0,
      "description": "this is",
      "lat": 111,
      "lon": 121,
      "reportstage": 3,
      "_created_timestamp": 1533416467,
      "_verified_timestamp": 1533416563,
      "_resolved_timestamp": 1533416584,
      "reporter_ssn": 123,
      "verifier_ssn": 123,
      "resolver_ssn": 123,
      "image": "path_to_image"
    }
  ],
  "more": false
}
```

7. Getting any report incident from the report id
```bash
$ cleos push action reportchain getreport '[0]' -p reportchain@active
```
```javascript
  { id: "0", description: "this is", lat: "111", lon: "121", reportstage: "3", _created_timestamp: "1533416467", reporter_ssn: "123", image: "path_to_image", _verified_timestamp: "1533416563",  _resolved_timestamp: "1533416584", verifier_ssn: "123", resolver_ssn: "0" }
```

Javascript framework used: 
http://backbonejs.org/
https://getbootstrap.com/docs/3.3/

Template Used
https://github.com/ccoenraets/backbone-cellar

CMS design used : sb-admin 2
https://startbootstrap.com/template-overviews/sb-admin-2/
