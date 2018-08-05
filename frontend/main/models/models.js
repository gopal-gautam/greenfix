if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
window.loginModel = Backbone.Model.extend({
    defaults: {
        usr_email: "",
        usr_pass: "",
        usr_name: "",

        regdetail: "Your registration is now complete."
    }
});
window.getprofilelist = Backbone.Model.extend({
    urlRoot: "apis/getprofilelist"
});

window.Stats = Backbone.Model.extend({
    urlRoot: "apis/stats",
    getInfoImage: function () {
        return "iVBORw0KGgoAAAANSUhEUgAAAZAAAAD6BAMAAAB9iQx3AAAAG1BMVEVVWVz///9qbXDU1dbp6uqqrK1/goS/wMGUl5nxP3NOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEKklEQVR4nO3Zz3ObRhTAcYIM0tEbEadHq6Pp9Gi1nSZH4dpJjlYnanyE1Iccral7F5244z+77L7lN7ZRB5jO9Ps5SMDAYx9vYVfIcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/xPuabb0ZXudLzv+/fav5w/+flvs9a11UIAerdZ24aNSKriyK16Yrl0+c6h/l+6kPtgjlAgOCNAnT61l4UZdPnwKg1NpYhhc39+p8ycPnYXqzfX9Sv0ggYIfRfcAvYptIr56Z9omp46DKP38atN6xGRu+s5mbtamryphuwToVWi71lKaszQ9ww3P5Gv91KFeZL58ZfpjJZFuAfo0ncdyrp2UwjWtmtoruXjVflTV5lh/Tr4phz0oQB+Sc0nEVXvbKr26sI3ygi4xFif6s5LIYQF64KpIEsnPaJpgsnFK6T1pYi770Ulp02EBepC2QRI5yvrAVN8rYfYU3p11CDJ9bSKUEzksQA82ZzaRxUu7Zab0dTy1a8lxtqeXH3Pl1EgiL14WW9oCDMpPTyiJJOtSG2Z5z87zKy7tdF6P0kykLcCgjtIbQhLZ5F0g3DvevLyDWGbbduUuZMg9sihd+7YAg9rdZonoJbG6spdYm+SPTzsyOFMV1aPIU6ucSFuAIZkeIIms8p6fplScvWhRVpJmQWy3jNezu4tffjNbWgMMyFxKSSTtUFaaSNEfSu2QkrQUxD6i4kszZ/xZL7cGGJApQz2R9G4p2uGV7mxTkpaCzOQRlajLyPE/mplBe4DByEk6J6JL0laQpfSjRA7a6a+RE4nN9KpzIrokLQVxVpUxb6rrM24ibhjpr+6JuOGbloLM8sFP6Dtm3EQmch/ap9Y+26yfWo/cq0vVUpC4NlLoEemxAMOwg3nXx69eU82Zk8z7S+LjkR+/2Xyo44BodgqaHWVZb6meqow6IGb9uOMUxdEF+RzWS+I2trw4GXmKkgQXRph+3z4/aXTMGLKsl6SxwVRk1Eljogpndr7kSBvc/OGU5+fIoF4vQLMgpuntAQbi2vdpybl+p1b8sNLdu/hddFscYMaQWgWaBTE3e3uAgXX9qSuDerUEvmq20/xwGf2nrpMl8vzLBzuoV2oQNx+uEmj0lw9OloizkddBvmmHZ9/mlAa7bJZVLsmsPobo/UzTWwIMziZyJKe+kQsuLxz9UqM32dOgVJJNuZlRZb9mgMHZRNxQv4z27NvaZbDXjSq98byJ7IL7IdtUnQpf/Ko/f7dFagYYnE0knUi93v6h5nJmN1R/fspeTz8mUReWXtup99vtT+YNctcA/coScb6mA8p8b1dm+l+Bt08fWYxEes3Vf0sUfyR0CTCU7x7+Ps1X3C8Pnw8+/iEq1v5FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA/7h/vWasD+nO9vwAAAABJRU5ErkJggg==";
    },
    defaults: {
        "data": {
            "totalinvolvedparties": 0,
            "totaltriggers": 0,
            "totalcheckedin": 0,
            "involvedParty": {
                  "Properties": [
                    {
                      "Key": "planbprocessingmessage",
                      "Value": ""
                    },
                    {
                      "Key": "clubinterface",
                      "Value": ""
                    },
                    {
                      "Key": "membershipapiendpoint",
                      "Value": ""
                    }
                  ],
                  "Name": "",
                  "LogoImage": null,
                  "AddressLine": "",
                  "City": "",
                  "State": "NSW",
                  "Postcode": "",
                  "Plan": "",
                  "ProfileId" : "",
                  "planbprocessingmessage": "",
                  "clubinterface": "",
                  "membershipapiendpoint": ""
            }
        }
    } 
});