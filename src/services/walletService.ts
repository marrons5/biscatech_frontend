import apiClient from "./apiClient";

export interface WalletSummary {
  balance: number;
  potentialEarnings: number;
  totalEarnings: number;
  monthlyJobs: number;
  commission: number;
}

export interface Transaction {
  id: string;
  type: "earning" | "commission" | "withdrawal" | "refund";
  amount: number;
  description: string;
  createdAt: string;
}

export interface GetWalletSummaryResponse {
  success: boolean;
  data: WalletSummary;
}

export interface ListTransactionsResponse {
  success: boolean;
  data: Transaction[];
}

export const walletService = {
  async getSummary() {
    return await apiClient.get<GetWalletSummaryResponse>("/api/v1/wallet/summary");
  },

  async listTransactions() {
    return await apiClient.get<ListTransactionsResponse>("/api/v1/wallet/transactions");
  },
};
