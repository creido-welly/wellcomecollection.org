// @flow
export type Person = {|
  givenName: string;
  familyName: string;
  name?: string;
  image?: string; // TODO: Make this Picture
  sameAs?: Array<any>; //TODO: Make this Array<something>
|}

export function createPerson(data: Person) {
  return (data: Person);
}
