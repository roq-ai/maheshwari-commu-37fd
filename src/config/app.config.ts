interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Community Owner'],
  customerRoles: [],
  tenantRoles: ['Community Owner', 'Community Admin', 'Community Member', 'Identity Verifier'],
  tenantName: 'Community',
  applicationName: 'Maheshwari Community',
  addOns: ['chat', 'notifications', 'file'],
};
