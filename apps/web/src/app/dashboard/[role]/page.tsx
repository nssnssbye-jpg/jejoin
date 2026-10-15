import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyerPortal } from "@/components/buyer-portal";
import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardData, type DashboardRole } from "@/lib/dashboard-data";

const roles = Object.keys(dashboardData) as DashboardRole[];

type PageProps = {
  params: Promise<{ role: string }>;
};

export function generateStaticParams() {
  return roles.map((role) => ({ role }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const data = dashboardData[role as DashboardRole];

  return {
    title: data ? data.roleLabel : "대시보드",
  };
}

export default async function DashboardPage({ params }: PageProps) {
  const { role } = await params;

  if (!roles.includes(role as DashboardRole)) {
    notFound();
  }

  if (role === "buyer") {
    return <BuyerPortal />;
  }

  return <DashboardShell data={dashboardData[role as DashboardRole]} />;
}
