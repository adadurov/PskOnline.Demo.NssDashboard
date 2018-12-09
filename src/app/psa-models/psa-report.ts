import { PsaSummary } from './psa-summary';

export class PsaReport {

    public departmentId: string;

    public departmentName: string;

    public branchOfficeId: string;

    public branchOfficeName: string;

    public shiftDate: Date;

    public shiftStartTime: string;

    public shiftNumber: Number;

    /// <summary>
    /// gets or sets the name of the shift as a Roman number
    /// ('I', 'II', 'III') or as a verbal name ('день', 'ночь')
    /// </summary>
    public shiftName: string;

    public summaries: PsaSummary[] = [];
}
