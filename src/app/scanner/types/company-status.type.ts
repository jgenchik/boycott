export interface CompanyStatus {
    name: string;
    status: 'GOOD' | 'BAD';
    reason?: string;
}
