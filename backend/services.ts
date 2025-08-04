import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export const PUBLIC_SERVICES = {
  auth:          'http://localhost:2001',
  property:      'http://localhost:2002',
  reservation:   'http://localhost:2003',
  payment:       'http://localhost:2004',
  review:        'http://localhost:2005',
  favorite:      'http://localhost:2006',
  message:       'http://localhost:2007',
  search:        'http://localhost:2008',
  notification:  'http://localhost:2009',
};

