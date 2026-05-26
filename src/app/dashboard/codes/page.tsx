import { Metadata } from "next";
import { CodesClient } from "./codes-client";

export const metadata: Metadata = {
  title: "Redeem Codes | Roblox Tracker",
  description: "Manage redeem codes",
};

export default function CodesPage() {
  return <CodesClient />;
}
