import { User } from "./user";

export type DiskImage = {
  id: number;
  createdBy?: User; // if absent, means system generated (and is visible to all)
  createdById?: number;

  name: string;
  format: DiskImageFormat;
  description?: string;
  tags: string[];
  path: string;
  os: DiskImageOS;
  osName: string;

  createdAt: string;
  updatedAt: string;
}

enum DiskImageFormat {
  QCOW2,
  VHDX,
  DMG,
  ISO,
  VDI,
  IMG,
}

enum DiskImageOS {
  Linux,
  Windows,
  macOS,
}