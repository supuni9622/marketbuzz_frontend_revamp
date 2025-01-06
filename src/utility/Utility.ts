import { jwtDecode } from "jwt-decode";

export class Utility {
    public static decodeToken(token: string): {
        user: { role: string; organizationId: string; username: string };
      } {
        return jwtDecode(token);
      }

}  
