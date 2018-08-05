#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

class reportchain : public eosio::contract {
  public:
      reportchain(account_name s):
        contract(s), // initialization of the base class for the contract
        _reports(s, s) // initialize the table with code and scope NB! Look up definition of code and scope
      {
      }

      /// @abi action
      void create(account_name username, const std::string& description, uint64_t lat, uint64_t lon,
              uint64_t r_ssn, const std::string& image) {
        require_auth(username);
        uint64_t rid = _reports.available_primary_key();
        _reports.emplace(get_self(), [&]( auto& r ) {
           r.id = rid;
           r.description = description;
           r.lat = lat;
           r.lon = lon;
           r.reportstage = 1;
           r._created_timestamp =now();
           r.reporter_ssn = r_ssn;
           r.image = image;

           r._verified_timestamp = 0;
           r._resolved_timestamp = 0;
           r.verifier_ssn = 0;
           r.resolver_ssn = 0;
        });
      }

      /// @abi action
      void verify(account_name username, uint64_t rid, uint64_t v_ssn)
      {
        require_auth(username);
        // get report by rid
        auto reports_itr = _reports.find(rid);
        // check if the object exists
        eosio_assert(reports_itr != _reports.end(), "Report was not found");
        // update object
        _reports.modify( reports_itr, username, [&]( auto& r ) {
           r.reportstage = 2;
           r._verified_timestamp = now();
           r.verifier_ssn = v_ssn;
        });
      }

      /// @abi action
      void resolve(account_name username, uint64_t rid, uint64_t rs_ssn)
      {
        require_auth(username);
        // get report by rid
        auto reports_itr = _reports.find(rid);
        // check if the object exists
        eosio_assert(reports_itr != _reports.end(), "Report was not found");
        // update object
        _reports.modify( reports_itr, username, [&]( auto& r ) {
           r.reportstage = 3;
           r._resolved_timestamp = now();
           r.resolver_ssn = rs_ssn;
        });
      }

      ///@abi action
      void getreport(uint64_t id)
      {
        auto rep = _reports.find(id);
        if (rep == _reports.end()) print("{}");
        else print("{  id: \"",rep->id,"\", description: \"",rep->description,"\", lat: \"",rep->lat,"\", lon: \"",rep->lon,"\", reportstage: \"",rep->reportstage,"\", _created_timestamp: \"",rep->_created_timestamp,"\", reporter_ssn: \"",rep->reporter_ssn,"\", image: \"",rep->image,"\", _verified_timestamp: \"",rep->_verified_timestamp,"\",  _resolved_timestamp: \"",rep->_resolved_timestamp,"\", verifier_ssn: \"",rep->verifier_ssn,"\", resolver_ssn: \"",rep->resolver_ssn,"\" }");
      }

  private:
    // Setup the struct that represents the row in the table
    /// @abi table reportd
    struct reportstruct {
      uint64_t id; // primary key
      std::string description;
      uint64_t lat;
      uint64_t lon;
      uint64_t reportstage; //1 for report incident, 2 for verified and 3 for resolved incidents
      uint64_t _created_timestamp;
      uint64_t _verified_timestamp;
      uint64_t _resolved_timestamp;
      uint64_t reporter_ssn;
      uint64_t verifier_ssn;
      uint64_t resolver_ssn;
      std::string image;

      uint64_t primary_key()const { return id; }
      uint64_t by_rssn()const {return reporter_ssn; }
      // EOSLIB_SERIALIZE( reportstruct, (id)(description)(lat)(lon)(_created_timestamp)(_verified_timestamp)
      //   (_resolved_timestamp)(reporter_ssn)(verifier_ssn)(resolver_ssn)(image) );
    };

    // We setup the table:
    /// @abi table
    // typedef eosio::multi_index< N(reportb),reportstruct > reportb; 
    typedef eosio::multi_index< N(reportd), reportstruct, indexed_by<N(by_rssn), const_mem_fun<reportstruct, uint64_t, &reportstruct::by_rssn>>>  reportd;
   
    reportd _reports;
};

 EOSIO_ABI( reportchain, (create)(verify)(resolve)(getreport) )