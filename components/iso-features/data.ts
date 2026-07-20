import type { ComponentType } from "react";
import {
  IconRelay,
  IconEnclaves,
  IconGateway,
  IconVault,
  IconMesh,
  IconRuntime,
  IconAtlas,
  IconPipeline,
  type IconProps,
  type IsoIconKey,
} from "./icons";

export type Feature = {
  id: string;
  title: string;
  description: string;
  /** Optional technical focus line (e.g. "Gender Detection") */
  focus?: string;
  /** Optional badge chips */
  badges?: string[];
  /** Optional deep link */
  href?: string;
  Icon: ComponentType<IconProps>;
  /** Stable icon key for serialization / match API */
  iconKey?: IsoIconKey;
};

export const FEATURES: Feature[] = [
  {
    id: "relay",
    title: "Relay",
    description: "A network proxy for encrypting and decrypting data in transit.",
    Icon: IconRelay,
    iconKey: "relay",
  },
  {
    id: "enclaves",
    title: "Enclaves",
    description:
      "Build, deploy and scale applications in a confidential computing environment.",
    Icon: IconEnclaves,
    iconKey: "enclaves",
  },
  {
    id: "gateway",
    title: "Gateway",
    description: "Edge entry points with identity-aware access and zero-trust routing.",
    Icon: IconGateway,
    iconKey: "gateway",
  },
  {
    id: "vault",
    title: "Vault",
    description: "Hardware-backed secrets, keys and certificates with audited access.",
    Icon: IconVault,
    iconKey: "vault",
  },
  {
    id: "mesh",
    title: "Mesh",
    description: "Service-to-service mTLS, retries and traffic shaping across regions.",
    Icon: IconMesh,
    iconKey: "mesh",
  },
  {
    id: "runtime",
    title: "Runtime",
    description: "Hardened execution environments with continuous attestation.",
    Icon: IconRuntime,
    iconKey: "runtime",
  },
  {
    id: "atlas",
    title: "Atlas",
    description: "Global topology map for workloads, policies and trust domains.",
    Icon: IconAtlas,
    iconKey: "atlas",
  },
  {
    id: "pipeline",
    title: "Pipeline",
    description: "Signed supply-chain stages from commit to production release.",
    Icon: IconPipeline,
    iconKey: "pipeline",
  },
];
