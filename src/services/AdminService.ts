import { Constants } from '@/constants'
import { fetchGet } from "./CommonServiceUtils";

interface ImpersonateResponse {
  url: string;
}

class AdminAuthService {
  static async impersonate(organizationId: string): Promise<ImpersonateResponse> {
    return fetchGet(
      `${Constants.REACT_APP_API_BASE_URL}admin/auth/impersonate/${organizationId}`
    );
  }
}

export default AdminAuthService;