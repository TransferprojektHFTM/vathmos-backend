export class JwtPayload {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  aio: string;
  amr: string[];
  family_name: string;
  given_name: string;
  ipaddr: string;
  name: string;
  nonce: string;
  oid: string;
  roles?: string[];
  onprem_sid: string;
  sub: string;
  tid: string;
  unique_name: string;
  upn: string;
  uti: string;
  ver: string;
  preferred_username: string;
}
