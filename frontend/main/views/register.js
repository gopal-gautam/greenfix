window.RegisterView = Backbone.View.extend({
    initialize: function(options) {
        this.options = options || {};
        _.bindAll(this, 'render', 'login');
        this.render();
    },
    render: function() {
        var newregister = (this.options.page) === ":newregister" ? "display" : "display: none";
        var login = (this.options.page) === ":login" ? "display" : "display: none";
        var logout = (this.options.page) === ":logout" ? "display" : "display: none";
        $(this.el).html(this.template($.extend(this.model.toJSON(), {
            newregister: newregister,
            login: login,
            logout: logout
        })));
        return this;
    },
    events: {
        "change": "change",
        "click #Login_btn": "login",
        "click #Login_register": "register"
    },
    change: function(event) {
        utils.hideAlert();
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },
    register: async function(event) {

        pubkey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
        eos = Eos({keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'});
        userName = "garry";
        result = await eos.transaction(tr => {
         tr.newaccount({
           creator: 'eosio',
           name: userName,
           owner: pubkey,
           active: pubkey
         })

         tr.buyrambytes({
           payer: 'eosio',
           receiver: userName,
           bytes: 8192
         })

         tr.delegatebw({
           from: 'eosio',
           receiver: userName,
           stake_net_quantity: '10.0000 SYS',
           stake_cpu_quantity: '10.0000 SYS',
           transfer: 0
         })
        }).then(async response => {
            console.log(response);
            let actionName = "create";
            let actionData = {
                "username": "darrick",
                "ssn": 1131,
                "fullname": "Serg Metelin",
                "lat": 29,
                "lon": 0,
                "password": "",
                "address": "",
                "profession": ""
              };

              result = await eos.transaction({
              actions: [{
                account: "addressbook",
                name: actionName,
                authorization: [{
                  actor: "eosio",
                  permission: 'active',
                }],
                data: actionData,
              }],
            });

            console.log(result);

        }).catch(e => {
            console.log(e.code);
        });


        console.log(result);
        return;
    },
    login: function(events) {
        this.model.set("usr_email", $('#usr_email').val());
        this.model.set("usr_pass", $('#usr_pass').val());
        
        var formValues = {
            email: $('#usr_email').val(),
            password: $('#usr_pass').val()
        };
        $data = formValues;
        this.logindata($data);
    },
    logindata: async function($data) {
        eos.getTableRows(true,"notechainacc","notechainacc","notestruct",100, (error, result) => {
            console.log(error);
            console.log(result);
        });

        let privateKey = '5HvTc8HtVxtJujawjDFk5qAoyzDuEmPY9ZaAcArNNbnaSQf3fw1';//event.target.privateKey.value;
        actionData = {
            "username": this.model.get("usr_name1"),
            "password": this.model.get("usr_pass1") ? this.model.get("usr_pass1") : ""
          };


        // // eosjs function call: connect to the blockchain
         eos = Eos({keyProvider: privateKey});
         const result = await eos.transaction({
          actions: [{
            account: "addressbook",
            name: "canlogin",
            authorization: [{
              actor: "serg",
              permission: 'active',
            }],
            data: actionData,
          }],
        });
         if(result.processed.action_traces[0].console == "1"){
            Account.onLoggedIn(this.model.get("usr_name1"), this.model.get("usr_pass1"), "test@email.com");
         }else{
            utils.displayCustomErrors("Invalid login");
         }




        //  wif = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
        // pubkey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
// ###########Create token
//         eos = Eos({keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'});
// ///Issue token to account
//         // actionData = {
//         //     "from": "eosio",
//         //     "to": "myaccount",
//         //     "quantity": "100.0000 EOS",
//         //     "memo": "bob"
//         //   };
//           actionData = {
//                 "from": "eosio",
//                 "to": "myaccount",
//                 "quantity": "100.0000 EOS",
//                 "memo": "bob"
//               }
//         // // eosjs function call: connect to the blockchain
//          // eos = Eos({keyProvider: privateKey});
//          const result = await eos.transaction({
//           actions: [{
//             account: "eosio.token",
//             name: 'issue',
//             authorization: [{
//               actor: "eosio",
//               permission: 'active',
//             }],
//             data: actionData,
//           }],
//         });
// ###########End Create token
          // "act": {
          //         "account": "eosio.token",
          //         "name": "transfer",
          //         "authorization": [{
          //             "actor": "eosio",
          //             "permission": "active"
          //           }
          //         ],



////Create Account
        // eos = Eos({keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'});
        // eos.transaction(tr => {
        //  tr.newaccount({
        //    creator: 'eosio',
        //    name: 'myaccount',
        //    owner: pubkey,
        //    active: pubkey
        //  })

        //  tr.buyrambytes({
        //    payer: 'eosio',
        //    receiver: 'myaccount',
        //    bytes: 8192
        //  })

        //  tr.delegatebw({
        //    from: 'eosio',
        //    receiver: 'myaccount',
        //    stake_net_quantity: '10.0000 SYS',
        //    stake_cpu_quantity: '10.0000 SYS',
        //    transfer: 0
        //  })
        // })

        // console.log(result);




// cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS", 0, 0, 0]' -p eosio.token
// cleos push action eosio.token issue '[ "myaccount", "100.0000 EOS", "bob" ]' -p eosio
// cleos push action eosio.token issue '[ "myaccount", "100.0000 EOS", "bob" ]' -p eosio
//cleos get table eosio.token myaccount accounts

// await eos.transaction('eosio.token', myaccount => {

//   // Create the initial token with its max supply
//   // const options = {authorization: 'myaccount'} // default
//   // myaccount.create('myaccount', '10000000.000 TOK')//, options)

//   // Issue some of the max supply for circulation into an arbitrary account
//   eosio.issue('myaccount', '10000.000 TOK', 'issue')
// })

// await eos.transaction(['eosio.token'], ({eosio_token}) => {
//   // eosio_token.issue('myaccount', '10000.000 TOK', 'issue')
//   eosio_token.transfer('eosio', 'myaccount', '1.000 EOS', '')
// })


const balance = await eos.getCurrencyBalance('eosio.token', 'myaccount', 'EOS')
console.log('Currency Balance', balance)

// cleos get table eosio.token myaccount accounts
eos.getTableRows(true,"eosio.token","myaccount","accounts",100, (error, result) => {
            console.log(error);
            console.log(result);
        });

        // // console.log("Bishal");
        // expireInSeconds = 60 * 60; // 1 hour
        // // var expireInSeconds = new Date().addHours(1);
        
        // var info = await eos.getInfo({});
        // chainDate = new Date(info.head_block_time + 'Z');
        // expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);
        // expiration = expiration.toISOString().split('.')[0];

        // block = await eos.getBlock(info.last_irreversible_block_num);

        // transactionHeaders = {
        //   expiration,
        //   ref_block_num: info.last_irreversible_block_num & 0xFFFF,
        //   ref_block_prefix: block.ref_block_prefix
        // }
        // eos = Eos({httpEndpoint: 'http://127.0.0.1:8888', chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', keyProvider: '5JEDdQ1mdzxZGpDjjBRF6zJTY9ZcUNeGij1cuNZSmq4tgh17DT1', transactionHeaders});
        // console.log("Bishal: " + transactionHeaders);

        // // eos = Eos({httpEndpoint: null, chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', keyProvider, transactionHeaders})

        // transfer = await eos.transfer('inita', 'initb', '1.0000 SYS', '')
        // transferTransaction = transfer.transaction
        // eos.getTableRows(true,"notechainacc","notechainacc","notestruct",100, (error, result) => {
        //     console.log(error);
        //     console.log(result);
        // });
        // {true,"notechainacc","notechainacc","notestruct",100}
        // $.ajax({
        //     url: 'apis/login',
        //     type: 'POST',
        //     dataType: "json",
        //     data: $data,
        // }).done(function(responseData) {
        //     if (responseData.success == true) {
        //         Account.onLoggedIn(responseData.data.firstName, responseData.data.lastName, responseData.data.email);
        //     } else {
        //         utils.displayCustomErrors(responseData.message);
        //     }
        // }).fail(function(responseData) {
        //     utils.displayCustomErrors("System Error");
        // });
    }
});