import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeadSubmission {
    service: string;
    name: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<LeadSubmission>>;
    submitLead(name: string, phone: string, service: string, message: string): Promise<void>;
}
