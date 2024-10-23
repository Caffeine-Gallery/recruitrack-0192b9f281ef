import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  // Define the Interview type
  type Interview = {
    id: Nat;
    company: Text;
    position: Text;
    date: Int;
    notes: Text;
  };

  // Stable variable to store interviews
  stable var interviews : [Interview] = [];
  stable var nextId : Nat = 0;

  // Add a new interview
  public func addInterview(company: Text, position: Text, date: Int, notes: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newInterview : Interview = {
      id;
      company;
      position;
      date;
      notes;
    };
    interviews := Array.append(interviews, [newInterview]);
    id
  };

  // Get all interviews
  public query func getAllInterviews() : async [Interview] {
    interviews
  };

  // Update an existing interview
  public func updateInterview(id: Nat, company: Text, position: Text, date: Int, notes: Text) : async Bool {
    let updateIndex = Array.indexOf<Interview>({ id; company; position; date; notes; }, interviews, func(a, b) { a.id == b.id });
    switch (updateIndex) {
      case (null) { false };
      case (?index) {
        let updatedInterview : Interview = {
          id;
          company;
          position;
          date;
          notes;
        };
        interviews := Array.tabulate<Interview>(interviews.size(), func (i) {
          if (i == index) { updatedInterview } else { interviews[i] }
        });
        true
      };
    };
  };

  // Delete an interview
  public func deleteInterview(id: Nat) : async Bool {
    let deleteIndex = Array.indexOf<Interview>({ id; company = ""; position = ""; date = 0; notes = ""; }, interviews, func(a, b) { a.id == b.id });
    switch (deleteIndex) {
      case (null) { false };
      case (?index) {
        interviews := Array.tabulate<Interview>(interviews.size() - 1, func (i) {
          if (i < index) { interviews[i] }
          else { interviews[i + 1] }
        });
        true
      };
    };
  };
}
