// @flow
import type {Link} from './link';

export type MetaUnit = {|
  headingLevel?: number;
  headingText: string;
  links?: Array<Link>;
  text?: Array<string>;
  includeDivider?: boolean;
|};

export function createMetaUnit(data: MetaUnit) { return (data: MetaUnit); }
