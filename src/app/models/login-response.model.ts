
export interface LoginResponse {
    access_token: string;
    id_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface IdToken {
    sub: string;
    name: string;
    fullname: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    tenantId: string;
    departmentId: string;
    branchOfficeId: string;
    jobtitle: string;
    email: string;
    phone: string;
    role: string | string[];
    permission: string | string[];
    configuration: string;
}
