import { PsaStatus } from './psa-status';

export class SvmrPreShiftConclusion {

    /// <summary>
    /// test id from the database where results are stored
    /// </summary>
    public testId: string;

    /// <summary>
    /// status
    /// </summary>
    public status: PsaStatus;

    /// <summary>
    /// text containing verbal representation of status (always in Russian)
    /// </summary>
    public text: string;

    /// <summary>
    /// suggested color for rendering the Text
    /// </summary>
    public color: string;

    /// <summary>
    /// comment (may contain some detailed results, for reference)
    /// </summary>
    public comment: string;

    public meanResponseTimeMSec: Number;

    public ipN1: Number;
}
