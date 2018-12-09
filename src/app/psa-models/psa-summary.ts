import { RusHydroEmployee } from './rushydro-employee';
import { HrvPreShiftConclusion } from './hrv-pre-shift-conclusion';
import { SvmrPreShiftConclusion } from './svmr-pre-shift-conclusion';
import { PsaFinalConclusion } from './psa-final-conclusion';

export class PsaSummary {

    public id: string;

    public inspectionId: string;

    public departmentId: string;

    public branchOfficeId: string;

    public employee: RusHydroEmployee;

    public completionTime: Date;

    /// <summary>
    /// The date when the working shift started
    /// </summary>
    public workingShiftDate: Date;

    /// <summary>
    /// 1 => day shift
    /// 2 => night shift
    /// </summary>
    public workingShiftNumber: Number;

    public hostName: string;

    public hrvConclusion: HrvPreShiftConclusion;

    public svmrConclusion: SvmrPreShiftConclusion;

    public finalConclusion: PsaFinalConclusion;

    public toolVersion: string;
}
