export declare class GuardService {
    private readonly saltRounds;
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string, hash: string): Promise<boolean>;
}
