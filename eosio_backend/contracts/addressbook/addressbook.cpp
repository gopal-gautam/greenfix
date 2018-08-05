#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

class addressbook : public eosio::contract {
  public:
      addressbook(account_name s):
        contract(s), // initialization of the base class for the contract
        _people(s, s) // initialize the table with code and scope NB! Look up definition of code and scope
      {
      }

      /// @abi action
      void create(account_name username, uint64_t ssn, const std::string& fullname, uint64_t lat, uint64_t lon,
              const std::string& password, const std::string& address, const std::string& profession) {
        require_auth(username);
        // Let's make sure the primary key doesn't exist
        // _people.end() is in a way similar to null and it means that the value isn't found
        eosio_assert(_people.find(ssn) == _people.end(), "This SSN already exists in the address book");
        _people.emplace(get_self(), [&]( auto& p ) {
           p.ssn = ssn;
           p.user = username;
           p.fullname = fullname;
           p.lat = lat;
           p.lon = lon;
           p.password = password;
           p.address = address;
           p.profession = profession;
        });
      }

      /// @abi action
      void canlogin(account_name username, const std::string& password) {
        // require_auth(username);
        auto adbooks = _people.get_index<N(by_user)>();
        auto adbook = adbooks.find(username);
        if (adbook == adbooks.end()) {
          print(0);
        }
        else if (adbook->password == password) {
          print(1);
        }
        else {
          print(0);
        }        
      }

      /// @abi_action
      void getuser(uint64_t ssn) {
        auto adbook = _people.find(ssn);
        if (adbook == _people.end()) print("{}");
        else print("{  ssn: \"",adbook->ssn,"\",  user: \"",adbook->user,"\", fullname: \"",adbook->fullname,"\", lat: \"",adbook->lat,"\",  lon: \"",adbook->lon,"\",  address: \"",adbook->address,"\",  profession: \"",adbook->profession,"\", }");
      }

  private:
    // Setup the struct that represents the row in the table
    /// @abi table people
    struct ad_book {
      uint64_t ssn; // primary key, social security number
      account_name user;
      std::string fullname;
      uint64_t lat;
      uint64_t lon;
      std::string password;
      std::string address;
      std::string profession;

      uint64_t primary_key()const { return ssn; }
      account_name by_user()const { return user; }
    };

    // We setup the table:
    /// @abi table
    typedef eosio::multi_index< N(people), ad_book, indexed_by<N(by_user), const_mem_fun<ad_book, account_name, &ad_book::by_user>>>  people;

    people _people;

};

 EOSIO_ABI( addressbook, (create)(canlogin)(getuser) )