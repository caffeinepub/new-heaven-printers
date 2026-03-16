import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type LeadSubmission = {
    name : Text;
    phone : Text;
    service : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let submissions = List.empty<LeadSubmission>();

  public shared ({ caller }) func submitLead(
    name : Text,
    phone : Text,
    service : Text,
    message : Text,
  ) : async () {
    if (name.isEmpty() or phone.isEmpty() or service.isEmpty()) {
      Runtime.trap("Name, phone, and service fields cannot be empty.");
    };

    let newSubmission : LeadSubmission = {
      name;
      phone;
      service;
      message;
      timestamp = Time.now();
    };

    submissions.add(newSubmission);
  };

  public query ({ caller }) func getAllSubmissions() : async [LeadSubmission] {
    submissions.toArray();
  };
};
