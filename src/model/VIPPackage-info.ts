export interface VIPPackageInfo {
  key: number;
  discount: number;
  duration: Duration;
  subscriptionInfoId: number;
  subscriptionType: VIPPackageType;
  subscriptionTypeId: number;
}

export interface Duration {
  durationId: number;
  time: number;
}

export interface VIPPackageType {
  name: string;
  price: number;
}
