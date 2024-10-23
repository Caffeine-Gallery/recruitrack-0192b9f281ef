export const idlFactory = ({ IDL }) => {
  const Interview = IDL.Record({
    'id' : IDL.Nat,
    'date' : IDL.Int,
    'company' : IDL.Text,
    'notes' : IDL.Text,
    'position' : IDL.Text,
  });
  return IDL.Service({
    'addInterview' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'deleteInterview' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllInterviews' : IDL.Func([], [IDL.Vec(Interview)], ['query']),
    'updateInterview' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
