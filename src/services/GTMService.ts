interface LoginEventProps {
  organizationId?: string;
  role?: string;
}

const GTMService = {
  loginEvent: ({ organizationId, role }: LoginEventProps) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'login',
        organizationId,
        role,
      });
    }
  },
};

export default GTMService; 