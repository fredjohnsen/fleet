export interface IMdmApple {
  common_name: string;
  serial_number: string;
  issuer: string;
  renew_date: string;
}

export interface IMdmAppleBm {
  default_team?: string;
  apple_id: string;
  org_name: string;
  mdm_server_url: string;
  renew_date: string;
}

export const MDM_ENROLLMENT_STATUS = {
  "On (manual)": "manual",
  "On (automatic)": "automatic",
  Off: "unenrolled",
  Pending: "pending",
};

export type MdmEnrollmentStatus = keyof typeof MDM_ENROLLMENT_STATUS;

export interface IMdmStatusCardData {
  status: MdmEnrollmentStatus;
  hosts: number;
}

export interface IMdmAggregateStatus {
  enrolled_manual_hosts_count: number;
  enrolled_automated_hosts_count: number;
  unenrolled_hosts_count: number;
  pending_hosts_count?: number;
}

export interface IMdmSolution {
  id: number;
  name: string | null;
  server_url: string;
  hosts_count: number;
}

interface IMdmStatus {
  enrolled_manual_hosts_count: number;
  enrolled_automated_hosts_count: number;
  unenrolled_hosts_count: number;
  pending_hosts_count?: number;
  hosts_count: number;
}

export interface IMdmSummaryResponse {
  counts_updated_at: string;
  mobile_device_management_enrollment_status: IMdmStatus;
  mobile_device_management_solution: IMdmSolution[] | null;
}

export interface IMdmProfile {
  profile_id: number;
  team_id: number;
  name: string;
  identifier: string;
  created_at: string;
  updated_at: string;
}

export interface IMdmProfilesResponse {
  profiles: IMdmProfile[] | null;
}

export type MdmProfileStatus = "verified" | "verifying" | "pending" | "failed";

export type MacMdmProfileOperationType = "remove" | "install";

export interface IHostMdmProfile {
  profile_id: number;
  name: string;
  operation_type: MacMdmProfileOperationType | null;
  status: MdmProfileStatus;
  detail: string;
}

export type DiskEncryptionStatus =
  | "verified"
  | "verifying"
  | "action_required"
  | "enforcing"
  | "failed"
  | "removing_enforcement";

/** Currently windows disk enxryption status will only be one of these four
values. In the future we may add more. */
export type IWindowsDiskEncryptionStatus = Extract<
  DiskEncryptionStatus,
  "verified" | "verifying" | "enforcing" | "failed"
>;

export const isWindowsDiskEncryptionStatus = (
  status: DiskEncryptionStatus
): status is IWindowsDiskEncryptionStatus => {
  switch (status) {
    case "verified":
    case "verifying":
    case "enforcing":
    case "failed":
      return true;
    default:
      return false;
  }
};

export const FLEET_FILEVAULT_PROFILE_DISPLAY_NAME = "Disk encryption";

export interface IMdmSSOReponse {
  url: string;
}

export interface IBootstrapPackageMetadata {
  name: string;
  team_id: number;
  sha256: string;
  token: string;
  created_at: string;
}

export interface IBootstrapPackageAggregate {
  installed: number;
  pending: number;
  failed: number;
}

export enum BootstrapPackageStatus {
  INSTALLED = "installed",
  PENDING = "pending",
  FAILED = "failed",
}
