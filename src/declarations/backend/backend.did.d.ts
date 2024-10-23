import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Interview {
  'id' : bigint,
  'date' : bigint,
  'company' : string,
  'notes' : string,
  'position' : string,
}
export interface _SERVICE {
  'addInterview' : ActorMethod<[string, string, bigint, string], bigint>,
  'deleteInterview' : ActorMethod<[bigint], boolean>,
  'getAllInterviews' : ActorMethod<[], Array<Interview>>,
  'updateInterview' : ActorMethod<
    [bigint, string, string, bigint, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
